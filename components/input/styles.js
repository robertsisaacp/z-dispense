import { StyleSheet } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    alignItems: 'center',
    flex: -1
  },
  buttons: {
    flexDirection: 'row',
  },
  tabs: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 4,
  },
  save: {
    marginVertical: 9,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  textBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
});

RkTheme.setType('RkTextInput', 'frame', {
  input: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  color: 'black',
  backgroundColor: 'white',
  container: {
    paddingHorizontal: 10
  }
});

RkTheme.setType('RkTabView', 'dark', {
  backgroundColor:'black',
  color:'white',
  borderColor:'black',
});

RkTheme.setType('RkTabView', 'darkSelected', {
  backgroundColor:'white',
  color:'black',
  borderColor:'black'
});

RkTheme.setType('RkButton', 'dark', {
  container: {
    backgroundColor: 'green',
  },
  content: {
  }
});