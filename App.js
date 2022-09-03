import React, { useState } from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import {  MD3LightTheme as DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper';

import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/SignUp';
import CreatePost from './Screens/CreatePost';
import EditPost from './Screens/EditPost';
import UserPost from './Screens/UserPost';
import ResetPassword from './Screens/ResetPassword';
import ForgotPassword from './Screens/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [username,setUsername] = useState(null)
  const [sname,setSname] = useState(null)

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  const Stack = createNativeStackNavigator()

  try {
    const loginKey = await AsyncStorage.getItem('LOGIN_TOKEN')
    const USERNAME = await AsyncStorage.getItem('USERNAME')
    const SNAME = await AsyncStorage.getItem('SNAME')
    
    if(loginKey !== null) {

    }
  } catch (error) {
    
  }

  return (
    <React.Fragment>
      <StatusBar />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator> 
            <Stack.Screen name="Home" component={Home}  options={({navigation}) => ({
              headerTitle: 'Home',
              headerStyle : {backgroundColor:'#f4511e'},
              headerTintColor : '#fff',
              headerTitleStyle : {fontWeight:'bold'},
              headerRight: () => (
                <Button mode='contained' onPress={() => navigation.navigate('Login')}>Login</Button>
              )
            })}/>

          <Stack.Screen name="Login" component={Login} options={{
            headerTitle : 'Login',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'},
            
          }}/>
          
          <Stack.Screen name="Signup" component={Signup} options={{
            headerTitle : 'Signup',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}
          }}/>
          <Stack.Screen name="CreatePost" component={CreatePost} options={{
            headerTitle : 'CreatePost',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}
          }}/>
          <Stack.Screen name="EditPost" component={EditPost} options={{
            headerTitle : 'EditPost',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}
          }}/>
        <Stack.Screen name="UserPost" component={UserPost} options={{
            headerTitle : 'UserPost',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}   
          }}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
            headerTitle : 'ResetPassword',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}
          }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
            headerTitle : 'ForgotPassword',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'}
          }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
     
    </React.Fragment>
  );
}
