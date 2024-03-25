import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground, Button, Alert, Image} from 'react-native'
import React, {Component} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 
{ CustomizeButton } from '../Component/customInputAndcustomButton';
import AwesomeAlert from 'react-native-awesome-alerts';

  let config = require("../Config")
  export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: [],
            username: null,
            email: null,
            password: null,
            allCorrect: false,
            alert : false
        };
        this._load = this._load.bind(this);
        this._saveUserInfo = this._saveUserInfo.bind(this);
    };

    
    hideAlert = () => {
      this.setState({
        alert: false
      });
    };

    _load(){
        let url = config.settings.serverPath + '/api/register'
        fetch(url).then(response=>{
            if(!response.ok)
            {
                throw Error('Error : ', response.status.toString());
            }

            return response.json()
            }).then(users => this.setState({user : users})).catch(error => console.log(error));
    }

    _saveUserInfo = async() => {
      try {
        await AsyncStorage.multiSet([["email",this.state.email],["password",this.state.password],["username", this.state.username]]);

      } catch (error) {
        console.log('## ERROR SAVING ITEM ##: ', error);
      }
    }

    componentDidMount(){
        this._load();
    }

render(){
  return (
    <ImageBackground style = {{flex:1}} source={require('../img/wallpaper.jpeg')}>
    <KeyboardAvoidingView 
      style={styles.container}
      behavior = "padding"
    >
      <Image style = {{alignItems: 'center', justifyContent: 'center', resizeMode: 'center', width : 150, height: 150}} source={require('../img/logo.png')}></Image>
      <View style = {styles.inputContainer}>
        <Text style = {styles.title}>Welcome To Movie Booking Application</Text>
          <TextInput
            placeholder='Email'
            value={this.state.email}
            onChangeText = {x => this.setState({email: x})}
            style = {styles.input}
          />
          <TextInput
            placeholder='Password'
            value={this.state.password}
            onChangeText = {y => this.setState({password: y})}
            style = {styles.input}
            secureTextEntry
          />
      </View>

        <View style = {styles.buttonContainer}>
            <CustomizeButton TouchStyle = {styles.button} text = "Login" styles = {styles.buttonText} onPress = {async() => {
                for (var u in this.state.user){
                  if(this.state.user[u]["email"] === this.state.email && this.state.user[u]["password"] === this.state.password){
                    await this.setState({allCorrect: true, username : this.state.user[u]["name"]});
                  }
                }

                if (this.state.allCorrect === false){
          
                  this.setState({alert : true})
                } else {
                  console.log("Login to Home Page");
                  this._saveUserInfo()
                  this.props.navigation.navigate("Application");
                }
            }}/>

          <CustomizeButton TouchStyle = {[styles.button, styles.buttonOutline]} text = "Register" styles = {styles.buttonOutlineText} onPress={() => {this.props.navigation.push('Register')}} />

          <AwesomeAlert
          show={this.state.alert}
          showProgress={false}
          title= "Invalid email or password!"
          message= "Please try again"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText= "Try Again"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          />
        </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    color: '#FAFAD2',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#EBE9B5',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#EBE9B5',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
  },
})