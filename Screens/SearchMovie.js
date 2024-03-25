import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
let config = require('../Config');

const ItemSeparatorView = () => {
  return (
    <View style={{ height: 2, width: '100%', backgroundColor: 'white' }}>
    </View>
  )
}


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedData: [],
      originalData: [],
      searchText: "",
    };
    this._load = this._load.bind(this);

  }

  componentDidMount() {
    this._load();
  }


  _load() {
    let url = config.settings.serverPath + '/api/movies'
    fetch(url).then(response => {
      if (!response.ok) {
        Alert.alert('Error : ', response.status.toString());
        throw Error('Error : ', response.status.toString());
      }
      console.log(response);
      return response.json()
    }).then(movies => { this.setState({ searchedData: movies, originalData: movies }) }).catch(error => console.log(error));
  }
  search = (text) => {
    if (text) {
      const searchedArray = this.state.originalData.filter((item) => {
        const movie_Name_UpperCased = item.m_name ? item.m_name.toUpperCase() : ''.toUpperCase()
        const text_UpperCased = text.toUpperCase();
        return movie_Name_UpperCased.indexOf(text_UpperCased) > -1;
      })
      this.setState({ searchedData: searchedArray, searchText: text })
    }
    else {
      this.setState({ searchedData: this.state.originalData, searchText: text })
    }
  };

  render() {
    return (
        <View style={styles.container}>

          <TextInput style={styles.textInput} value={this.state.searchText} placeholder="Search" onChangeText={(text) => this.search(text)}></TextInput>
          <View style={{marginBottom:50}}>
          <FlatList 
            data={this.state.searchedData}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity style={styles.buttonStyle}
                  onPress={() => { this.props.navigation.push('Result', { id: item.m_id, title: item.m_name, status: true }) }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.m_poster }}
                    />
                    <View style={{ flexDirection: 'column', textAlign: 'left' }}>
                      <Text style={styles.cardtitle}>{item.m_name}</Text>
                      <Text style={styles.cardtitle}>Released : {item.m_releasedate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>}
            ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={(item, index) => index.toString()}
          />
          </View>
        </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  movieStyle: {
    padding: 22,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
  },
  buttonStyle:{
    paddingVertical: 5, 
    paddingHorizontal: 20,
    borderRadius: 42, 
  },
  cardtitle: {
    fontSize: 18,
    color: 'white',
    paddingLeft: 20,
  },
});