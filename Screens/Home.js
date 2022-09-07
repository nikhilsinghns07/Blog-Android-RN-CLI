import React, { useState,useEffect,useCallback } from 'react'
import { ScrollView, View,RefreshControl } from 'react-native';
import { Avatar,Card, Paragraph,Text,Divider,ActivityIndicator, MD2Colors,HelperText} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
  
const Home = () => {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [refreshing,setRefreshing] = useState(false)

    const fetchPosts = () => {
        setLoading(true)
        fetch('https://api-nikhilsingh7.herokuapp.com/getPost')
        .then((res) => res.json())
        .then(data => {
            setPosts(data.posts)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setError('Some Error Occured')
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchPosts()
        wait(2000).then(() => setRefreshing(false))
    },[])

    
    
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <ScrollView  refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            {loading === true ? 
            <View>
                <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                <Text style={{textAlign:'center'}}>Fetching Post....</Text>
            </View>
            : null}
            <View style={{display : 'flex',flexDirection: 'column',alignItems : 'center',}}>
                {error ? <HelperText  type="error"> {error} </HelperText> : null}
            </View>
           
            {posts?.map((post,idx) =>
            <Card key={idx} style={{margin:10,padding:5,backgroundColor:'#8bc6f0',borderRadius:20}}>
                <Card.Title title={post.title} subtitle={post.author} left={LeftContent} />
                <Card.Content>
                    <Card.Cover source={{uri: post?.imageUrl || 'https://source.unsplash.com/random'}} />
                    <Paragraph  style={{padding:10,fontWeight:'600',fontSize:20}}>{post.content}</Paragraph>
                    <Text variant="titleMedium" style={{padding:10}}>{new Date(post.date).toDateString()}</Text>
                </Card.Content>
            <Divider />
            </Card>
            ) 
            || <Text>No Post Found</Text>} 
        </ScrollView>
    )
}



export default Home