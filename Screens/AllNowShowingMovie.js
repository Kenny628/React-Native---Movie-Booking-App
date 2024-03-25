import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList,Image } from "react-native";
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
      data: [],
   
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
        throw Error('Error : ', response.status.toString());
      }
      console.log(response);
      return response.json()
    }).then(movies => { this.setState({data: movies }) }).catch(error => console.log(error));
  }


  render() {
    return (
        <View style={styles.container}>

          <View>
          <FlatList 
            data={this.state.data}
            renderItem={({ item }) =>
              <View>
               
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.m_poster }}
                    />
                    <View style={{ flexDirection: 'column', textAlign: 'left' }}>
                      <Text style={styles.cardtitle}>{item.m_name}</Text>
                      <Text style={styles.cardtitle}>Price: RM {item.m_price} per ticket</Text>
                    </View>
                  </View>

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