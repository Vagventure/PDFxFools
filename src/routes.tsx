import React, { JSX, useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './screens/home'
import Tools from './screens/tools'
import Tool from './screens/tool'
import LoadingScreen from './screens/loadingScreen'
import TermsConditions from './screens/terms'
import PrivacyPolicy from './screens/privacy'
import ContactPage from './screens/contact'

export type RootStackParamList = {
  Home: undefined,
  Tools: undefined,
  Tool: {
    name: string,
    img1: string,
    caption1: string,
    img2: string,
    caption2: string
    description: string,
  },
  Terms: undefined,
  Privacy: undefined,
  Contact: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes(): JSX.Element {

  const [isServerReady, setIsServerReady] = useState(false);

  useEffect(() => {
    const wakeServer = async () => {
      try {
        const res = await fetch('https://pdf-toolkit-0z2m.onrender.com');
        if (res.ok) {
          setIsServerReady(true);
        }
      } catch (e) {
        console.log('Waiting for server to wake...');
      }
    };

    wakeServer();

 
    const interval = setInterval(wakeServer, 5000);
    return () => clearInterval(interval);
  }, []);
  
  if (!isServerReady) {
    return <LoadingScreen />; 
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home Page'
          }}
        />
        <Stack.Screen
          name='Tools'
          component={Tools}
          options={{
            title: 'Tools Page'
          }}
        />
        <Stack.Screen
          name='Tool'
          component={Tool}
          options={{
            title: 'Tool Page'
          }}
        />
        <Stack.Screen
          name='Terms'
          component={TermsConditions}
          options={{
            title: 'Terms Page'
          }}
        />
        <Stack.Screen
          name='Privacy'
          component={PrivacyPolicy}
          options={{
            title: 'Privacy Page'
          }}
        />
        <Stack.Screen
          name='Contact'
          component={ContactPage}
          options={{
            title: 'Contact Page'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes