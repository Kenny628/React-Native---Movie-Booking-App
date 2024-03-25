import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { AdditionalStack } from '../Component/StackNavigator';
import ContactUs from '../Screens/ContactUs';
const Drawer = createDrawerNavigator ();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  screenOptions={{unmountOnBlur : true, drawerLabelStyle: {fontSize: 15},headerleft: true, headerShown: false,overlayColor: 'transparent', drawerActiveTintColor: 'white', drawerInactiveTintColor: 'white',drawerStyle:{ backgroundColor: '#222222', width: '60%',}}}
        drawerType="slide"
    >
    <Drawer.Screen name="Main Menu" component={TabNavigator}/>
    <Drawer.Screen name = "About Us" component ={AdditionalStack}/>
    <Drawer.Screen name = "Contact Us" component ={ContactUs}/>
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;