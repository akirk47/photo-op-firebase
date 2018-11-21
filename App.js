import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  Image,
  ScrollView
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from './Config/firebase';

import styles from './Components/Styles'

import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen';
import HomeScreen from './Components/Home';

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  // MealPlan: {
  //   screen: MealPlanScreen,
  // },
  // GroceryList: {
  //   screen: GroceryListScreen,
  // },
  // Meal: {
  //   screen: MealScreen,
  // },
  Home: {
    screen: HomeScreen,
  },
  // MyInfo: {
  //   screen:MyInfoScreen,
  // },
  // CameraAccess: {
  //   screen: CameraAccess,
  // },
  // HorizontalMealScroll: {
  //   screen: HorizontalMealScroll,
  // }
}, {initialRouteName: 'Login'});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });`
