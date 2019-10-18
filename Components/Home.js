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

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <Text style={styles.title}>
            Start Test
          </Text>
          <Button
            title="Press me"
            onPress={() => this.props.navigation.navigate('DataCollection',{
              user:this.props.user
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
            onPress={() => Alert.alert('Button with adjusted color pressed')}
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
