import React from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class App extends React.Component {
  state = {
    data: null,
    city: 'London',
    city_display: '',
    temp: '',
    icon: '',
    description: '',
    main: '',
    humidity: '',
    pressure: '',
    temp_min: '',
    temp_max: '',
    textTemp: '',
  };

  fetchWeatherData = async () => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=251c1e76f41ac65da54de30eabdd7178`;
    var req = await fetch(url);
    var responseJson = await req.json();
    this.setState({
      city_display: responseJson.name + ' , ' + responseJson.sys.country,
      data: responseJson,
      temp: responseJson.main.temp + '°C',
      icon: responseJson.weather[0].icon,
      description: 'Description : ' + responseJson.weather[0].description,
      main: 'Status - ' + responseJson.weather[0].main,
      temp_min: 'min: ' + responseJson.main.temp_min + '°C',
      temp_max: 'max: ' + responseJson.main.temp_max + '°C',
      textTemp: 'Temperature :-',
    });
  };

  componentDidMount() {
    alert('Please write The city Name to get the results');
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://i.pinimg.com/564x/25/7d/df/257ddf9575c61ebca115d0946c22f56b.jpg',
        }}
        style={{
          flex: 1,
          backgroundColor: 'dodgerblue',
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.searchBoxView}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            onChangeText={(text) => {
              this.setState({ city: text });
            }}
            style={styles.searchBox}
          />
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              this.fetchWeatherData();
            }}>
            <Icon name="search1" size={25} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.weatherBox}>
          <View style={styles.weatherHolderView}>
            <Image
              source={{
                uri:
                  'http://openweathermap.org/img/wn/' +
                  this.state.icon +
                  '@2x.png',
              }}
              style={{ height: '80%', width: '50%' }}
            />
            <View>
              <Text style={styles.font}>{this.state.temp}</Text>
              <Text style={{ fontSize: 22, color: 'black' }}>
                {this.state.city_display}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.informationBox}>
          <View style={styles.informationBoxHolder}>
            <Text style={styles.mainText}>{this.state.main}</Text>
            <Text style={styles.descText}>{this.state.description}</Text>
            <Text style={styles.tempText}>{this.state.textTemp}</Text>
            <Text style={styles.maxminText}>{this.state.temp_min}</Text>
            <Text style={styles.maxminText}>{this.state.temp_max}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  searchBoxView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: 'white',
    width: '75%',
    color: '#fff',
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 35,
    outline: 'none',
    fontSize: 20,
  },
  weatherBox: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  weatherHolderView: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
  },
  font: {
    color: 'black',
    fontSize: 24,
    fontWeight: '800',
  },
  informationBox: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationBoxHolder: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  mainText: {
    fontSize: 24,
    color: '#464646',
    marginLeft: '8%',
    marginTop: '8%',
    fontWeight: 'bold',
  },
  descText: {
    fontSize: 20,
    color: 'black',
    marginLeft: '8%',
    marginTop: '2.5%',
    textTransform: 'capitalize',
  },
  tempText: {
    color: 'black',
    // fontWeight: '800',
    fontSize: 23,
    marginLeft: '8%',
    marginTop: '3%',
  },
  maxminText: {
    marginLeft: 40,
    fontSize: 20,
  },
});

// This design is inspired by the youtube channel Belgin Android
// creator Swayam sai kar
// The Weather App
// The api is used from Open weather map.org
