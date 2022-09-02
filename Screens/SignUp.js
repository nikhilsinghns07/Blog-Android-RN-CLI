import React from 'react'
import { TextInput,Button, Card} from 'react-native-paper';
import { View,StyleSheet } from 'react-native';


const SignUp = ({navigation}) => {
    return (
        <React.Fragment>
           <Card  style={{margin:10,padding:15,borderRadius:20}}>
               <TextInput label="Username" />
                <TextInput label="Email" />
                <TextInput label="Password" />
                <TextInput label="Confirm Password" />


                <View style={styles.buttonContainer}>
                    <Button >SignUp</Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => navigation.navigate('Login')}> Have an Account? Login</Button> 
                </View>

            </Card>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    buttonContainer : {padding : 10}
})

export default SignUp