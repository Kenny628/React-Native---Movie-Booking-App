import React, {Component} from 'react';
import {Text, View, Image, Button,StyleSheet,TouchableOpacity, ShadowPropTypesIOS, FlatList,ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import 
// { 
//   CustomizeButton,
// } from '../Component/customInputAndcustomButton';

let config = require("../Config")

export default class BookingHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            booking: [],
            email: "",

        }
        this._load = this._load.bind(this);
    }

    _load(){
        let url = config.settings.serverPath + '/api/booking';
        fetch(url).then(response=>{
            if(!response.ok)
            {
                Alert.alert('Error : ', response.status.toString());
                throw Error('Error : ', response.status.toString());
            }
            console.log(response);
            return response.json()
            }).then(bookings => this.setState({booking : bookings})).catch(error => console.log(error));
    }

    getUserInfo = async () => {
        try{
            let aUser = await AsyncStorage.getItem("email");
            this.setState({email : aUser});
        }catch(error){
            alert(error);
        }
    };

    componentDidMount(){
        this._load();
        this.getUserInfo();
    }

    render(){
        let currentMonth = new Date().getMonth() + 1;
        let currentDate = new Date().getDate();
        let currentHour = new Date().getHours() + 8;
        let currentMin = new Date().getMinutes();

        return (
            <View style = {styles.background}>
            <FlatList
            // style = {styles.overallContainer} 
            data = {this.state.booking}
            renderItem = {({item}) => {
                {
                    let userEmail = item["userEmail"];
                    let bookingDate = item["booking_Date"].substring(0,2); //Date
                    let bookingDateInt = parseInt(bookingDate);
                    let bookingMonth = item["booking_Date"].substring(3);
                    let bookingMonthInt = parseInt(bookingMonth);
                    let bookingHour = item["bookingTime"].substring(0,2); //Time
                    let bookingHourInt = parseInt(bookingHour);
                    let bookingMin = item["bookingTime"].substring(3);
                    let bookingMinInt = parseInt(bookingMin);
                    let poster = item["Poster"];
                    let bookingDate2 = item["booking_Date"].replace(/\s/g,"");

                    if(userEmail != this.state.email){
                        
                    }else if(bookingMonthInt < currentMonth || bookingMonthInt == currentMonth && bookingDateInt < currentDate || bookingMonthInt == currentMonth && bookingDateInt == currentDate && bookingHourInt < currentHour || bookingMonthInt == currentMonth && bookingDateInt == currentDate && bookingHourInt == currentHour && bookingMinInt < currentMin){
                        return <View style = {styles.subContainter}>
                                    <Image source={{ uri: poster}} style = {{width : 150, height : 320}}/>
                                    <View style = {styles.labelContainer}>
                                        <View style = {styles.labelContainer2}>
                                            <Text style = {styles.label}>Movie</Text>
                                            <View style = {styles.dataContainer}> 
                                                <Text style = {styles.data}>{item["movie_name"]}</Text>
                                            </View>
                                        </View>
                                        <View style = {styles.labelContainer2}>
                                            <Text style = {styles.label}>Date</Text>
                                            <View style = {styles.dataContainer}> 
                                                <Text style = {styles.data}>{bookingDate2}</Text>
                                            </View>
                                        </View>
                                        <View style = {styles.labelContainer2}>
                                            <Text style = {styles.label}>Seats</Text>
                                            <View style = {styles.dataContainer}> 
                                                <Text style = {styles.data}>{item["booking_Seats"]}</Text>
                                            </View>
                                        </View>
                                        <View style = {styles.labelContainer2}>
                                            <Text style = {styles.label}>Time</Text>
                                            <View style = {styles.dataContainer}> 
                                                <Text style = {styles.data}>{item["bookingTime"]}</Text>
                                            </View>
                                        </View>
                                        <View style = {styles.labelContainer2}>
                                            <Text style = {styles.label}>Location</Text>
                                            <View style = {styles.dataContainer}> 
                                                <Text style = {styles.data}>{item["Location"]}</Text>
                                            </View>
                                        </View>
                                        <View style = {{marginTop : 8, flexDirection : "row"}}>
                                          
                                            <Text style = {{color : "white" , fontSize: 21, marginLeft : 150}}>RM{item['Price']}</Text>  
                                        </View>
                                    </View>
                                   
                                </View>
                    }
                }
            }}>
            </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        backgroundColor : '#17171A', 
    },
    overallContainer: {
        margin : 10,
        borderWidth : 1,
        backgroundColor : 'red'
    },
    subContainter : {
        margin : 5,
        marginBottom : 2,
        flex : 1,
        flexDirection: 'row',
        borderWidth : 1,
        backgroundColor : '#17171A',
    },
    labelContainer :{
        marginLeft: 10,
        marginTop : 0
    },
    labelContainer2:{
        marginTop : 5,
    },
    label : {
        fontWeight : 'bold',
        color : 'red',
        fontSize : 15
    },
    dataContainer:{
        borderColor : "white",
        borderWidth : 2,
        borderRadius: 5,
        width : 210
    },
    data :{
        color : "white",
        marginLeft : 3,
        marginTop : 3,
        marginBottom: 3
    },
    deleteButton : {
        backgroundColor : 'red',
        color: "white",
        width : 60,
        alignItem : "center",
        borderRadius : 5
    }
});