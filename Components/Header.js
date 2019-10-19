import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {Text, View} from 'react-native';
// import {LinearGradient} from 'expo';

export default class HeaderCustomized extends React.Component {

  constructor() {
    super();
    this.state ={
    }
  }

  render() {
    return(

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
                <Button onPress={() => {this.props.setModalVisible(true);}} transparent>
                  <Icon name='add' />
                </Button>
              </Right>
          </Header>


    )
  }
}
