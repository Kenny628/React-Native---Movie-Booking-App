import React, {Component} from 'react';
import {Text, View, ScrollView,StyleSheet, TextInput, TouchableOpacity} from 'react-native';


class InputWithLabel extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.title}>{this.props.title}</Text>
                <TextInput style = {[styles.input, this.props.styles && this.props.styles]} {...this.props}/>
            </View>
        );
    }
}

class CustomizeButton extends Component{
    render(){
        return(
            <TouchableOpacity style = {[this.props.TouchStyle]}onPress = {this.props.onPress} disabled = {this.props.disabled}>
                <Text style = {[styles.textStyle, this.props.styles && this.props.styles]}>{this.props.text}</Text>
               {/* <TouchableOpacity style={[styles.container,buttonStyle && buttonStyle]} onPress={onPress} >
                <Text style={[styles.text,txtStyle && txtStyle]}>{txt}</Text> */}
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container : {
        margin : 15,
    },
    title  : {
        color : 'red',
        fontWeight : 'bold',
        fontSize : 20,
        paddingBottom : 10,
    },
    input : {
        borderColor : "white",
        borderWidth: 1,
        borderRadius : 10,
        color: "white",
    },
    textStyle :{
        fontFamily: 'Roboto'
    }
});

module.exports = {
    InputWithLabel: InputWithLabel,
    CustomizeButton: CustomizeButton,
};