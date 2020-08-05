import React, { useState } from 'react';
import { CheckBox, StyleSheet, View, FlatList, Text, SafeAreaView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Scanner from './scanner';
import ManualInput from './manualInput';
import MenuModal from './menuModal';
import Camera from './camera';


function MainScreen ({route, onShare, deleteList, navigation, inputManually, barcodeFound, deleteItem, isCompleted }) {

  const { item } = route.params
  const [camera, setCamera] = useState(false);
  const [menu, setMenu] = useState(false);
  const [image, setImage] = useState(false);

  const showCamera = () => {
    setCamera(!camera)
  }
  const showMenuModal = () => {
    setMenu(!menu)
  }
  const showImageModal = () => {
    setImage(!image)
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArea} onPress={()=>navigation.goBack()}>
          <Image source={require('../assets/backIcon.png')} style={styles.backIcon}/>
        </TouchableOpacity>

        <Text style={styles.listTitle}>{item.name}</Text>

        <TouchableOpacity style={styles.menu} onPress={()=>showMenuModal()}>
          <Image source={require('../assets/more.png')} style={styles.menuIcon}/>
        </TouchableOpacity>

      </View>

      <MenuModal item={item} navigation={navigation} onShare={onShare} deleteList={deleteList} menu={menu} showMenuModal={showMenuModal}/>

      <FlatList
        data={item.items}
        keyExtractor={({key})=> key}
        renderItem={({item}) =>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemView} onPress={()=>showImageModal()}>
            <CheckBox value={item.completed} onValueChange={()=>{isCompleted(item.key)}} style={{opacity: 0.5}}/>
            <Text style={[styles.productName, {textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? 'grey' : 'black'}]} onPress={()=>{isCompleted(item.key)}}>{item.name}</Text>
            <TouchableOpacity style={styles.deleteIconArea} onPress={() => {deleteItem(item.key)}}>
              <Image source={require('../assets/close.png')} style={styles.deleteIcon}/>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>}
      />

      <ManualInput item={item} inputManually={inputManually}/>
      <Camera item={item} barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>
      <Scanner barcodeFound={barcodeFound} showCamera={showCamera} camera={camera}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe2cf',
    borderRadius: 5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#ea6856',
    borderBottomWidth: 4,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 15,
    paddingBottom: 5,
    borderRadius: 5,

  },
  listTitle: {
    flex:1,
    fontSize: 34,
    color: 'black',
    fontFamily: 'serif',
    marginHorizontal: 10,
    flexWrap: 'wrap'
  },
  itemContainer: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 10,
    padding: 3,
    borderRadius: 5,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    height: 'auto',
    elevation: 2
  },
  productName: {
    paddingLeft: 4,
    fontSize: 18,
    color: 'black',
    fontFamily: 'serif',
    flexWrap: 'wrap',
    flex: 1,
  },
  backIcon: {
    margin: 2,
    width: 20,
    height: 20,
    opacity: 0.4
  },
  menu: {
    marginLeft: 'auto',
  },
  menuIcon: {
    marginLeft: 10,
    width: 25,
    height: 25,
    opacity: 0.7
  },
  deleteIconArea: {
    marginLeft: 'auto'
  },
  deleteIcon: {
    width: 15,
    height: 15,
    opacity: 0.1
  }
});

  export default MainScreen;


