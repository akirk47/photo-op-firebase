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
import firebase from '../Config/firebase';

class LoginScreen extends React.Component {
  static navigationOptions ={
    title: 'Login'
  };

  constructor() {
    super();
    this.state ={
      email:'',
      password: '',
      errorMessage: ''
    }
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('Home',{user})
      }
    })
  }

  press() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).
    then((userData)=>{
      this.authListener();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      this.setState({errorMessage})
    }.bind(this));
}

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>

        <Text style={styles.textBig}>Login to PhotoOp!</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Enter your username"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
        {this.state.errorMessage ?
        (<Text style={{color: 'red'}}>{this.state.errorMessage}</Text>)
          :
        (<Text></Text>)
        }
      </View>

    )
  }
}

export default LoginScreen;
