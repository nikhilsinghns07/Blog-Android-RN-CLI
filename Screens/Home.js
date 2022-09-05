import React, { useState,useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { Avatar,Card, Paragraph,Text,Divider,ActivityIndicator, MD2Colors, Button,HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Home = ({navigation}) => {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    
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
    useEffect(() => {
        fetchPosts()
    }, [])

    const logouthandler = async () => {
        const token = await AsyncStorage.getItem('LOGIN_TOKEN')

        if(token == null){
            setError('Not Logged In')
            return
        }

        AsyncStorage.removeItem('LOGIN_TOKEN')
        navigation.replace('Root')
    }

    return (
        <ScrollView>
            {loading === true ? <ActivityIndicator animating={true} color={MD2Colors.red800} size='large' /> : null}
            <View style={{display : 'flex',flexDirection: 'column',alignItems : 'center',}}>
                {error ? <HelperText  type="error"> {error} </HelperText> : null}
            </View>
            <Button onPress={() => {logouthandler()}}> Logout </Button>
  
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