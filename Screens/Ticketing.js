import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {CustomizeButton} from '../Component/customInputAndcustomButton';
let config = require('../Config');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesWithAllLocation: [],
      movieWithOneLocationAndAllDate: [],
      selectedButtonLocation: null,
      selectedButton: null,
      selectedButtonTime: null,
      selectedButtonSeat: null,
      movies: [],
      selectedIndex: null,
      Time: [],
      selectedMovie: this.props.route.params.title,
      selectedTime: null,
      Seats: [],
      selected: [],
      booked: [],
      SeatsAndSelecteAndBooked: [],
      seatsString: null,
      selectedString: null,
      bookedString: '',
      bookedSeats: [],
      disabledBookButton: true,
      isFetching: true,
      newArray: [],
      price: this.props.route.params.price,
      poster: this.props.route.params.poster,
      NumOfSeats: 0
    };
    this.selectionOnPressLocation = this.selectionOnPressLocation.bind(this);
    this.selectionOnPress = this.selectionOnPress.bind(this);
    this.selectionOnPressTime = this.selectionOnPressTime.bind(this);
    this.selectionOnPressSeat = this.selectionOnPressSeat.bind(this);
    this._loadLocation = this._loadLocation.bind(this);
    this._loadDate = this._loadDate.bind(this);
    this._loadTime = this._loadTime.bind(this);
    this._loadBySeatsss = this._loadBySeatsss.bind(this);
    this.bookSeats = this.bookSeats.bind(this);
  }
  selectionHandler = ind => {
    var count = 0;
    const {SeatsAndSelecteAndBooked} = this.state;
    let arr = SeatsAndSelecteAndBooked.map((item, index) => {
      if (ind === index) {
        item.selected = !item.selected;
      }
      return {...item};
    });
    this.setState({SeatsAndSelecteAndBooked: arr});

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].selected === true) {
        this.setState({disabledBookButton: false});
        count = 1;
      }
    }
    if (count === 0) {
      this.setState({disabledBookButton: true});
    }
  };

  bookSeats = async arr => {
    await this.setState({bookedString: []});
    await this.setState({bookedSeats: []});
    await this.setState({NumOfSeats: 0});
    var bookedString = '';
    for (var i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        if (arr[i].selected === true) {
          bookedString += true + ',';
          this.setState({bookSeats: this.state.bookedSeats.push(arr[i].Seats)});
          this.setState({NumOfSeats: this.state.NumOfSeats+1})
        } else {
          bookedString += arr[i].booked + ',';
        }
      } else {
        if (arr[i].selected === true) {
          bookedString += true;
          this.setState({bookSeats: this.state.bookedSeats.push(arr[i].Seats)});
          this.setState({NumOfSeats: this.state.NumOfSeats+1})
        } else {
          bookedString += arr[i].booked;
        }
      }
    }

    this.setState({bookedString: bookedString});


  };

  _loadBySeatsss = () => {
    if(this.state.selectedButton===null||this.state.selectedButtonLocation===null||this.state.selectedButtonTime===null){
    }
    else{
      let url =
      config.settings.serverPath +
      '/api/app/' +
      this.state.selectedButtonLocation +
      '/' +
      this.state.selectedMovie +
      '/' +
      this.state.selectedButton +
      '/' +
      this.state.selectedButtonTime;

  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(member => {
        this.setState({Seats: member.Seats.split(',')});

        this.setState({
          selected: member.selected.split(',').map(j => JSON.parse(j)),
        });

        this.setState({
          booked: member.booked.split(',').map(j => JSON.parse(j)),
        });

        this.setBackToArrays();
        this.setAllSelectedValuesToUnselected();
      })
      .catch(error => {
        console.error(error);
      });
    }
    
  };

  _loadDate = () => {
    let url =
      config.settings.serverPath +
      '/api/app/' +
      this.state.selectedMovie +
      '/' +
      this.state.selectedButtonLocation;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(movie => {
        const newArray = [];
        movie.forEach(obj => {
          if (!newArray.some(o => o.Date === obj.Date)) {
            newArray.push({...obj});
          }
        });
        this.setState({movieWithOneLocationAndAllDate: newArray});
      })
      .catch(error => {
        console.error(error);
      });
    this.setBackToArrays();
    this.setAllSelectedValuesToUnselected();
  };
  _loadLocation = () => {
    let url =
      config.settings.serverPath + '/api/app/' + this.state.selectedMovie;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(movies => {
        const newArray = [];
        movies.forEach(obj => {
          if (!newArray.some(o => o.Location === obj.Location)) {
            newArray.push({...obj});
          }
        });
        this.setState({moviesWithAllLocation: newArray});
      })
      .catch(error => {
        console.error(error);
      });
    this.setBackToArrays();
    this.setAllSelectedValuesToUnselected();
  };

  _loadTime = () => {
    let url =
      config.settings.serverPath +
      '/api/app/' +
      this.state.selectedButtonLocation +
      '/' +
      this.state.selectedMovie +
      '/' +
      this.state.selectedButton;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(movie => {
        this.setState({movies: movie});
        console.log(this.state.movies);
      })
      .catch(error => {
        console.error(error);
      });
    this.setBackToArrays();
    this.setAllSelectedValuesToUnselected();
  };
  componentDidMount() {


    this._loadLocation();
  }

  // getSnapshotBeforeUpdate(pros, state) {
  //   if (
  //     (state.selectedButtonLocation != null ||this.state.selectedButtonLocation != state.selectedButtonLocation )&&
  //     (state.selectedButton != null || this.state.selectedButton != state.selectedButton)&& (state.selectedButtonTime != null || this.state.selectedButtonTime != state.selectedButtonTime)
  //   ) {
  //     if(this.state.selectedButton!=null&&this.state.selectedButtonLocation != state.selectedButtonLocation ){
  //       this._loadLocation();
  //     }
  //     else{
  //       this._loadBySeatsss();
  //     }
   
  //   }

  //   return null;
  // }
  componentDidUpdate() {}
  setBackToArrays = () => {
    var arr = [];
    for (var i = 0; i < this.state.Seats.length; i++) {
      arr.push({
        Seats: this.state.Seats[i],
        selected: this.state.selected[i],
        booked: this.state.booked[i],
      });
    }
    this.setState({SeatsAndSelecteAndBooked: arr});
  };
  setAllSelectedValuesToUnselected = () => {
    let arr = this.state.SeatsAndSelecteAndBooked.map(item => {
      item.selected = false;

      return {...item};
    });
    this.setState({SeatsAndSelecteAndBooked: arr});
  };

  selectionOnPressLocation = (userType, ind) => {
    this.setState({selectedButtonLocation: userType});

    this.setState({disabledBookButton: true});
  };
  selectionOnPress = (userType, ind) => {
    this.setState({selectedButton: userType});
    this.setState({selectedIndex: ind});

    this.setState({disabledBookButton: true});
  };
  selectionOnPressTime = (userType, ind) => {
    this.setState({selectedButtonTime: userType});
    this.setState({selectedTime: ind});
    this.setState({disabledBookButton: true});
  };
  selectionOnPressSeat = userType => {
    this.setState({selectedButtonSeat: userType});
  };

  render() {
    return (
      <View style={styles.bigView}>
        
        <ScrollView style={{flex: 1}}>
          <View>
            <View>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: this.state.poster,
                  }}></Image>
                 
                <ScrollView>
                <View><Text style={{color: 'red',fontSize:20, fontFamily: 'Roboto',fontWeight: 'bold'}}>
             Location:
            </Text></View>
                  <FlatList
                    horizontal={true}
                    data={this.state.moviesWithAllLocation}
                    style={{marginBottom: 10, backgroundColor: '#4C4E52'}}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <CustomizeButton
                        onPress={async () => {
                          await this.selectionOnPressLocation(
                            item.Location,
                            item.Id,
                          );
                          this._loadDate();
                          this._loadBySeatsss();
                        }}
                        text={item.Location}
                        styles={{
                          color:
                            this.state.selectedButtonLocation === item.Location
                              ? 'red'
                              : 'white',
                          fontSize: 30,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          // margin: 20,
                          marginLeft: 10,
                          marginRight: 20,
                        }}></CustomizeButton>
                    )}
                  />
                </ScrollView>
                <View><Text style={{color: 'red',fontSize:20,fontFamily:'Roboto', fontWeight: 'bold'}}>
            Date (DD/MM):
            </Text></View>
                <FlatList
                  horizontal={true}
                  data={this.state.movieWithOneLocationAndAllDate}
                  style={{marginBottom: 10, backgroundColor: '#4C4E52'}}
                  // extraData={this.state}
                  showsVerticalScrollIndicator={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <CustomizeButton
                      onPress={async () => {
                        await this.selectionOnPress(item.Date, item.Id);
                        this._loadTime();
                        this._loadBySeatsss();
                      }}
                      text={item.Date.replace(/\s/g,"").replace("-","/")}
                      styles={{
                        color:
                          this.state.selectedButton === item.Date
                            ? 'red'
                            : 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginLeft: 10,
                        marginRight: 20,
                      }}></CustomizeButton>
                  )}
                />
<View><Text style={{color: 'red',fontSize:20, fontFamily: 'Roboto',fontWeight: 'bold'}}>
           Time:
            </Text></View>
                <FlatList
                  horizontal={true}
                  data={this.state.movies}
                  extraData={this.state}
                  style={{marginBottom: 20, backgroundColor: '#4C4E52'}}
                  showsVerticalScrollIndicator={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <CustomizeButton
                      onPress={async () => {
                        await this.selectionOnPressTime(item.Time, item.Id);
                        this._loadBySeatsss();
                      }}
                      text={item.Time}
                      styles={{
                        color:
                          this.state.selectedButtonTime === item.Time
                            ? 'red'
                            : 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginLeft: 10,
                        marginRight: 20,
                      }}>
                      {' '}
                    </CustomizeButton>
                  )}
                />
              </View>
              <View>
              <View><Text style={{color: 'red',fontSize:20, fontFamily: 'Roboto',fontWeight: 'bold'}}>
           Seats:
            </Text></View>
                <View>
                  <View style={styles.imageRow}>
                    {this.state.SeatsAndSelecteAndBooked.map((item, index) => {
                      if (item.booked === false) {
                        return (
                          <TouchableOpacity
                            key={item.Seats}
                            onPress={() => this.selectionHandler(index)}
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 25,
                              borderRadius: 42,
                              backgroundColor: item.selected ? 'red' : 'white',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text>{item.Seats}</Text>
                          </TouchableOpacity>
                        );
                      } else {
                        return (
                          <TouchableOpacity
                            key={item.Seats}
                            disabled={true}
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 25,
                              borderRadius: 42,
                              backgroundColor: 'gray',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text>{item.Seats}</Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>
                </View>
              </View>
              <View></View>
              <View></View>
            </View>

            <Text style={{color: 'red', marginBottom: 100,marginTop:10}}>
              *Seats=Gray: booked, White: unselected, Red: Selected
            </Text>
          </View>
        </ScrollView>
        <CustomizeButton
          TouchStyle={{
  
            padding: 10,
            borderRadius: 8,
            width: '100%',
            height: 50,
            backgroundColor: '#EE5407',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
          }}
          onPress={async () => {
            await this.bookSeats(this.state.SeatsAndSelecteAndBooked);
            await this.props.navigation.navigate('PaymentScreen', {
              movieName: this.state.selectedMovie,
              date: this.state.selectedButton,
              seats: this.state.bookedSeats.toString(),
              location: this.state.selectedButtonLocation,
              time: this.state.selectedButtonTime,
              price: this.state.price*this.state.NumOfSeats,
              bookedString: this.state.bookedString,
              poster: this.state.poster,
            });
          }}
          disabled={this.state.disabledBookButton}
          text={'Book'}
          styles={{
            fontFamily: 'Roboto',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}></CustomizeButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigView: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    marginTop: 0,
    flex: 1,
    alignSelf: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  container2: {
    marginTop: 5,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  container3: {
    marginTop: 100,
    marginBottom: 100,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  image: {
    marginBottom: 10,
    width: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 300,
  },
  scroll: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    backrgoundColor: 'blue',
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
});
