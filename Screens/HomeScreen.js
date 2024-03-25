import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Image,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
let config = require('../Config');

function MovieSection({ title, data, navigation, status }) {
    const keyExtractor = (item, index) => item.m_id;
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => { navigation('Result', { id: item.m_id, title: item.m_name , status: status}) }}
            style={styles.cardOuterContainer}
        >
            <Image
                style={styles.cardImage}
                source={{ uri: item.m_poster }}

            />
            <View style={styles.cardInnerContainer}>
                <Text style={styles.cardtitle}>{item.m_name}</Text>
            </View>
        </TouchableOpacity>

    );

    return (
        <View style={styles.sectioncontainer}>
            <Text style={styles.sectiontitle}>{title}</Text>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 70 }}
                    keyExtractor={keyExtractor}
                    data={data}
                    horizontal
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}
export default class HomeScreen extends Component {
    /**
     * A screen component can set navigation options such as the title.
     */
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            upcomingmovies: [],
        };
        this._load = this._load.bind(this);

    }


    _load() {
        let url = config.settings.serverPath + '/api/movies'
        fetch(url).then(response => {
            if (!response.ok) {
                Alert.alert('Error : ', response.status.toString());
                throw Error('Error : ', response.status.toString());
            }
            return response.json()
        }).then(movies => this.setState({ movies: movies })).catch(error => console.log(error));

        let url2 = config.settings.serverPath + '/api/upcoming'
        fetch(url2).then(response => {
            if (!response.ok) {
                Alert.alert('Error : ', response.status.toString());
                throw Error('Error : ', response.status.toString());
            }
            return response.json()
        }).then(movies => this.setState({ upcomingmovies: movies })).catch(error => console.log(error));

    }

    componentDidMount() {
        this._load();
    }


    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                        <TouchableOpacity style= {{position: 'absolute', top: 22, right: 30}} onPress={() => { this.props.navigation.navigate('Search') }}>
                        <Ionicons name='search-outline' color='white' size={30}></Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity style= {{position: 'absolute', top: 20, left: 10}} onPress={() => { this.props.navigation.openDrawer()}}>
                            <Ionicons name='reorder-three-outline' color='white' size={40}></Ionicons>
                        </TouchableOpacity>
                        <View style = {{flexDirection: 'row', marginTop: 60}}>
                        <Image style= {styles.logoImage} source={require('../img/logo.png')}/>
                        <Text style={styles.logoText}> UtarDaBest </Text>
                        </View>
                    <Text style={styles.title}>Welcome To UtarDaBest Movie Booking Application</Text>
                    <ScrollView style={styles.moviescroll}>
                        <MovieSection data={this.state.movies} title="Now Showing" navigation={this.props.navigation.navigate} status = {true}>
                        </MovieSection>
                    {console.log(this.state.upcomingmovies)}
                    </ScrollView>
                    <ScrollView style={styles.moviescroll}>
                        <MovieSection navigation={this.props.navigation.navigate} data={this.state.upcomingmovies} title="Upcoming Movies" status = {false}>
                        </MovieSection>

                    </ScrollView>
                </View >
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    sectioncontainer: {
        width: "100%",
        padding: 10,
    },
    moviescroll: {
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage:{
        height: 100,
        width: 100,
        padding: 20,
        resizeMode: 'center',
        alignContent: 'center',
    },

    logoText:{
        fontSize: 30,
        textAlign: 'left',
        color: 'white',
        fontFamily: 'serif',
        paddingTop: 30,
        paddingLeft: 10,
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        color: 'white',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',

    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    inputContainer: {
        width: '80%'
    },
    sliderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    cardImage: {
        width: 200,
        height: 250,
    },
    cardInnerContainer: {
        padding: 5,
    },
    cardtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    sectiontitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: 'white',
    },
    cardOuterContainer: {
        position: "relative",
        width: 200,
        height: 250,
        backgroundColor: "gray",
        marginRight: 10,
    },
});