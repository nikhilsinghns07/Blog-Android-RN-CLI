import React,{useState} from 'react'
import { TextInput,Button, Card,HelperText,ActivityIndicator,MD2Colors,Text} from 'react-native-paper';
import { View,StyleSheet,Image} from 'react-native';
import img from '../img/bg2.jpg'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ForgotPassword = () => {
    const [loading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const [email,setEmail] = useState('')
    const [sucess,setSucess] = useState(null)
    let serverError;

    const forgotPasswordHandler = () => {
        setIsloading(true)
        if(email === '' || email === null) {
            setError('Must Provide an Email')
            setIsloading(false)
            return
        }

        fetch("https://api-nikhilsingh7.herokuapp.com/resetpassword",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({"email" : email})

        }).then((res) => res.json())
        .then(response => {
            setError(null)
            console.log(response)
            serverError = response.error

            if(serverError) {
                setError(response.error)
                setIsloading(false)
                return
            }
            if(response.success){
                setIsloading(false)
                setError(null)
                setEmail(null)
                setSucess('Email Sent,Kindly Check Your Inbox.')
            }
        })

        wait(5000).then(() => {
            setSucess(null)
            setEmail(null)
        })

    }
    
    return (
        <React.Fragment>
            
            {loading === true ? <View>
                <ActivityIndicator animating={true} size='small' color={MD2Colors.red800}  />
                <Text style={{textAlign:'center'}}>Submiting Request....</Text>
            </View> : null}
            <Image source={img} style={styles.topImg}/>
            <Card  style={styles.cardContainer}>
                <TextInput label="Email"  mode="outlined"  onChangeText={(text) => setEmail(text)} />
                <View style={styles.buttonContainer}>
                    <Button mode="contained-tonal" onPress={() => {forgotPasswordHandler()}}> Forgot Password</Button>
                </View>
                <View style={styles.container}>
                    {error ? <HelperText  type="error"> {error} </HelperText> : null}
                    {sucess ? <Text style={styles.successMessage}> {sucess} </Text> : null}
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
    },
    topImg : {
        width:'100%',height:200
    },
    cardContainer : {margin:10,padding:15,borderRadius:20},
    successMessage : {
        fontSize : 14,
        color : 'green',
        fontWeight : '400',
        padding: 5,
        margin : 5
    }
})

export default ForgotPassword