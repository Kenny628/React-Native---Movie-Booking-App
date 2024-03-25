import React, {Component} from 'react';
import {Text, View, Image, TextInput, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import 
{ InputWithLabel,
  CustomizeButton
} from '../Component/customInputAndcustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

let config = require("../Config")

export default class EditProfile extends Component{
  constructor(){
    super()
    this.state ={
      username : '',
      password : '',
      allUserEmail: [],
      currentEmail: '',
      email: '',
      newName : '',
      newNameIsSet: false, 
      emailIsCorrect : false,
      oPIsCorrect : "false",
      nPIsCorrect : "false",
      cPIsCorrect : "false",
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      alert : false, // here 
      title : "",
      errMsg: "",
      confirmText : "OK",
    }

    this._load = this._load.bind(this);
  }

    hideAlert = () => {
    if(this.state.confirmText === "Home"){
      this._updateInfo()
    }else{
      this.setState({
        alert: false
      });
    }
    }

    componentDidMount(){
        this._load();
    }

    _updateInfo(){
      this._saveUser();
      this._updateDb();
      this.props.navigation.push("ProfileScreen");
    }

    _load(){
      this.getUserInfo();
      this._getAllUsersEmail();
    }

    _getAllUsersEmail(){
      let url = config.settings.serverPath + '/api/userEmail';
          fetch(url).then(response=>{
              if(!response.ok)
              {
                  throw Error('Error : ', response.status.toString());
              }
              return response.json()
    }).then(emails => this.setState({allUserEmail : emails})).catch(error => console.log(error));
    }

    _saveUser = async() => {
        try {
          await AsyncStorage.multiSet([["password",this.state.newPassword],["username", this.state.newName]]);
      
        } catch (error) {
          console.log('## ERROR SAVING ITEM ##: ', error);
        }
    }

    _updateDb(){
      let url = config.settings.serverPath + '/api/registers/' + this.state.currentEmail;
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.newName,
          password: this.state.newPassword,
        }),
      })
        .catch(error => {
          console.log(error);
        });
    }

    getUserInfo = async () => {
  
      try{
          let aUser = await AsyncStorage.multiGet([
              'username', 'password', 'email',
            ], (err, uInfo) => {
              uInfo.map((result, i, info) => {
                let key = info[i][0];
                let value = info[i][1];
                if(key === "username"){
                  this.setState({username : value});
                }else if(key === "password"){
                  this.setState({password : value});
                }else{
                  this.setState({currentEmail : value});
                }
              });
            })   
      }catch(error){
          alert(error);
      }
};

  render(){
    return(
      <ScrollView style = {styles.overallContainer}>
        <View style = {{backgroundColor : "#8B0000", alignItems : "center"}}>
                <Image source = {require('../img/edit.png')} style = {{width: 150, height : 120}}/>
                <Text style = {{fontSize : 15, color : "white", marginBottom : 10}}>Update your information here!</Text>
         </View>
        <InputWithLabel title = "Name" placeholder = "Please enter your desired name" placeholderTextColor = "white" onChangeText = {(name) => {
          if(name === ""){
            this.setState({newNameIsSet : false});
          }else{
            this.setState({newName: name , newNameIsSet: true});
          }
          }}/>

        <View style = {styles.PasswordContainer}>
            <Text style = {styles.PasswordLabel}>Password</Text>
            <View style = {styles.Pcontainer}>
                <Text style = {{color : "red", alignSelf : 'center', alignItems: 'center',borderWidth : 1, borderColor: "white",fontSize : 15, padding : 20, borderRadius : 10}}>Old Password : </Text>
                <TextInput style = {styles.PasswordInput} secureTextEntry={true} autoCorrect={false} placeholder = "Enter your current password" placeholderTextColor = "white" onEndEditing = {(event) => {
                  this.setState({oldPassword: event.nativeEvent.text});
                  if(event.nativeEvent.text !== this.state.password){
                    this.setState({oPIsCorrect : "false"})
                  }else{
                    this.setState({oPIsCorrect : "true"})
                  }
                  }}></TextInput>
            </View>
            <Text></Text>
            {/* {this.state.oldPassword === "" ? <Text></Text> : this.state.oPIsCorrect === "false" ? <Text style= {{color: "red", padding : 5, fontSize : 15}}>*Incorrect password entered, please try again !</Text> : <Text></Text>} */}

            <View style = {styles.Pcontainer}>
                <Text style = {{color : "red", alignSelf : 'center', alignItems: 'center',borderWidth : 1, borderColor: "white", fontSize : 15, padding : 16.5, borderRadius : 10}}>New Password : </Text>
                <TextInput style = {styles.PasswordInput} secureTextEntry={true} autoCorrect={false} placeholder = "Enter new password" placeholderTextColor = "white" onEndEditing = {(event) => {
                  this.setState({newPassword: event.nativeEvent.text})
                  if(event.nativeEvent.text.length < 5){
                    this.setState({nPIsCorrect: "false"})
                  }
                  else{
                    this.setState({nPIsCorrect : "true"})
                  }
                  }}></TextInput>
            </View>

            {this.state.newPassword === "" ? <Text></Text> : this.state.nPIsCorrect === "false"? <Text style= {{color: "red", padding : 5, fontSize : 15}}>*Password must be more than 5 characters</Text>: <Text></Text>}

            <View style = {styles.Pcontainer}>
                <Text style = {{color : "red", alignSelf : 'center', alignItems: 'center',borderWidth : 1, borderColor: "white", fontSize : 15, paddingTop:15, paddingBottom: 15, paddingLeft : 9.5, borderRadius : 10}}>Confirm Password : </Text>
                <TextInput style = {styles.PasswordInput} secureTextEntry={true} autoCorrect={false} placeholder = "Enter again new password" placeholderTextColor = "white" onEndEditing = {(event) => {
                  this.setState({confirmPassword: event.nativeEvent.text})
                  if(event.nativeEvent.text !== this.state.newPassword){
                    this.setState({cPIsCorrect : "false"})
                  }else{
                    this.setState({cPIsCorrect : "true"})
                  }
                }}></TextInput>
            </View>
            {this.state.confirmPassword === '' ? <Text></Text> : this.state.confirmPassword === this.state.newPassword ? <Text></Text> : <Text style = {{fontSize : 12, color: 'red' ,marginHorizontal: 10, marginTop : 0}}>*Invalid password with new password entered, please try again</Text>}

        </View>

        <View>
          <CustomizeButton TouchStyle = {styles.SaveButton} text = "Update" styles = {{padding : 15, color: 'white'}} onPress = {() =>{
            if(this.state.newNameIsSet && this.state.oPIsCorrect === "true" && this.state.nPIsCorrect === "true" && this.state.cPIsCorrect == "true"){
                this.setState({title : "Information updated" ,errMsg: "", alert: true, confirmText : "Home"})
            }else{
              if(!this.state.newNameIsSet){
                this.setState({title : "Invalid input", errMsg : "Please enter your name !", alert : true, confirmText : "OK"})
              }else if(this.state.oPIsCorrect !== "true"){
                this.setState({title : "Invalid password entered", errMsg : "Please enter your correct original password !", alert : true, confirmText : "OK"})
              }else if(this.state.nPIsCorrect !== "true"){
                this.setState({title : "Invalid password entered", errMsg : "Please enter your preferred new password !", alert : true, confirmText : "OK"})
              }else{
                this.setState({title : "Invalid password entered", errMsg : "Please enter again your password !", alert : true, confirmText : "OK"})
              }
            }}}/>
        </View>

        <AwesomeAlert
          show={this.state.alert}
          showProgress={false}
          title={this.state.title}
          message= {this.state.errMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={this.state.confirmText}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
              this.hideAlert();
          }}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  overallContainer: {
    backgroundColor : '#17171A',
    flex : 1,
    width : "100%"
  },
  PasswordContainer : {
      margin : 15,
  },
  Pcontainer : {
    flexDirection: 'row',
  },
  PasswordLabel : {
      color : 'red',
      fontWeight : 'bold',
      fontSize : 20,
      paddingBottom : 10,
  },
  PasswordInput : {
      backgroundColor : "",
      width: 220,
      borderWidth: 1,
      borderRadius : 10,
      borderColor: "white",
      color: "white"
  },
  SaveButton : {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: "white",
    backgroundColor: "#D21404",
  }
});
