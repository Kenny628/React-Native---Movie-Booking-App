import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import openMap from 'react-native-open-maps';
let config = require('../Config');

export default class AboutUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
    }
    this._load = this._load.bind(this);
    this.contentBeforeFlatList=this.contentBeforeFlatList.bind(this);
    this.contentAfterFlatList=this.contentAfterFlatList.bind(this);
  }

  _load() {
    let url = config.settings.serverPath + '/api/loc'
    fetch(url).then(response => {
      if (!response.ok) {
    
        throw Error('Error : ', response.status.toString());
      }
      console.log(response);
      return response.json()
    }).then(location => this.setState({ location: location })).catch(error => console.log(error));
  }

  componentDidMount() {
    this._load();
  }

  contentBeforeFlatList(){

      return( <View>
        <View style={{ backgroundColor: 'black' }}>
     
            <Image style={{ position: 'absolute', width: '100%', height: 200 }} source={{ uri: 'https://getwallpapers.com/wallpaper/full/f/1/b/375459.jpg' }} />
            <Text style={styles.title}> About Us</Text>
          </View>
            <View style={styles.textcontainer}>
              <Text style={styles.textStyle}>Since first opening our doors in 2005, we have entertained countless moviegoers with memories of a special day out.</Text>
              <Text style={styles.textStyle}>From the latest blockbusters to intimate dramas, with a dash of documentaries, sports and culture also in the mix, UtarDaBest's diverse range of entertainment means there's something for everyone.</Text>
              <Text style={styles.textStyle}>Pamper yourself in the trappings of Malaysia's premier luxury cinema, UtarDaBest Indulge, or lounge in the blissful comfort of our Beanieplex halls. Why not bring your kids for some Family Friendly fun, or treat your eyes to the astonishing clarity of the world's largest cinema LED screen, Samsung ONYX. To top it all off, dive into the most immersive movie experience on Earth - IMAX®. The choice is yours!</Text>
              <Text style={styles.textStyle}>We also take pride in the flavour-rich quality of our food and beverages, offering the best popcorn in town as well as an exciting variety of choices for patrons at any of our 38 locations nationwide. We count ourselves lucky and feel immensely proud to have played a small part in big moments; from the first time that kids see their superheroes come to life on the big screen, to the innocent beauty of a first date.</Text>
              <Text style={styles.textStyle}>At UtarDaBest, it is not just about movies - it is a total entertainment experience.</Text>
            </View>
            </View>
      );
    }
contentAfterFlatList(){
return(<View style={styles.outerContainer}>
  <View style={styles.innerrow}>
    <Ionicons name='logo-instagram' color='white' size={40}></Ionicons>
    <Text style={styles.linkname}> https://www.instagram.com/UtarDaBest </Text>
  </View>
  <View style={styles.innerrow}>
    <Ionicons name='logo-facebook' color='white' size={40}></Ionicons>
    <Text style={styles.linkname}> https://www.facebook.com/UtarDaBest </Text>
  </View>
</View>
)


}
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:"black"}}>
    <FlatList
      data={this.state.location}
      renderItem={({ item }) =>
      <View>
        <TouchableOpacity style={{paddingLeft: 20}}
          onPress={() => { openMap({latitude: parseFloat(item.loc_lat), longitude: parseFloat(item.loc_long),}) }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name='location-outline' color='blue' size={30}></Ionicons>
          <View style={{ flexDirection: 'column'}}>
          <Text style= {styles.textStyle}>{item.loc_name}</Text>
          <Text style={styles.textStyle}>Buisness Hours: {item.loc_b_hrs}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>}
    keyExtractor={(item, index) => index.toString()}
    ListHeaderComponent={this.contentBeforeFlatList()}
    ListFooterComponent={this.contentAfterFlatList()}
    >
    </FlatList>

    
</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textcontainer: {
    alignContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    paddingLeft: 20,
    marginTop: 150,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
  },

  linkname: {
    color: 'white',
    textAlign: 'left',
    paddingTop: 10,
  },
  innerrow: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  outerContainer: {
    flexDirection: 'column',
    padding: 20,
  }
});