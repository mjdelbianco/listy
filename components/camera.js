import React from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

function Camera ({barcodeFound, camera, showCamera, item}) {

  return (
    (camera && <RNCamera style={styles.camera} onBarCodeRead={(barcode)=> {barcodeFound(barcode, item.name); showCamera()}}>
        <BarcodeMask />
      </RNCamera>)
  );
}

const styles = StyleSheet.create({
  camera: {
    flex:1,
    zIndex: 3,
    alignSelf: 'stretch',
    bottom: 100
  }
});

export default Camera;
