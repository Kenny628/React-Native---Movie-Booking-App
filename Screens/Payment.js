import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InputWithLabel,
  CustomizeButton,
} from '../Component/customInputAndcustomButton';
import { ScrollView } from 'react-native-gesture-handler';

let config = require('../Config');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: this.props.route.params.movieName,
      date: this.props.route.params.date,
      seats: this.props.route.params.seats,
      location: this.props.route.params.location,
      time: this.props.route.params.time,
      price: this.props.route.params.price,
      bookedString: this.props.route.params.bookedString,
      poster: this.props.route.params.poster,
      email: '',
      cardNumber: '',
      cvv: '',
      value: 0,
      clicks: 0,
      showAlert: false,
      message: '',
      nameOnCard: '',
      expirationMonthAndYear: '',
      successfullyPay: false,
    };
    this.validate = this.validate.bind(this);
    this.save = this.save.bind(this);
    this._edit = this._edit.bind(this);
    this.getUserInfo=this.getUserInfo.bind(this);
  }
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  validate() {
    if (this.state.nameOnCard.length == 0) {
      this.setState({message: 'Please enter name on card.'});
      this.showAlert();
    } else if (this.state.cardNumber.length == 0) {
      this.setState({message: 'Please enter card number.'});
      this.showAlert();
    } 
    else if (this.state.cardNumber.length < 15) {
      this.setState({message: 'Please enter correct card number.'});
      this.showAlert();
    }
    else if (this.state.cvv.length < 3) {
      this.setState({message: 'Please enter correct cvv number.'});
      this.showAlert();
    } 
    else if (this.state.cvv.length == 0) {
      this.setState({message: 'Please enter cvv number.'});
      this.showAlert();
    } else if (this.state.expirationMonthAndYear.length == 0) {
      this.setState({message: 'Please enter card expiration.'});
      this.showAlert();
    }  else if (
      this.state.expirationMonthAndYear.length < 5 ||
      !this.state.expirationMonthAndYear.includes('/')
    ) {
      this.setState({message: 'Please enter correct card expiration.'});
      this.showAlert();
    } else {
      this.save();
      this._edit();
    }
  }
  _edit() {
  
    let url = config.settings.serverPath + '/api/updateMovieDetails';

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Booked: this.state.bookedString,
        Name: this.state.movieName,
        Date: this.state.date,
        Time: this.state.time,
        Location: this.state.location,
  
      }),
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(respondJson => {
        if (respondJson.affected > 0) {
          this.setState({showAlert: true});
          this.setState({
            message: 'Successfully Paid, press ok to go back home page',
          });
          this.setState({successfullyPay: true});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount(){
    this.getUserInfo();
  }
  save() {
    let url = config.settings.serverPath + '/api/insertToBooking';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_name: this.state.movieName,
        booking_Date: this.state.date,
        booking_Seats: this.state.seats,
        UserEmail: this.state.email,
        Location: this.state.location,
        bookingTime: this.state.time,
        Price: this.state.price,
        Poster: this.state.poster
      }),
    })
      .then(response => {
  
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }
  getUserInfo = async () => {
    try{
        let aUser = await AsyncStorage.getItem("email");
        this.setState({email : aUser});
    }catch(error){
        alert(error);
    }
};
  render() {
    return (
      <View style={styles.bigView}>
      <ScrollView >
      <View >
        <View >
          <InputWithLabel
            title={'Name on card'}
            onChangeText={x => this.setState({nameOnCard: x})}
            value={this.state.nameOnCard}
            placeholder="Card Owner Name"
            placeholderTextColor="gray"
          ></InputWithLabel>

          <InputWithLabel
            title={'Card Number'}
            onChangeText={x => this.setState({cardNumber: x})}
            value={this.state.cardNumber}
            placeholder="card Number"
            placeholderTextColor="gray"
            keyboardType="numeric"
            // minLength={10}
            maxLength={16}></InputWithLabel>

          <InputWithLabel
            title={'Cvv'}
            onChangeText={y => this.setState({cvv: y})}
            value={this.state.cvv}
            placeholder="123"
            placeholderTextColor="gray"
            keyboardType="numeric"
            maxLength={3}></InputWithLabel>

          <InputWithLabel
            title={'Card Expiration'}
            onChangeText={x => this.setState({expirationMonthAndYear: x})}
            value={this.state.expirationMonthAndYear}
            placeholder="xx/xx"
            placeholderTextColor="gray"
            // minLength={10}
            maxLength={5}></InputWithLabel>
        </View>

       
        
      </View>
      
      </ScrollView>
      <CustomizeButton
          TouchStyle={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 8,
            width: '100%',
            height: 50,
            backgroundColor: '#EE5407',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            bottom: 0,
          }}
          onPress={() => this.validate()}
          text={
            'Price:  RM' +
            this.state.price +
            '                                              Pay'
          }
          styles={{
            fontFamily: 'Roboto',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}></CustomizeButton>
     
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Message"
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
            if (this.state.successfullyPay === true) {
              this.props.navigation.navigate('HomeScreen');
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigView: {
    flex: 1,
    backgroundColor: 'black',
  },
});