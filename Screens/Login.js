import React from 'react'
import { TextInput,Button, Card} from 'react-native-paper';
import { View,StyleSheet } from 'react-native';


const Login = ({navigation}) => {
    return (
        <React.Fragment>
           <Card  style={{margin:10,padding:15,borderRadius:20}}>
                <TextInput label="Email" />
                <TextInput label="Password" />

                <View style={styles.buttonContainer}>
                    <Button >Login</Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => navigation.navigate('Signup')}> New ? Create a Free account</Button> 
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="contained-tonal">Forgot Password</Button>
                </View>
                
            </Card>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    buttonContainer : {padding : 10}
})

export default Login