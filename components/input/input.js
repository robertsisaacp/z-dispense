import React from 'react';
import { RkButton,
  RkTabView,
  RkTextInput } from 'react-native-ui-kitten';

import { View, Text } from 'react-native';
import styles from './styles';

// change this to the local IP of target Pi
const PI_ADDR = "http://172.20.1.79:3000"; 

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      prec: 1,
      type: 0,
      height: 2,
    };
  }
  sendParamsToPi() {
    fetch(PI_ADDR + '/params?prec=' + this.state.prec
      + '&type=' + this.state.type 
      + '&height=' + this.state.height)
  }

  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.tabs}>
          <RkTabView rkType='dark'
            onTabChanged={(type) => this.setState({type})}>
            <RkTabView.Tab title={0}>
              <Text>Line</Text>
            </RkTabView.Tab>
            <RkTabView.Tab title={1}>
              <Text>Circle</Text>
            </RkTabView.Tab>
            <RkTabView.Tab title={3}>
              <Text>Square</Text>
            </RkTabView.Tab>
          </RkTabView> 
        </View>

        <RkTextInput rkType='frame' 
          label='Z Height:' 
          placeholder='0.0 mm'
          keyboardType='numeric'
          value={String(this.state.height)}
          onChangeText={(height) => this.setState({height})}/>

        <RkTextInput rkType='frame' 
                  label='Precision' 
                  placeholder='0.0 mm'
                  keyboardType='numeric'
                  value={String(this.state.prec)}
                  onChangeText={(prec) => this.setState({prec})}/>

        <RkButton 
          onPress={() => this.sendParamsToPi()}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;