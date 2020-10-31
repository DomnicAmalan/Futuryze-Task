/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {
 
  View,
  Text,
  StatusBar,
  StyleSheet
} from 'react-native';
import {StartScreen, Home} from './Screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppNavigator = createStackNavigator();

const App: () => React$Node = () => {

  return (
    <>
      <StatusBar barStyle="default"/>
      <NavigationContainer>
        <AppNavigator.Navigator headerMode="none">
          <AppNavigator.Screen name="Start" component={StartScreen} />
          <AppNavigator.Screen name="Home" component={Home} />
        </AppNavigator.Navigator>
      </NavigationContainer>      
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
