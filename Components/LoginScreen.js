import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './Styles'
import { StackActions, NavigationActions } from 'react-navigation';
import {firebaseAuth} from '../Config/firebase';
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;

class LoginScreen extends React.Component {
  static navigationOptions ={
    title: 'Login',
    header: null
  };

  constructor() {
    super();
    this.state ={
      email:'',
      password: '',
      errorMessage: '',
      jsonMessage:''
    }
  }
  authListener(){
    firebaseAuth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user, 'login')
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home', params: {user}})],
        });
        this.props.navigation.dispatch(resetAction);
      }
    })
  }

  login() {
    firebaseAuth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
    .then(()=>{
      this.authListener();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      this.setState({errorMessage})
    }.bind(this));
}

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Optima ROM</Text>
        <TextInput
          style={{height: 40, width: screenWidth}}
          textAlign={'center'}
          placeholder="Enter your email"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{height: 40, width: screenWidth}}
          textAlign={'center'}
          placeholder="Enter your password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity onPress={ () => {this.login()} } style={[styles.button, styles.buttonGreen]}>
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
        {this.state.jsonMessage ?
        (<Text style={{color: 'red'}}>{this.state.jsonMessage}</Text>)
          :
        (<Text></Text>)
        }
      </View>

    )
  }
}

export default LoginScreen;
