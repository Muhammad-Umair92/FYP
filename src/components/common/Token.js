import React from 'react';
import { View, Text } from 'react-native';

const Token = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style = {styles.textStyle}>{props.children}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    // backgroundColor: '#fff',
    // backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  textStyle: {
    color: 'red',
    fontSize: 25,
    fontWeight: '600',

  }
};

export { Token };
