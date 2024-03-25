import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProfileStack} from "../Component/StackNavigator";
import { HomeStack } from "../Component/StackNavigator";
import { MovieStack } from "../Component/StackNavigator";
import {StyleSheet} from 'react-native';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={styles.tabBarStyle} > 
            <Tab.Screen  
                name = "Home"
                component={HomeStack}
                options= {{ tabBarIcon: () => { return <Ionicons name= 'home' color= 'black' size = {20}></Ionicons>}}}>
            </Tab.Screen>
            <Tab.Screen 
                name = "Pricing"
                component={MovieStack}
                options= {{ tabBarIcon: () => { return <Ionicons name= 'pricetags-outline' color= 'black' size = {20}></Ionicons>}}}>
                
                
            </Tab.Screen>
            <Tab.Screen 
                name = "Profile"
                component= {ProfileStack}
                options= {{ tabBarIcon: () => { return <Ionicons name= 'person' color= 'black' size = {20}></Ionicons>}}}>
            </Tab.Screen>
           
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle : {
    borderColor:"black",
    unmountOnBlur : true,
    headerShown: false,
    tabBarActiveBackgroundColor : "gold",
    tabBarActiveTintColor : "black",
    tabBarInactiveBackgroundColor: "white",
    tabBarInactiveTintColor : "black",
    tabBarLabelStyle : {
      // fontWeight : "bold",
      fontSize : 12
    }
  }
});

