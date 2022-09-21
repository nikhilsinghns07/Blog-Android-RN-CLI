import React,{useState} from 'react'
import {Text,ActivityIndicator, MD2Colors,TextInput, Button,Card} from 'react-native-paper';
import {View,StyleSheet, KeyboardAvoidingView,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const CreatePost = ({navigation}) => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [sucess,setSucess] = useState(null)
    const [title,setTitle] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [content,setContent] = useState('')
    
    let keys = []

    const postGenerator = async() => {
        
        try{
            keys = await AsyncStorage.getAllKeys()
            const UNAME = await AsyncStorage.getItem('USERNAME')
            if(!title || !content) {
                setError("Required Title and Content")
                return
            }

            setLoading(true)
            await fetch('https://api-nikhilsingh7.herokuapp.com/createpost',{
                method:"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    "author" : UNAME,
                    "title" : title,
                    "content" : content,
                    "imageUrl" : imageUrl
                })
            })
            .then(res => res.json())
            .then(response => {
                let error = response.error

                if(error) {
                    setError('Some Error Occured')
                    setLoading(false)
                    return
                }

                if(response.data) {
                    setLoading(false)
                    setSucess('Post Created Successfully')
                    setError(null)
                    setContent('')
                    setImageUrl('')
                    setTitle('')
                }

                wait(5000).then(() => {
                    setSucess(null)
                })
            })


        }catch(e) {

        }
        
    }

    return (
        <ScrollView style={{backgroundColor:'black'}}>
        <KeyboardAvoidingView>
            <View>
                {loading === true ? 
                <View>
                    <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                    <Text style={styles.loadingText}>Creating Post....</Text>
                </View> : null}
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    {error ? <Text style={styles.text}>{error}</Text> : null}
                    <TextInput label="Title" mode="outlined" onChangeText={(text) => {setTitle(text)}}/>
                    <TextInput label="ImageUrl (Optional)" mode="outlined" onChangeText={(text) => {setImageUrl(text)}}/>
                    <TextInput label="Content" multiline={true} mode="outlined" style={{height:200}} onChangeText={(text) => {setContent(text)}}/>
                    {sucess ? <Text style={styles.sucessText}> {sucess} </Text> : null}
                </Card.Content>

                <Card.Actions style={styles.action}>
                    <Button mode='contained' color="orange" onPress={() =>{ postGenerator()}}>Post</Button>
                    <Button mode='contained' color="red" onPress={() => navigation.navigate('Home')}>Cancel</Button>
                </Card.Actions>
            </Card>

        </KeyboardAvoidingView>
    </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    action:{
        padding: 15,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    card:{
        margin: 10,
        borderRadius :20,
        backgroundColor : '#78b0ff'

    },
    text : {
        color : 'red',
        fontSize : 15, 
        textAlign : 'center'
    },
    loadingText : {
        textAlign:'center',
        color:'white',
        fontSize:20
    },
    sucessText : {
        color : 'green',
        fontSize : 18, 
        textAlign : 'center'
    }
})

export default CreatePost