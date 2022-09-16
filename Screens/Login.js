import React, { useState } from 'react'
import { TextInput,Button, Card,HelperText,ActivityIndicator,MD2Colors} from 'react-native-paper';
import { View,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {
    const [loading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const [loginToken,setLoginToken] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const loginHandler = async () => {
        if(!email || !password){
            setError('Must Provide the Credentials')
            return
        }

        await fetch('https://api-nikhilsingh7.herokuapp.com/login',{
            headers :{
                'Content-Type' : 'application/json'
            },
            method :'POST',
            body: JSON.stringify({
                "email" : email,
                "password" : password
            })
        })
        .then((res) => res.json())
        .then(data => {
            setIsloading(true)
            setError('')
            setEmail('')
            setPassword('')

            if(data.response === 502){
                setError('Invalid Credentials')
                return
            }

            try {
                AsyncStorage.setItem('LOGIN_TOKEN',data.token)
                AsyncStorage.setItem('USERNAME',data.username)
                AsyncStorage.setItem('SNAME',data.sname)
            } catch (error) {
                console.log(error)
            }
            setIsloading(false)
            navigation.replace('Root')
        })
    }

    return (
        <React.Fragment>
            {loading === true ? 
            <View>
                <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                <Text style={{textAlign:'center'}}>Fetching Post....</Text>
            </View>
            : null}
           <Card  style={{margin:10,padding:15,borderRadius:20}}>
                <TextInput label="Email"  mode="outlined"  onChangeText={(text) => setEmail(text)} />
                <TextInput label="Password" mode ="outlined" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

                <View style={styles.buttonContainer}>
                    <Button onPress={() => {loginHandler()}}>Login</Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => navigation.navigate('Signup')}> New ? Create a Free account</Button> 
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="contained-tonal">Forgot Password</Button>
                </View>

                <View style={styles.container}>
                    {error ? <HelperText  type="error"> {error} </HelperText> : null}
                </View>

            </Card>

        </React.Fragment>
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

export default Login