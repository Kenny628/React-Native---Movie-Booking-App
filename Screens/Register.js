import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground, Alert} from 'react-native'
import React, { Component, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

let config = require("../Config")
export default class Register extends Component{
  constructor(props){
      super(props);
      this.state = {
          user: [],
          name: '',
          nameIsCorrect : null,
          email: '',
          emailIsCorrect : null,
          password: '',
          passwordIsCorrect : null,
          allCorrect: null,
          alert : false,
          title : "",
          errMsg: "",
          confirmText : "OK",
      };
      this._load = this._load.bind(this)
  };

  hideAlert = () => {
    if(this.state.confirmText === "Login"){
      this.setState({
        alert: false
      });
      this.props.navigation.push("Login");
    }else{
      this.setState({
        alert: false
      });
    }
    }

  _load(){
      let url = config.settings.serverPath + '/api/register'
      fetch(url).then(response=>{
          if(!response.ok)
          {
              Alert.alert('Error : ', response.status.toString());
              throw Error('Error : ', response.status.toString());
          }
          console.log(response);
          return response.json()
          }).then(users => this.setState({user : users})).catch(error => console.log(error));
  }

  _save() {
    let url = config.settings.serverPath + '/api/register';
    {
      console.log(this.state.email.toString())
    }
    fetch (url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }), 
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount(){
      this._load();
  }

  async _saveUser(key1,key2,key3,value1,value2,value3) {
    try {
     
      await AsyncStorage.multiSet([[key1, value1], [key2,value2], [key3,value3]]);

    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }


render(){
  return (
    <ImageBackground style = {{flex:1}} source={require('../img/wallpaper.jpeg')}>
    <KeyboardAvoidingView 
      style={styles.container}
      behavior = "padding"
    >
      <View style = {styles.inputContainer}>
        <Text style = {styles.title}>Create An Account</Text>
        <Text style = {styles.text}>Enter Your Name:</Text>
      <TextInput
          placeholder='Name'
          onSubmitEditing = {(event) => {
            let name = event.nativeEvent.text;
            if (event.nativeEvent.text === ''){
              this.setState({nameIsCorrect : false});
            }else{
              this.setState({name : name, nameIsCorrect : true});
            }
          }}
          style = {styles.input}
        />
        {this.state.nameIsCorrect == null ? <Text></Text> : this.state.nameIsCorrect ? <Text></Text> : <Text style = {{color: 'red' ,marginHorizontal: 20, marginTop : 0}}>Name is required !</Text>}

        <Text style = {styles.text}>Enter Email:</Text>
        <TextInput
          placeholder='Email'
          onSubmitEditing = {(event) => {
            let email = event.nativeEvent.text;
            if(email.includes('@')){
              this.setState({email : email, emailIsCorrect : true});
            }else{
              this.setState({email: email, emailIsCorrect : false});
            }
          }}
          style = {styles.input}
        />
        {this.state.email === ''? <Text></Text> : this.state.emailIsCorrect ? <Text></Text> : <Text style = {{color: 'red' ,marginHorizontal: 20, marginTop : 0}}>Incorrect email input, please try again !</Text>}

        <Text style = {styles.text}>Enter Password:</Text>
        <TextInput
          placeholder='Password'
          onSubmitEditing = {(event) => {
            let password = event.nativeEvent.text;
            if (password.length < 5){
              this.setState({password : password, passwordIsCorrect : false});
            } else {
              this.setState({password : password, passwordIsCorrect : true});
            }
          }}
          style = {styles.input}
          secureTextEntry
        />
        {this.state.password === ''? <Text></Text> : this.state.passwordIsCorrect ? <Text></Text> : <Text style = {{color: 'red' ,marginHorizontal: 20, marginTop : 0}}>Password must contains more than 5 character !</Text>}
      </View>

        <View style = {styles.buttonContainer}>
          <TouchableOpacity
            // onPress={this.validates}
            onPress={async() => {
              for (var w in this.state.user){
                // console.log(this.state.user[w]["email"])
                if(this.state.user[w]["email"] === this.state.email){
                 await this.setState({allCorrect: false});
                }
                else{
                  await this.setState({allCorrect: true});
                }
              }
              if(this.state.nameIsCorrect===false || this.state.passwordIsCorrect===false || this.state.passwordIsCorrect == null || this.state.nameIsCorrect == null){
                // Alert.alert("Information not complete");
                this.setState({alert: true, title : "Information not completed" , errMsg : "Please fill in all the required field !"})
              }
              else if(this.state.allCorrect===false){
                // Alert.alert("Email already been used by others");
                this.setState({alert: true, title : "Email existed" , errMsg : "Email already been used by others"})
              }
              else if(this.state.nameIsCorrect === true && this.state.passwordIsCorrect === true && this.state.allCorrect === true){
                this._save();
                this._saveUser('name', 'email', 'password', this.state.name.toString(), this.state.email.toString(), this.state.password.toString());
                this.setState({alert: true, title : "Registered successfully" , errMsg : "You may login to our application now !", confirmText : "Login"})
              }

             
          }}
          
   
            style = {styles.button} 
          >
            <Text style = {styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate ('Login')}}
            style = {[styles.button, styles.buttonOutline]} 
          >
            <Text style = {styles.buttonOutlineText}>Back</Text>
          </TouchableOpacity>

          <AwesomeAlert
          show={this.state.alert}
          showProgress={false}
          title={this.state.title}
          message= {this.state.errMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText= {this.state.confirmText}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
              this.hideAlert();
          }}
          />
        </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    color: '#FAFAD2',
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: 6,
    color: 'white'
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
    fontSize: 20,
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