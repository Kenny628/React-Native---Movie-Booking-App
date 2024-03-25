import React from "react";
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import BookingHistory from '../Screens/BookingHistory';
import HomeScreen from '../Screens/HomeScreen';
import Ticketing from "../Screens/Ticketing";
import AboutUs from "../Screens/AboutUs";
import ResultScreen from "../Screens/SearchScreen";
import Search from "../Screens/SearchMovie";
import PaymentScreen from "../Screens/Payment";
import UpcomingBooking from '../Screens/UpcomingBooking'
import EditProfile from "../Screens/EditProfile";
import AllNowShowingMovie from "../Screens/AllNowShowingMovie";
const StackNav = createStackNavigator();

const ProfileStack = () => {
    return (
        <StackNav.Navigator screenOptions = {styles.HeaderOptionsStyle}>
            <StackNav.Screen
                name="ProfileScreen"
                component={Profile}
                options={{ headerLeft: null }}>
            </StackNav.Screen>
            <StackNav.Screen
                name="Booking History"
                component={BookingHistory}>
            </StackNav.Screen>

            <StackNav.Screen 
                name = "Edit Profile"
                component= {EditProfile}
        
                >   
            </StackNav.Screen>
            <StackNav.Screen 
                name = "Upcoming Booking"
                component= {UpcomingBooking}>
            </StackNav.Screen>
        </StackNav.Navigator>
    )
}

const HomeStack = () => {
    return (
        <StackNav.Navigator initialRouteName="HomeScreen" screenOptions = {styles.HeaderOptionsStyle}>
            <StackNav.Screen
                name="HomeScreen"
                component={HomeScreen}
                options = {{headerLeft : null, headerShown: false}}

            >
            </StackNav.Screen>
            <StackNav.Screen
                name="Result"
                component={ResultScreen}
                options={{ headerTitle : ""}}
            >
            </StackNav.Screen>
            <StackNav.Screen
                name="Search"
                component={Search}
            >
            </StackNav.Screen>
            <StackNav.Screen
                name="Ticketing"
                component={Ticketing}
                options={{ title: "" }}>
                
            </StackNav.Screen>

            <StackNav.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{ title: "" }}>
                
            </StackNav.Screen>
        </StackNav.Navigator>
    )
}
const MovieStack = () => {
    return (
        <StackNav.Navigator initialRouteName="AllNowShowingMovie" screenOptions = {styles.HeaderOptionsStyle}>
            <StackNav.Screen
                name="AllNowShowingMovie"
                component={AllNowShowingMovie}
                options={{ title: "Price List" , headerLeft: null}}>                
            </StackNav.Screen>
        </StackNav.Navigator>
    )
}
const AdditionalStack = () => {
    return (
        <StackNav.Navigator>
            <StackNav.Screen
                name="AboutUs"
                component={AboutUs}
                options={{ headerLeft: null, headerShown: false }}>
            </StackNav.Screen>
        </StackNav.Navigator>
    )
}


export { ProfileStack, HomeStack, AdditionalStack,MovieStack};



const styles = StyleSheet.create({
    profileHeader: {
        title: 'Profile',
        headerTitleAlign: 'center',
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#5bc8af',
        },
    },
    BookingHistoryHeader: {
        title: "History",
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#5bc8af',
        },
    },
    BookingHistoryHeader: {
        title: "Edit Profile",
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#5bc8af',
        },
    },
    HeaderOptionsStyle: {
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleAlign : "center",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
});