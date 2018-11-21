import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from 'react-native';
import styles from './Styles'
// import firebase from '../Config/firebase';

class Home extends React.Component {
  static navigationOptions ={
    title: 'Home'
  };

  constructor() {
    super();
    this.state ={
      email:'',
      password: '',
      errorMessage: ''
    }
  }





  render() {
    console.log(this.props.navigation.state.params.user);
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>You're Home Baby!!</Text>
      </View>

    )
  }
}

export default Home;
