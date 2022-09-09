import React, { useState,useEffect,useCallback } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native';
import { Avatar,Card, Paragraph,Text,Divider,ActivityIndicator, MD2Colors, Button} from 'react-native-paper';
import EditPost from './EditPost'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const UserPost = ({data}) => {
    const [refreshing,setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchUserPost()
        wait(2000).then(() => setRefreshing(false))
    },[])
    
    const [posts,setPost] = useState()
    const [loading,setLoading] = useState(false)
    const [editMode,setEditMode] = useState(false)
    const [postId,setPostId] = useState('')
    
    const fetchUserPost = () => {
        setLoading(true)
        fetch('https://api-nikhilsingh7.herokuapp.com/userpost',{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "username" : data
            })
        }).then(res => res.json())
        .then(data => {
            setLoading(false)
            setPost(data.posts)
        })
    }

    const editPostHandler = (id) => {
        setPostId(id)
        setEditMode(true)
    }

    

    const deletePostHandler = (id) => {
        fetch('https://api-nikhilsingh7.herokuapp.com/deletepost',{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "postId" : id
            })
        }).then(res => res.json())
        .then(data => {
            if(data.success === "Deleted"){
                onRefresh()

            }
        })
    }



    

    useEffect(() => {
        fetchUserPost()
    },[])

    return (
        <React.Fragment>
            <ScrollView refreshControl={
                <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}/>
            }>
                
                {editMode ?
                <View>
                    <EditPost data={postId}/> 
                    <Button onPress={() => {setEditMode(false)}}>Close</Button>
                </View> : null}
                <View>
                    {loading === true ? <ActivityIndicator animating={true} color={MD2Colors.red800} size='large' /> : null}

                    {posts?.map((post,idx) =>
                    <Card key={idx} style={{margin:10,padding:5,backgroundColor:'#8bc6f0',borderRadius:20}}>
                        <Card.Title title={post.title} subtitle={post.author} left={LeftContent} />
                        <Card.Content>
                            <Card.Cover source={{uri: post?.imageUrl || 'https://source.unsplash.com/random'}} />
                            <Paragraph  style={{padding:10,fontWeight:'600',fontSize:20}}>{post.content}</Paragraph>
                            <Text variant="titleMedium" style={{padding:10}}>{new Date(post.date).toDateString()}</Text>
                        </Card.Content>
                    <Divider />
                    <Button onPress={() => {editPostHandler(post._id)}}> Edit Post </Button>
                    <Button onPress={() => {deletePostHandler(post._id)}}> Delete Post</Button>
                    </Card>
                    ) 
                    || <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>No Post Found</Text>} 
                </View>


            </ScrollView>
        </React.Fragment>
    )
}

export default UserPost