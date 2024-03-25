import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import DrawerNavigator from './Component/DrawerNavigator';

const StackNav = createStackNavigator();

export default class App extends Component{
  render(){
      return(
          <NavigationContainer>
              <StackNav.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
              <StackNav.Screen
                  name = "Register"
                  component = {Register}>
              </StackNav.Screen>
              <StackNav.Screen
                  name = "Login"
                  component = {Login}>    
              </StackNav.Screen>
              <StackNav.Screen
                  name = "Application"
                  component = {DrawerNavigator}
                  >    
              </StackNav.Screen>
              </StackNav.Navigator>
            </NavigationContainer>
      );
  }
}