import React,{useEffect, useState,useCallback} from 'react'
import {Text,Button,Card,Paragraph,ActivityIndicator,MD2Colors,HelperText} from 'react-native-paper';
import {View,StyleSheet,ScrollView,Image,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img from '../img/bg1.jpg'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const UserPost = ({navigation}) => {
    const [loading,setLoading] = useState(false)
    const [refreshing,setRefreshing] = useState(false)
    const [sucess,setSuccess] = useState('')
    const [userPost,setUserPost] = useState([])

    const fetchUserPost = async() => {
        
        let keys = []
        try{
            keys = await AsyncStorage.getAllKeys()
            const UNAME = await AsyncStorage.getItem('USERNAME')
            setLoading(true)
            fetch('https://api-nikhilsingh7.herokuapp.com/userpost',{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "username" : UNAME
            })
        }).then(res => res.json())
        .then(data => {
            setLoading(false)
            setUserPost(data.posts)     
        })
        }catch(e) {console.log(e)}
    }

    const EditPostNavigator = (id) => {navigation.navigate('EditPost',{postId : id})}

    const DeletePostHandler = (id) => {
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
                setSuccess('Post Deleted')
                wait(2000).then(() => {
                    onRefresh()
                })
            }
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setSuccess('')
        fetchUserPost()
        wait(2000).then(() => setRefreshing(false))
    },[])

    useEffect(() => {
        fetchUserPost()
    },[])

    return (
        <ScrollView style={{backgroundColor:'lightblue'}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>

            <View>
                {loading === true ? 
                <View>
                    <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                    <Text style={styles.loadingText}>Fetching Post....</Text>
                </View> : null}

                {sucess ? <Text style={styles.sucessText}> {sucess} </Text> : null}
            </View>

            <Image source={img} style={styles.topImg}/>

            {userPost?.length > 0 ? (
                (userPost.map((post,idx) => 
                <Card style={styles.topCard} key={idx}>
                    <Card.Title title={post.title} subtitle={`by  ${post.author}`}/>
                    <Text style={styles.date}>{new Date(post.date).toDateString()}</Text>
                    <Card.Cover source={{ uri:post?.imageUrl || 'https://source.unsplash.com/random' }} />
                    <Card.Content>
                        <Paragraph>{post.content}</Paragraph>
                    </Card.Content>
                    <View style={styles.buttonContainer}> 
                        <Button onPress={() => {EditPostNavigator(post._id)}}> Edit </Button>
                        <Button onPress={() => {DeletePostHandler(post._id)}} > Delete </Button>
                    </View>
                </Card>
                ))
            ) : <View>
                    <Text style={styles.noPostText}>No Posts Found</Text>                
                    <Button mode="contained"onPress={() => {navigation.navigate('CreatePost')}}> Create a Post</Button>
                </View>}
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    topImg : {
        width:'100%',height:200
    },

    topCard : {
        padding: 10,
        borderRadius: 20,

    },
    date : {
        paddingLeft :15,
        paddingBottom: 10
    },
    buttonContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent : 'flex-end'
    },
    loadingText : {
        textAlign:'center',
        color:'black',
        fontSize:20
    },
    sucessText : {
        color : 'green',
        fontSize : 18, 
        textAlign : 'center'
    },
    noPostText : {fontSize: 25,color:'red',textAlign:'center',padding: 8}
})
export default UserPost