import React, {Component} from 'react';
import {Text, View, Image, Button, StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import 
{ InputWithLabel,
  CustomizeButton
} from '../Component/customInputAndcustomButton';
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';

let config = require("../Config")

export default class ContactUs extends Component{

  constructor(){
    super();
    this.state = {
      name : "",
      email : "",
      location: "Klang",
      message : "",
      nameIsSet: false,
      emailIsSet: false,
      messageIsSet : false,
      alert: false,
      title : "",
      errMsg: "",
      confirmText : "OK",
    }
  }

  showAlert = () => {
    this.setState({
      alert: true
    });
  };

  hideAlert = () => {
    if(this.state.confirmText === "Home"){
      this.setState({
        name : "", 
        email : "", 
        location : "Klang", 
        message : "", 
        nameIsSet: false, 
        emailIsSet: false, 
        messageIsSet : false, 
        alert: false, 
        title: "", 
        errMsg: "",
        confirmText : "OK"});
        this.props.navigation.navigate("Main Menu");
    }else{
      this.setState({
        alert: false
      });
    }
  };

  _saveEnquiry(){
    let url = config.settings.serverPath + '/api/enquiries';
    fetch (url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name : this.state.name,
        email : this.state.email,
        location: this.state.location,
        message : this.state.message, 
      }), 
    })
    .then(response => {
      if (!response.ok) {
        Alert.alert('Error:', response.status.toString());
        throw Error ('Error ' + response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
  }

  render(){

    return(
            <ScrollView style = {styles.backgroud}>
              <View style = {{backgroundColor : "#8B0000", alignItems : "center"}}>
                <Image source = {require('../img/customer.png')} style = {{width: 150, height : 120}}/>
                <Text style = {{fontSize : 15, color : "white", marginBottom : 10}}>Feel free to contact us !</Text>
              </View>

                <InputWithLabel title = "Name" value = {this.state.name} onChangeText = {(name) => {
                    if(name === ""){
                      this.setState({nameIsSet : false});
                    }else{
                      this.setState({name: name , nameIsSet: true});
                    }
                }}/>
                {/* <CustomizeButton styles = {{backgroundColor : "white"}} onPress = {() => {console.log("hahaha")}} disabled = {false} text = "dadas"/> */}
                <InputWithLabel title = "Email" value = {this.state.email} onChangeText = {(email) => {
                          this.setState({email:email});
                }}/>

                <View style = {styles.subContainer}>
                    <Text style = {{color : 'red', fontWeight : 'bold', fontSize : 20, paddingBottom : 10,}}>Pick a location</Text>
                          <Picker
                          style = {styles.pickerStyle}
                          itemStyle = {{backgroundColor: "blue", color :"blue"}}
                          mode = {'dialog'}
                          selectedValue = {this.state.location}
                          onValueChange={
                            (itemValue, itemIndex) => this.setState({location : itemValue})
                          }>
                            <Picker.Item label="Klang" value = "Klang"/>
                            <Picker.Item label ="Kuala Lumpur" value = "Kuala Lumpur"/>
                            <Picker.Item label="Sunway" value = "Sunway"/>
                            <Picker.Item label="Cheras selatan" value = "Cheras selatan"/>
                            <Picker.Item label="Johor" value = "Johor"/>
                          </Picker>
                </View>
                
                <InputWithLabel title = "Message" value = {this.state.message} multiline = {true} numberOfLines = {8} styles = {{textAlignVertical: 'top'}}
                onChangeText = {(msg) => {
                  if(msg === ""){
                    this.setState({messageIsSet : false});
                  }else{
                    this.setState({message: msg , messageIsSet: true});
                  }
                }}
                />

                <View>

                      <CustomizeButton TouchStyle = {styles.submitButton} styles = {{padding : 15, color: 'white'}} text = "Submit" onPress = {() =>{
                        if(this.state.nameIsSet === false){
                          this.setState({title : "Unspecified field", errMsg: "Please enter your name !", alert: true})
                        }else if(this.state.email.includes('@') == false){
                          this.setState({title : "Unspecified field", errMsg: "Please enter a valid email! !", alert: true })
                        }else if (this.state.messageIsSet === false){
                          this.setState({title : "Unspecified field",errMsg: "Please enter some message you want to tell us !", alert: true })
                        }else{
                          this._saveEnquiry();
                          this.setState({title : "Thank you" ,errMsg: "Form submitted successfully !", alert: true, confirmText : "Home"})
                        }}}
                      />

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
              </View>
            </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  backgroud :{
   backgroundColor : '#17171A',
    flex : 1,
    width : "100%"
  },
  subContainer: {
    margin : 15,
  },
  pickerStyle: {
    height: 40,
    backgroundColor : "lightgray",
  },
  submitButton: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: "white",
    backgroundColor: "#D21404",
  }
});