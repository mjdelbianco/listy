import React, {useState, useRef} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

function Scanner () {
  const [camera, setCamera] = useState(false)
  const cameraRef = useRef();
  const showCamera = () => {
    setCamera(!camera)
  }

  const barcodeFound = ({barcode}) => {
    barcode.forEach(barcode=>console.warn(barcode.data))
  }

  return (
      <View style={styles.container}>
        <Button title="SCANNER" onPress={()=>showCamera()}/>
          {camera && <RNCamera style={styles.camera} getRef={cameraRef} onBarCodeRead={()=> barcodeFound()}/>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default Scanner;
