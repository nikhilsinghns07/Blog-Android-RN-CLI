import React, { useState,useEffect } from 'react'
import {Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePost from './CreatePost';


const UserPost =  ({navigation}) => {
    const [post,setPost] = useState()
    const [loggedIn,setIsLoggedIn] = useState(false)
    const [username,setUsername] = useState(null)

    const validation = async () => {
        let keys = []
        try{
            keys = await AsyncStorage.getAllKeys()
            const UNAME =  await AsyncStorage.getItem('USERNAME')
            setUsername(UNAME)
        }catch(e) {
            console.log(e)
        }
        
        
        keys.forEach(el => {
          if(el == 'LOGIN_TOKEN'){
              setIsLoggedIn(true)
          }
        })
    }

    if(loggedIn == true){
        console.log('LoggedIn')
    }

    if(loggedIn == false) {
        console.log('Not Logged In')
        navigation.navigate('/Login')
    }
 
    useEffect(() => {
        validation()
    },[validation])
      

    return (
        <React.Fragment>
            <Text>UserPost Page</Text>
        </React.Fragment>
    )
}

export default UserPost