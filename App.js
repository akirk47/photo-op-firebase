
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen';
import HomeScreen from './Components/Home';
import DataCollectionScreen from './Components/DataCollection';
import IndividualReportScreen from './Components/IndividualReport';


export default createStackNavigator({

  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  DataCollection: {
    screen:DataCollectionScreen,
  },
  IndividualReport: {
    screen:IndividualReportScreen,
  },
  
}, {initialRouteName: 'Login'});

