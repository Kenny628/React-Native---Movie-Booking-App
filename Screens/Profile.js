import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 
{
  CustomizeButton,
} from '../Component/customInputAndcustomButton';

export default class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",
            email: '',
        }
        this._refreshProfile = this._refreshProfile.bind(this);
    }

    componentDidMount(){
        this.getUserInfo();
    }

    _refreshProfile(){
        this.getUserInfo();
    }

    getUserInfo = async () => {
        try{
            let aUser = await AsyncStorage.multiGet([
                'username', 'email',
              ], (err, uInfo) => {
                uInfo.map((result, i, info) => {
                  let key = info[i][0];
                  let value = info[i][1];
                  if(key === "username"){
                    this.setState({username : value});
                  }else{
                    this.setState({email: value});
                  }
                });
              })   
        }catch(error){
            alert(error);
        }
    };

    render(){
        return(

            <ScrollView style = {styles.background}>

            <View style ={styles.container1}>
                <CustomizeButton TouchStyle={styles.TopNavigation} text = "Upcoming booking" styles = {{fontSize : 20, color: 'white'}} onPress={() => {
                    this.props.navigation.navigate('Upcoming Booking');
                }}/>
                <CustomizeButton TouchStyle={styles.TopNavigation} text = "Booking History" styles = {{fontSize : 20, color: 'white'}} onPress={() => {
                    this.props.navigation.navigate('Booking History');
                }}/>
            </View>

            <View style={styles.containerImg}>
                <Image source={require('../img/Profile_Picture.jpg')} style={styles.ProfilePicture}/>
            </View>
            
            <View style={styles.ProfileContainer}>
                <Text style={styles.Section}>Name</Text>
                <Text style = {styles.ProfileContent}>{this.state.username}</Text>
                <Text style={styles.Section}>Email</Text>
                <Text style = {styles.ProfileContent}>{this.state.email}</Text>
            </View>

            <View style={styles.LastContainer}>
                <CustomizeButton TouchStyle={styles.Last2Button} text = "Edit Profile" styles = {{fontSize : 16, color: 'white', padding : 5}} onPress={() => {
                    this.props.navigation.navigate('Edit Profile');
                }}/>
                <CustomizeButton TouchStyle={styles.Last2Button} text = "Logout" styles = {{fontSize : 16, color: 'white', padding : 5}} onPress={() => {
                    this.props.navigation.replace('Login');
                }}/>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor : 'black',
    },
    container1:{
        flexDirection: "row",
        backgroundColor: '#FF0000'
    },
    container2:{
        backgroundColor : "lightgray"
    },
    TopNavigation:{
        height: 50, 
        width: '50%', 
        alignItems:'center',
        paddingTop: 10,
        paddingnBottom: 10,
        borderWidth: 3,
        borderColor: 'black'
    },
    containerImg:{
        marginTop : 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfilePicture:{
        height: 250,
        width: 250,
    },
    ProfileContainer:{
        marginLeft:50,
        marginTop:20,
    },
    Section:{
        color: '#FF0000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingVertical:10,
        fontSize: 25,
    },
    ProfileContent:{
        color: 'white',
        fontStyle: 'italic',
        fontSize: 15
    },
    LastContainer:{
        marginLeft:50,
        marginTop:20,
        flexDirection: "row",
    },
    Last2Button:{
        borderWidth:3,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#FF0000'
    }
});