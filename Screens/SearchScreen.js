import React, { Component } from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  InputWithLabel,
  CustomizeButton,
} from '../Component/customInputAndcustomButton';

let config = require('../Config');

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      title: this.props.route.params.title,
      status: this.props.route.params.status,
      movie: null,
    };
    this._loadByID = this._loadByID.bind(this);
    this._loadByID2 = this._loadByID2.bind(this);
  }
  componentDidMount() {
    let status = this.state.status
    if(status == true){
      this._loadByID();
    }else if(status == false){
      this._loadByID2();
    }
    

  }



  _loadByID() {

    let url = config.settings.serverPath + '/api/movie/' + this.state.id;

    fetch(url)
      .then(response => {
        if (!response.ok) {
    
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(movie => {
        this.setState({ movie: movie });


      })
      .catch(error => {
        console.error(error);
      });
  }
  _loadByID2() {

    let url = config.settings.serverPath + '/api/upcoming/' + this.state.id;

    fetch(url)
      .then(response => {
        if (!response.ok) {

          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(movie => {
        this.setState({ movie: movie });


      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    let movie = this.state.movie;
    let status = this.state.status;
   
    if (movie && status == true) {
      return (
        <ScrollView style={{ backgroundColor: 'black' }}>
          <View style={styles.container}>
         
            <Text style={styles.title}>{movie.m_name}</Text>
            <View>
              <Image style={styles.image} source={{ uri: movie.m_poster }} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>Summary</Text>
            </View>
            <View>
              <Text style={styles.summaryDesc}>{movie.m_summary}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomizeButton
                onPress={() => { this.props.navigation.push('Ticketing', { title: movie.m_name, poster: movie.m_poster, price: movie.m_price}) }}
                TouchStyle={styles.button}

                text={"Book Now"}
                styles={styles.buttonText}
              >
              </CustomizeButton>
            </View>
          </View>
        </ScrollView>
      );
    }
    else if (movie && status != true){
  
      return (
        <ScrollView style={{ backgroundColor: 'black' }}>
          <View style={styles.container}>

            <Text style={styles.title}>{movie.m_name}</Text>
            <View>
              <Image style={styles.image} source={{ uri: movie.m_poster }} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>Summary</Text>
            </View>
            <View>
              <Text style={styles.summaryDesc}>{movie.m_summary}</Text>
            </View>
            <View style={styles.buttonContainer}>
            
            <Text style={styles.buttonText}>Coming Soon on {movie.m_releasedate}</Text>

            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: 'white'
  },
  image: {
    width: 450,
    height: 450,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  summaryTitle: {
    fontSize: 20,
    textAlign: 'left',
  },
  summaryDesc: {
    fontSize: 20,
    textAlign: 'justify',
    color: 'white',
    padding: 20,
  },
  button: {
    backgroundColor: '#EE5407',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
