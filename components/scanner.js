import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

function Scanner ({showCamera}) {

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>showCamera()}>
          <Image source={require('../assets/scan.png')} style={styles.barcodeIcon}/>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ea6856',
    marginBottom: 5,
    borderRadius: 3,
    elevation: 5
  },
  barcodeIcon: {
    margin: 3,
    width: 70,
    height: 50,
    opacity: 0.8,
  }
});

export default Scanner;
