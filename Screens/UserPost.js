import React, { useState,useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { Avatar,Card, Paragraph,Text,Divider,ActivityIndicator, MD2Colors, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const UserPost = ({navigation,data}) => {

    const [posts,setPost] = useState()
    
    const [loading,setLoading] = useState(false)
    
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
       // set id to delete
       navigation.navigate('EditPost')
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
                navigation.replace('Profile')
            }
        })
    }

    

    useEffect(() => {
        fetchUserPost()
    },[])

    return (
        <React.Fragment>
            <ScrollView>
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
                    <Button> Edit Post </Button>
                    <Button> Delete Post</Button>
                    </Card>
                    ) 
                    || <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>No Post Found</Text>} 
                </View>
            </ScrollView>
        </React.Fragment>
    )
}

export default UserPost