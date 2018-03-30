import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';
//import api from '../../utils/api';

const BASE_URL = 'http://172.20.1.79:3000';

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      designType: '',
      zHeight: 0.0,
      isRunning: false,
    };
  }

  connect () {
    this.ws = new WebSocket(BASE_URL);

    this.ws.onopen = () => this.onConnectionOpen();
    //this.ws.onmessage = (event) => this.onConnectionMessage(event);
    //this.ws.onclose = () => this.onConnectionClose();
    this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));

    this.setState({
      isRunning: true
    });
    this.ws.send('test send');
  }

  render() {
    if(this.state.isRunning){
      //display information
    }
    return (
      <View style={styles.container}>
      
        <View style={styles.tabs}>
          <RkTabView rkType='dark'
            onTabChanged={(designType) => this.setState({designType})}>
            <RkTabView.Tab title={'Line'}>
              <Text>Line</Text>
            </RkTabView.Tab>
            <RkTabView.Tab title={'Circle'}>
              <Text>Circle</Text>
            </RkTabView.Tab>
            <RkTabView.Tab title={'Square'}>
              <Text>Square</Text>
            </RkTabView.Tab>
          </RkTabView> 
        </View>

        <RkTextInput rkType='frame' 
          label='Z Height:' 
          placeholder='0.0 mm'
          keyboardType='numeric'
          value={String(this.state.zHeight)}
          onChangeText={(zHeight) => this.setState({zHeight})}/>

        <RkButton 
          onPress={() => this.connect()}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;