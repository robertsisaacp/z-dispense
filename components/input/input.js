import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';
import api from '../../utils/api';

class Input extends React.Component {
  state = {
    designType: 0,
    zHeight: 0.0,
    run: 0,
  }
  _onPressRun() {
    api._callApi('172.20.1.79:3000', {method: 'POST', body: 'text'});
  }
  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.tabs}>
          <RkTabView rkType='dark'>
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
          label='Target:' 
          placeholder='Z-height in mm'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>

        <RkButton 
          onPress={() => this._onPressRun()}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;