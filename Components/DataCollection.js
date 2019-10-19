import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import Constants from 'expo-constants';


export default class CollectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Run Test',
  };

  constructor() {
    super();
    this.state ={
      emgMax: 69,
      goniMin: 24,
      goniMax: 56,
      goniData: 20,
      buttonDisabled: false,
    }
  }

  endTest(){
    const time = (new Date()).toString();
    this.setState({buttonDisabled: true})
    const { navigation } = this.props;
    const user= navigation.getParam('user', {});
    fetch('https://radiant-lowlands-92209.herokuapp.com/addSession', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        time,
        emg: this.state.emgMax,
        min: this.state.goniMin,
        max: this.state.goniMax,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      navigation.navigate('IndividualReport',{
        user: navigation.getParam('user', {}),
        time
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <Text style={styles.title}>
            Instructions
          </Text>
          <Text > "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "</Text>
        </View>
          <View style={styles.separator} />
        <View style={styles.space}>
          <Text style={styles.title}>
            Goniometer: 
          </Text>
          <Text style={styles.title}>{this.state.goniData} degrees</Text>
        </View>
          <View style={styles.separator} />
       <View style={styles.space}>
         <Text style={styles.title}>
            Emg: 
          </Text>
          <Text style={styles.title}> {this.state.emgMax} volts</Text>
        </View>
        <Button
            title="End Test"
            color="#FF0000"
            onPress={() => this.endTest()}
            disabled={this.state.buttonDisabled}
          />  
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  space:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 12,
  },
});
