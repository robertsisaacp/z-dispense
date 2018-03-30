import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';
//import api from '../../utils/api';

const BASE_URL = 'http://172.20.1.79/api/run';

class Input extends React.Component {
  //typeMap : ['Line', 'Circle', 'Square']
  state = {
    designType: '',
    zHeight: 0.0,
    running: false,
    text: '',
  }

  function _onPressRun() {
    this.setState({ running: true });
    fetch(BASE_URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zHeight: this.state.zHeight,
        design: this.state.designType,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        return response.RASPI;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
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
          onPress={() => this.run(this.state.designType, this.state.zHeight)}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;