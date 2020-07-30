import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import Scanner from './components/scanner';

export default function App() {
  const [items, setItems] = useState([{id: 1, name: 'broccoli'}, {id: 2, name: 'apple'}])

  return (
    <View style={styles.container}>
      <Header className="no" title="Shopping List"/>
      <StatusBar style="auto" />
      <Scanner/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  },
});
