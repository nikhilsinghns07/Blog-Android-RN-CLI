import React,{useEffect, useState} from 'react'
import { ScrollView, View,StyleSheet,Image,KeyboardAvoidingView} from 'react-native'
import {Button, TextInput,ActivityIndicator,Text,MD2Colors} from "react-native-paper"
import img from '../img/bg1.jpg'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const EditPost = ({route,navigation}) => {
    const {postId} = route.params
    const [post,setPost] = useState([])
    const [newTitle,setNewTitle] = useState('')
    const [newContent,setNewContent] = useState('')
    const [newImageUrl,setNewImageUrl] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [sucess,setSucess] = useState('')
    let sError;

    const fetchPreviousPost = () => {
        fetch("https://api-nikhilsingh7.herokuapp.com/getPostbyId",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "postId" : postId
            })
        }).then(res => res.json())
        .then(resposne => {
            setPost(resposne.posts)
        })
    }

    let oldPost = {
        title : post.title,
        content : post.content,
        imageUrl : post.imageUrl
    }

    const updatePost =  () => {
        setLoading(true)
        if(newTitle === '' || newTitle === null) {
            setNewTitle(oldPost.title)
        }

        if(newContent === '' || newContent === null) {
            setNewContent(oldPost.content)
        }
        if(newImageUrl === '' || newImageUrl === null) {
            setNewImageUrl(oldPost.imageUrl)
        }

        fetch("https://api-nikhilsingh7.herokuapp.com/editpost",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "postId" : postId,
                "title" : newTitle,
                "content" : newContent,
                "imageUrl" : newImageUrl
            })
        }).then(res => res.json())
        .then(resposne => {
            
            sError = resposne.error
            
            if(sError){
                setError('InValid')
                setLoading(false)
                return
            }

            setSucess(resposne.success)
            setLoading(false)
            setNewTitle('')
            setNewContent('')
            setNewImageUrl('')
            wait(4000).then(navigation.navigate('Home'))
        })
        
    }

    useEffect(() => {
        fetchPreviousPost()
    },[])

    return(
        <ScrollView style={{backgroundColor:"black"}}>
            <KeyboardAvoidingView>
                <Image source={img} style={styles.topImg}/>
                <View>
                    {loading === true ? 
                    <View>
                        <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                        <Text style={styles.loadingText}>Updating Post....</Text>
                    </View> : null}

                    {sucess ? <Text style={styles.sucessText}> {sucess} </Text> : null}
                    {error  ? <Text style={styles.errorText}> {error} </Text> : null}

                </View>
                <View style={styles.topView}>
                    <TextInput mode='outlined' label="Title"  onChangeText={(text) => setNewTitle(text)} />
                    <TextInput mode='outlined' label="Content" multiline onChangeText={(text) => setNewContent(text)} />
                    <TextInput mode='outlined' label="Image URL" onChangeText={(text) => setNewImageUrl(text)} />
                    <View>
                        <Button onPress={() => updatePost()}>Save Changes</Button>
                        <Button onPress={() => navigation.navigate('Home')}>Cancel</Button>
                </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topImg : {
        width:'100%',
        height:200,
        borderRadius : 20,
        margin : 5
    },
    topView :{
        padding : 10,
        backgroundColor : 'white',
        marginTop: 5,
        borderRadius : 5
    },
    sucessText : {
        color : 'green',
        fontSize : 18, 
        textAlign : 'center'
    },
    errorText : {
        color : 'red',
        fontSize : 18, 
        textAlign : 'center'
    },
    loadingText : {
        color : 'white', 
        textAlign:'center',   
        fontSize:20
    }
})
export default EditPost