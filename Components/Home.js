import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render(){
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <Text style={styles.title}>
            Start Test
          </Text>
          <Button
            title="Press me"
            onPress={() => this.props.navigation.navigate('DataCollection',{
              user:this.props.navigation.getParam('user', {})
        })}
            color= '#008000'
          />
        </View>
          <View style={styles.separator} />
        <View style={styles.space}>
          <Text style={styles.title}>
            View Past Data
          </Text>
          <Button
            title="Press me"
            color="#f194ff"
            onPress={() =>  navigation.navigate('AllReports',{
              user: navigation.getParam('user', {})
            })}
          />
        </View>
  
      </SafeAreaView>
    );
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
    flex:1
  }
});
