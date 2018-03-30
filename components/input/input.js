import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';
//import api from '../../utils/api';

const BASE_URL = 'http://172.20.1.79/api';

class Input extends React.Component {
  //typeMap : ['Line', 'Circle', 'Square']
  state = {
    designType: '',
    zHeight: 0.0,
    run: 0,
    text: '',
  }
  _onPressRun = (url, options = {}) => {
    const fetchOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    console.log( // eslint-disable-line
      `${fetchOptions.method} request \nto /${url}
${fetchOptions.body ? `with body: ${fetchOptions.body}` : ''}`);

    return fetch(`${BASE_URL}/${url}`, fetchOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  run(design, zHeight){
    return this._onPressRun('run/data', {method: 'POST', body: { design, zHeight }});
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