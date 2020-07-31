import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Scanner ({showCamera}) {

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.scan} onPress={()=>showCamera()}>
          <Image source={require('../assets/scan.png')} style={styles.barcodeIcon}/>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'rgb(31,207,193)',
    marginBottom: 7,
  },
  barcodeIcon: {
    margin: 5,
    width: 70,
    height: 50,
    opacity: 0.8,
  }
});

export default Scanner;
