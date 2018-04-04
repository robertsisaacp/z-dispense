import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      designType: '',
      zHeight: 0.0,
      isRunning: false,
      open: false,
      connected: false
    };
    this.ws = new WebSocket('ws://172.20.1.79:8080');

    this.ws.onopen = () => {
      this.setState({connected: true});
    };
    this.test = this.test.bind(this);
  }
  test () {
    console.log('circle, 50.0');
    this.ws.send("it worked!");
    if (this.state.connected) {
      this.ws.send("it worked!");
    }
  }
  connect () {

    //this.ws.onmessage = (event) => this.onConnectionMessage(event);
    //this.ws.onclose = () => this.onConnectionClose();
    this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));

    this.setState({
      isRunning: true
    });
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
          onPress={() => this.test()}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;