import React,{useEffect, useState} from 'react'
import {ScrollView,View,StyleSheet} from 'react-native'
import { TextInput,Button, Card,HelperText,ActivityIndicator,MD2Colors,Text} from 'react-native-paper';

const EditPost = ({data}) => {

    const [newContent,setNewContent] = useState('')
    const [newTitle,setNewTitle] = useState('')
    const [newUrl,setNewUrl] = useState('')

    const [previousTitle , setPreviousTitle] = useState('')
    const [previousContent,setPreviousContent] = useState('')
    const [previousImageUrl, setPreviousImageUrl] = useState('')

    const [loading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null)

    const fetchPost = () => {
        
        fetch('https://api-nikhilsingh7.herokuapp.com/getPostbyId',{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "postId" : data
            })
        }).then((res) => res.json())
        .then(response => {
            setPreviousTitle(response.posts.title)
            setPreviousContent(response.posts.content)
            setPreviousImageUrl(response.posts.imageUrl)
            
        })
        
    }
    
    let post = {
        title : previousTitle,
        url : previousImageUrl,
        content : previousContent
    }

    const editPostHandler = () => {
        setIsloading(true)
        
        if(newTitle !== previousTitle){
            post.title = newTitle
        }

        if(newTitle === '') {
            post.title = previousTitle
        }

        if(newTitle === previousTitle) {
            post.title = previousTitle
            
        }

        if(newContent !== previousContent){
            post.content = newContent
        }

        if(newContent === '') {
            post.content = previousContent
        }

        if(newContent === previousContent) {
            post.content = previousContent
            
        }

        if(newUrl !== previousImageUrl){
            post.url = newUrl
        }

        if(newUrl === '') {
            post.url = previousImageUrl
        }

        if(newUrl === previousImageUrl) {
            post.url = previousImageUrl
        }

        fetch("https://api-nikhilsingh7.herokuapp.com/editpost",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json" 
            },
            body: JSON.stringify({
                "postId" : data,
                "title" : post.title,
                "content" : post.content,
                "imageUrl" : post.url
            })
            }).then(res => res.json())
            .then(data => {
                setIsloading(false)
                
                if(data.error) {
                    setError('Some Error Occured')
                }

                setSuccess('Post Updated')

        })
    }

   


    useEffect(() => {
        fetchPost()
    })
    return (
        <ScrollView>
            <View>
            
                <Card  style={{margin:10,padding:15,borderRadius:20}}>
                
                {loading === true ? 
                    <View>
                        <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                        <Text style={{textAlign:'center'}}>Updating Post....</Text>
                    </View>
                : null}
                    <TextInput label="New Title"  mode="outlined" value={previousTitle} onChangeText={(text) => {setNewTitle(text)}} />
                    <TextInput label="New Image URl" mode ="outlined" value= {previousImageUrl}  onChangeText={(text) => {setNewUrl(text)} }/>
                    <TextInput label="New Content" mode="outlined" value={previousContent} multiline onChaneText={(text) => {setNewContent(text)}} />
                    <View style={styles.buttonContainer}>
                        <Button mode='contained' onPress={() => {editPostHandler()}}>Update</Button>
                    </View>

                    <View style={styles.container}>
                        {error ?
                        <View>
                            <HelperText  type="error"> {error} </HelperText>
                        </View>
                        : null}

                        {success ?
                        <View>
                            <HelperText style={{color:'green',fontSize:20}}> {success} </HelperText>
                        </View> : null}
                    </View>

                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonContainer : {padding : 10},
    container : {
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
    }
})

export default EditPost