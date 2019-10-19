import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  ScrollView
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import Constants from 'expo-constants';
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;


export default class IndividualReportScreen extends React.Component {

  constructor() {
    super();
    this.state ={
      emgData: 0,
      goniMin: 0,
      goniMax: 0
    }
  }

  componentWillMount(){
    const { navigation } = this.props;
    const user= navigation.getParam('user', {});
    fetch(`https://radiant-lowlands-92209.herokuapp.com/sessions/${user.email}`)
    .then((response) => response.json())
    .then((responseJson) => {
      Object.keys(responseJson.data).map((time) =>{
        if(time === navigation.getParam('time', "")){
          const report = responseJson.data[time];
          this.setState({emgData: report.emg, goniMin: report.goniometer.min, goniMax: report.goniometer.max});
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  

  render() {
    const { navigation } = this.props;
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <View >
              <Text style={styles.title}>
                {navigation.getParam('time', "").slice(0,25)}
              </Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.space}>
              <Text style={styles.title}>
                Goniometer 
              </Text>
              <View style={styles.horizontal}>
                <View style={styles.marginSpace}>
                  <Text style={styles.dataText}> Flexion: </Text>
                  <Text style={styles.dataText}> {this.state.goniMin} </Text>
                </View>
                <View style={styles.marginSpace}>
                  <Text style={styles.dataText}> Extension: </Text>
                  <Text style={styles.dataText}> {this.state.goniMax} </Text>
                </View>
              </View>
            </View>
              <View style={styles.separator} />
          <View style={styles.space}>
           <Text style={styles.title}>Emg </Text>
            <View style={styles.marginTop}>    
              <Text style={styles.dataText}> Max voltage: {this.state.emgData} volts</Text>
              <LineChart
                data={data}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
              />
              <View style={styles.marginTop}>
              <Button                 
                  title="View Past Reports"
                  color="#FF0000"
                  onPress={() => navigation.navigate('AllReports',{
                    user: navigation.getParam('user', {})
                  })}
                />
              </View>             
            </View>            
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
  },
  marginSpace: {
    margin: 50
  },
  marginTop: {
    marginTop: 30
  },
  dataText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 18,
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
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  horizontal:{
    flexDirection: 'row',

  },
  instructionText: {
    fontSize: 12,
  },
});

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ],
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2 // optional
  }]
}

const chartConfig = {
  backgroundGradientFrom: '#000000',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#000000',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage:0.5
}