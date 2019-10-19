import React from 'react';
import {
  StyleSheet,
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


export default class ProgressReportScreen extends React.Component {
   static navigationOptions = {
      title: 'Progress Report',
    };

  constructor() {
    super();
    this.state ={
      emgData: 0,
      goniMin: 0,
      goniMax: 0
    }
  }

//   componentWillMount(){
//     const { navigation } = this.props;
//     const user= navigation.getParam('user', {});
//     fetch(`https://radiant-lowlands-92209.herokuapp.com/sessions/${user.email}`)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       Object.keys(responseJson.data).map((time) =>{
//         if(time === navigation.getParam('time', "")){
//           const report = responseJson.data[time];
//           this.setState({emgData: report.emg, goniMin: report.goniometer.min, goniMax: report.goniometer.max});
//         }
//       })
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }
  

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.space}>
              <Text style={styles.title}>
                Goniometer 
              </Text>
              <LineChart
                data={data}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
              />
            </View>
          <View style={styles.space}>
           <Text style={styles.title}>Emg </Text>
            <View style={styles.marginTop}>    
              <LineChart
                data={data}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
              />
              <View style={styles.marginTop}>
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
    margin: 20,
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
    margin: 15,
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