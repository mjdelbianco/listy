import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Header ({title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    height: 60,
    padding: 15
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center'
  }
});

export default Header;