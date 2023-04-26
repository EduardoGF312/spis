
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {BottomTabNavigator} from './src/components/BottomTabNavigator'
import Toast from 'react-native-toast-message';

export default function App(){
  return (

    <NavigationContainer>
      <BottomTabNavigator />
      <Toast/>
    </NavigationContainer>
  );
}