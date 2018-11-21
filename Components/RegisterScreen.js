import React from 'react';
import firebase from '../Config/firebase';
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
import { createStackNavigator } from 'react-navigation';
import styles from './Styles'

class RegisterScreen extends React.Component {
  constructor() {
    super()
    this.state= {
      email:'',
      password:'',
      passwordRepeat:'',
      errorMessage:'',
      phoneNumber:'',
      username:'',
    }
  }
  static navigationOptions = {
    title: 'Register'
  };

  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('Home',{user})
      }
    })
  }

  register() {
    if(this.state.password.trim() == this.state.passwordRepeat.trim() && this.state.password.trim().length >5){
      firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
      .then((userData)=>{
        this.authListener();
      })
      .catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({errorMessage})
      });
    }
    else{
      if(this.state.password.trim().length < 6){
        this.setState({errorMessage: "Password has to be atleast 6 characters"})
      }
      else{
        this.setState({errorMessage: "Passwords don't match"})
      }
    }
    // firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
    // .then((userData)=>{
    //   this.authListener();
    // })
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   this.setState({errorMessage})
    // }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Register</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Enter your Email Address"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Create a Username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your Phone Number"
          onChangeText={(text) => this.setState({phoneNumber: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Confirm your password"
          onChangeText={(text) => this.setState({passwordRepeat: text})}
        />
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Register</Text>
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

export default RegisterScreen;
