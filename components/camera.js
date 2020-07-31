import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

function Camera ({barcodeFound, camera, showCamera}) {

  return (
    camera && <RNCamera style={styles.camera} onBarCodeRead={(barcode)=> {barcodeFound(barcode); showCamera()}}
      />
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    flexGrow: 1,
    height: 'auto',
    zIndex: 2,
    alignSelf: 'stretch',
    bottom: 80
  }
});

export default Camera;
