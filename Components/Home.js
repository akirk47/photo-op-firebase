import React, { Component } from 'react';
import { CameraRoll, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Text, TouchableHighlight, View, Alert, Dimensions, TextInput } from 'react-native';
import Constants from 'expo-constants';
import moment from 'moment';
import { StackActions, NavigationActions } from 'react-navigation';
import {Header, Left, Body, Right, Button, Icon, Title , Container, Content, Card, CardItem, Thumbnail}  from 'native-base';
// import HeaderCustomized from './Header';
import AlbumCard from './AlbumCard';
// import CreatePhotoAlbum from './CreatePhotoAlbum';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class Home extends React.Component {
  static navigationOptions ={
    title: 'Home',
    header: null
  };

  constructor() {
    super();
    this.state ={
      email:'',
      password: '',
      errorMessage: '',
      modalVisible: false,
      photos: [],
      index: null,
      dates: []
    }
  }

  componentWillMount(){
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        var dates = [];
        r.edges.forEach( photo =>{
          // console.log("milli", photo.node.timestamp);
          var d = moment.unix(Number(photo.node.timestamp)).format(); // The 0 there is the key, which sets the date to the epoch
          dates.push(d);
        })

        this.setState({ photos: r.edges, dates });
        console.log("here");

      })
      .catch((err) => {
         //Error Loading Images
      });
  }

  press(){
    this.props.navigation.navigate('PhotoAlbum',{
          user:this.props.user
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
}

  render() {

    return(
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
            </Left>
            <Body>
              <Title>Gallery</Title>
            </Body>
            <Right>
              <Button onPress={() => {this.setModalVisible(true)}} transparent>
                <Icon name='add' />
              </Button>
            </Right>
        </Header>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.modalVisible}
          >
          <View style={styles.modalView}>
            <View style={{
                alignItems:'flex-start',

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: 50, height: 50}} />
              <Text style={{paddingTop: 10, fontFamily:'Courier', fontSize:18}}>Create New Album</Text>
              <Icon name="close-circle"
              onPress={ () => {this.setModalVisible(false)}}
              style={{paddingRight:3}}
              />

            </View>
            <View style={styles.textView}>
              <TextInput placeholder="Name" style={styles.textBox}/>
            </View>
            <View style={styles.textView2}>
              <TextInput placeholder="Invite Users" style={styles.textBox}/>
            </View>
            <View style={styles.buttonView}>
              <Button light><Text style={{padding:5}}> Create </Text></Button>
            </View>
          </View>
        </Modal>
        <ScrollView>
           {this.state.photos.map((p, i) => {
           return (
              <TouchableOpacity
              onPress={ () =>{ this.press()}}
              key={i}
              >
                <AlbumCard key={i} user={this.props.user} uri={p.node.image.uri} date={this.state.dates[i]} />
              </TouchableOpacity>
           );
         })}

      </ScrollView>






      </Container>

    )
  }
}
const styles = StyleSheet.create({
  modalView: {
   backgroundColor: '#d8e7ff',
   width: windowWidth*0.8,
   height: windowHeight*0.7,
   alignSelf: 'center',
   top: windowHeight*0.15,
   borderRadius: windowHeight*0.03,
   borderColor: 'black',
   borderTopWidth: 2,
   borderBottomWidth: 2,
   borderLeftWidth: 2,
   borderRightWidth: 2,


 },
 textBox:{
    borderColor:'black',
    backgroundColor:'white',
    width:200,
    height: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
    paddingLeft:5

 },
 textView: {
   alignItems:'center',
   paddingTop:10
 },
 textView2: {
   alignItems:'center',
   paddingTop:30
 },
 buttonView: {
   alignItems:'center',
   justifyContent:'center',
   paddingTop:30,
   paddingLeft:115

 }

});


export default Home;
