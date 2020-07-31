import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Header from './header';
import Scanner from './scanner';
import List from './list';
import processBarcode from '../ApiService';
import ManualInput from './manualInput';
import Camera from './camera';

export default function MainScreen() {
  const [items, setItems] = useState([
    {key: uuidv4(), name: "lettuce", barcode_number: 1234, completed: false},
    {key: uuidv4(), name: "mustard", barcode_number: 3456, completed: false},
    {key: uuidv4(), name: "apple", barcode_number: 54455, completed: false},
    {key: uuidv4(), name: "banana", barcode_number: 45455, completed: false}]);
  const [camera, setCamera] = useState(false);

  const showCamera = () => {
    setCamera(!camera)
  }

  const isCompleted = (name) => {
    setItems(items => {
      const toChange = items.find(item => item.name === name);
      toChange.completed = toChange.completed ? false : true;
      return [...items];
    });
  }

  const onSwipeRight = (name) => {
    setItems(items => items.filter(item => item.name !== name));
    return [...items]
  }

  const barcodeFound = (barcode) => {
    let toLookFor = barcode.data;
    if (!items.some(item => item.barcode_number === toLookFor)) {
      setItems(items=> {
        Alert.alert('Added: blabla')
        return [{key: uuidv4(), name: 'whatever', barcode_number: toLookFor, completed: false},...items]

        });
        console.log(items, 'ITEEEMS SET')
    } else {
      Alert.alert('Already on the list')
      }
        // processBarcode(barcode.data)
        // .then(parsed => {
        //   setItems(items => {
        //     Alert.alert(`Added: ${parsed.products[0].product_name}`);
        //     return [...items, {key: uuidv4(), name: parsed.products[0].product_name, barcode_number: parsed.products[0].barcode_number, completed: false}]
        //   });
        // })

      console.log(items, 'ITEEEEEMs ALREADY EXISTS')

    }

  const inputManually = (value) => {
    if (items.some(item => item.name === value)) {
      Alert.alert('Already on the list')
    } else {
      setItems(items => {
        return [{key: uuidv4(), name: value, barcode_number: 0, completed: false},...items]
      })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
          backgroundColor = 'rgb(31,207,193)'
          barStyle = "dark-content"
          hidden = {false}
          translucent = {true}
        />
      <Header title="Shopping List"/>
      <List items={items} isCompleted={isCompleted} onSwipeRight={onSwipeRight}/>
      <ManualInput inputManually={inputManually}/>
      <Camera barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>
      <Scanner barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    justifyContent: 'center',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  productName: {
    fontSize: 16,
    color: 'black',
  },
});
