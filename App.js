import React, {useEffect, useState } from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  MD3LightTheme as DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/SignUp';
import CreatePost from './Screens/CreatePost';
import EditPost from './Screens/EditPost';
import UserPost from './Screens/UserPost';
import ForgotPassword from './Screens/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Root = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [username,setUsername] = useState(null)

  const Tab = createBottomTabNavigator();
  
  const validations = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      const UNAME =  await AsyncStorage.getItem('USERNAME')
      setUsername(UNAME)
      
    } catch(e) {
      // read key error
    }

    keys.forEach(el => {
      if(el == 'LOGIN_TOKEN'){
          setIsLoggedIn(true)
      }
    })
  }

  useEffect(() => {
    validations()
  },[validations])
  
  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'ios-home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }else if (route.name === 'CreatePost') {
          iconName = focused ? 'create' : 'create-outline'
        }
        else if(route.name === 'Login') {
          iconName = focused ? 'log-in' : 'log-in-outline'
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>

      <Tab.Screen name="Home" component={Home}  options={{
        headerTitle: 'NS07',
        headerStyle : {backgroundColor:'#f4511e'},
        headerTintColor : '#fff',
        headerTitleStyle : {fontWeight:'bold'}
      }}/>

      {isLoggedIn ?

      <Tab.Screen name="CreatePost" component={CreatePost} options={{
          headerTitle : 'CreatePost',
          headerStyle : {backgroundColor:'#f4511e'},
          headerTintColor : '#fff',
          headerTitleStyle : {fontWeight:'bold'},
          headerTintColor : '#fff'
      }}/> : null
      }
        
      {isLoggedIn ? <Tab.Screen name="Profile" component={UserPost} options={{
        headerTitle : `${username}`,
        headerStyle : {backgroundColor:'#f4511e'},
        headerTintColor : '#fff',
        headerTitleStyle : {fontWeight:'bold'},
        headerRight : (({navigation}) => (
          <Button mode='contained' onPress={async () => {
            try {
              await AsyncStorage.removeItem('LOGIN_TOKEN')
              await AsyncStorage.removeItem('USERNAME')
              await AsyncStorage.removeItem('SNAME')
              setIsLoggedIn(false)
              navigation.navigate('Home')
            }catch (e) {}
          }}>Logout </Button>
        ))
      }}/> : null} 

      {!isLoggedIn ?
          <Tab.Screen name="Login" component={Login} options={{
            headerTitle : 'Login',
            headerStyle : {backgroundColor:'#f4511e'},
            headerTintColor : '#fff',
            headerTitleStyle : {fontWeight:'bold'},
            
      }}/> : null}

    </Tab.Navigator>
  )
}

const App = () => {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  const Stack = createNativeStackNavigator()

  return (
    <React.Fragment>
      <StatusBar />
      <PaperProvider theme={theme}>
        <NavigationContainer>

          <Stack.Navigator>  
          <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>

          <Stack.Screen name="Signup" component={Signup} options={{
            headerTitle : 'Signup',
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

export default App