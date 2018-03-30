import React from 'react';
import { RkAvoidKeyboard,} from 'react-native-ui-kitten';
import { scaleModerate, scaleVertical} from './assets/Scale';
import Input from './components/input/input';
import { Image, 
  Keyboard,
  StyleSheet,
  Dimensions } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    image = (<Image style={[styles.image, {height, width}]}
      source={require('./assets/splash.png')}/>);
    return image;
  }
  render() {
    let image = this._renderImage();
    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}

        <Input />

      </RkAvoidKeyboard>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000', 
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    flex: -1
  },
});