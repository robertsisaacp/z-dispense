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
      designType: 0,
      precision: 1,
      zHeight: 2,
    };
  }
  sendParamsToPi() {
    fetch(PI_ADDR + '/params?_prec=' + this.state.precision
      + '&_type=' + this.state.designType 
      + '&_height=' + this.state.zHeight)

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

        <RkTextInput rkType='frame' 
                  label='Precision' 
                  placeholder='0.0 mm'
                  keyboardType='numeric'
                  value={String(this.state.precision)}
                  onChangeText={(precision) => this.setState({precision})}/>

        <RkButton 
          onPress={() => this.sendParamsToPi()}
          rkType='dark'>Run
        </RkButton>

      </View>
    );
  }
}
export default Input;