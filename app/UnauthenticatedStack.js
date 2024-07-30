import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Landing from './screens/LandingScreen'; // Importa la pantalla de landing

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}