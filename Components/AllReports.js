import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import ReportBox from "./ReportBox";



export default class AllReportsScreen extends React.Component {
  static navigationOptions = {
    title: 'All Reports',
  };

  constructor() {
    super();
    this.state ={
      reports: {},
      numOfReports: 0
    }
  }

  componentWillMount(){
    const { navigation } = this.props;
    const user= navigation.getParam('user', {});
    fetch(`https://radiant-lowlands-92209.herokuapp.com/sessions/${user.email}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({reports: responseJson.data, numOfReports: Object.keys(responseJson.data).length })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Button
                title="View Your Progress"
                color="#32CD32"
                onPress={() => this.props.navigation.navigate('ProgressReport',{ user: this.props.navigation.getParam('user', {})})}
          />
            <View style={styles.separator} />
          <View style={styles.space}>
            <Text style={styles.title}>Past Reports </Text>
            {Object.keys(this.state.reports).map( (time, index) =>
              <ReportBox 
                time={time}  
                sessionNum={this.state.numOfReports - index} 
                key={index} 
                user={this.props.navigation.getParam('user', {})}
                navigation={this.props.navigation}
                />
            )}           
          </View>  
        </ScrollView>
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
    marginBottom: 20
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    margin: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  space:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center', 
  },
});
