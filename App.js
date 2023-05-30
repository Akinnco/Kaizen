import React, {useState, useRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {LogBox} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
