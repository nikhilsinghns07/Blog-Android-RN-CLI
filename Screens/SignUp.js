import React,{useState} from 'react'
import { TextInput,Button, Card,HelperText,ActivityIndicator,MD2Colors,Text} from 'react-native-paper';
import { View,StyleSheet } from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const SignUp = ({navigation}) => {
    const [loading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [sucess,setSuccess] = useState('')

    const signUpHandler = () => {
        if(password !== confirmPassword) {
            setError('Password and Confirm Password does not mathces.')
            return
        }

        setError(null)
        if(!email || !password || !username || !confirmPassword){
            setError('Must Provide the Credentials')
            return
        }

        setIsloading(true)
        fetch('https://api-nikhilsingh7.herokuapp.com/signup',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : "POST",
            body : JSON.stringify({
                "username" : username,
                "email" : email,
                "password" : password
            })
        }).then((res) => res.json())
        .then(response => {
            if(response.error) {
                setError(response.error)
                setIsloading(false)
                return
            }
            
            if(response.token) {
                setIsloading(false)
                setSuccess('Account Created')
            }

            wait(7000).then(() => navigation.navigate('Login'))
        })
    }

    return (
        <React.Fragment>
            <View>
                {loading === true ? 
                <View>
                    <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                    <Text style={styles.loadingText}>Creating Account....</Text>
                </View> : null}
            </View>
           <Card  style={{margin:10,padding:15,borderRadius:20}}>
                <TextInput label="Username" mode='outlined'  onChangeText={(text) => setUsername(text)}/>
                <TextInput label="Email" mode='outlined'  onChangeText={(text) => setEmail(text)}/>
                <TextInput label="Password" mode='outlined'  onChangeText={(text) => setPassword(text)}/>
                <TextInput label="Confirm Password" mode='outlined'  onChangeText={(text) => setConfirmPassword(text)}/>

                <View style={styles.conditionalContainer}>
                    <HelperText type='error' style={{textAlign : 'center'}}>{error}</HelperText>
                    {sucess ? <Text style={styles.sucessText}> {sucess} </Text> : null}
                </View>
            
                <View style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => signUpHandler()}>SignUp</Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => navigation.navigate('Login')}> Have an Account? Login</Button> 
                </View>

            </Card>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    buttonContainer : {padding : 10},
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

export default SignUp