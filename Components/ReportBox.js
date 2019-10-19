import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;


export default class ReportBox extends React.Component {

goToReport(){
    this.props.navigation.navigate('IndividualReport',{
        user: this.props.user,
        time :this.props.time
      })
}

render() {
    return(
        <TouchableOpacity style={styles.reportBox} onPress={ ()=> this.goToReport()}>
            <Text style={styles.sessionText}> Session {this.props.sessionNum}:  {this.props.time.slice(0,25)} </Text>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  sessionText: {
    fontSize: 18,
    textAlign: 'center'
  },
  reportBox:{
    borderColor: '#000000',
    borderWidth: 1,
    alignSelf: 'center',
    height: 40,
    justifyContent: 'center',
    width: screenWidth - 1
  }
});
