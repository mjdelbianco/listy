import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Button, SafeAreaView, Image, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import Scanner from './scanner';
import processBarcode from '../ApiService';
import ManualInput from './manualInput';
import Camera from './camera';
import Swipeout from 'react-native-swipeout'; //uninstall
import SwipeButton from 'rn-swipe-button'; //uninstall




function List ({shoppingLists, item, inputManually, barcodeFound, deleteItem, isCompleted}) {

  const [showListDetails, setShowListDetails] = useState(false)
  const [camera, setCamera] = useState(false);

  const showDetails = () => {
    setShowListDetails(!showListDetails);
  }

  const showCamera = () => {
    setCamera(!camera)
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={()=> showDetails()}>
          <Text style={styles.listTitle}>{item.name}</Text>
          <FlatList
          data={item.items}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.key}
          />
      </TouchableOpacity>

      {showDetails &&
        <View style={{backgroundColor:'#000000aa', margin: 0, flex:1}}>
          <Modal style={styles.detailContainer} transparent={true} isVisible={showListDetails}>

            <View>
              <Button title='go back' onPress={()=>showDetails()}/>
              <Text>LIST DETAIL MODAL</Text>
              <SafeAreaView style={styles.container}>

                <FlatList
                    data={item.items}
                    keyExtractor={({key})=> key}
                    renderItem={({item}) =>
                      <TouchableOpacity style={styles.itemContainer} onLongPress={()=> {Alert.alert('About to delete')}} onPressOut={() => {deleteItem(item.key)}}>
                        <View style={styles.itemView}>
                          <Text style={[styles.productName, {textDecorationLine: item.completed ? 'line-through' : 'none'}]} onPress={()=>{isCompleted(item.key)}} shoppingLists={shoppingLists}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                <ManualInput inputManually={inputManually}/>
                <Camera barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>
                <Scanner barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>

              </SafeAreaView>

            </View>
          </Modal>
        </View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: 'pink',
    margin: 6,
    borderRadius: 5,
    width: 200,
    height: 300
  },
  detailContainer: {
    backgroundColor: 'yellow',
    margin: 0
  },
  listTitle: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 30,
    color: 'black'
  },
  itemContainer: {
    height: 30,
    width: 100,
    padding: 10,
    borderRadius: 5,
  },
  modalList: {

  },
  itemContainer: {
    padding: 3
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  },
  productName: {
    fontSize: 20,
    color: 'black',
  },
  swipeContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.80,
    shadowRadius: 1.00,
    elevation: 2,//weird bachground of the items
  },
  deleteButton: {
    width: 30,
    height: 30,
    marginTop: 14,
    marginLeft: 15,

  }
});

export default List;
