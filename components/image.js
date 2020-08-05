import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Modal from 'react-native-modal';

function ImageModal ({item, image, showImageModal}) {
console.log(item)
  return (
    (image &&
      <Modal style={{backgroundColor:'#000000aa', margin: 0, flex:1}} transparent={true} visible={true} onBackdropPress={()=>{showImageModal()}
        }>

        <View style={styles.menu}>
          <Image source={{uri: item.image}} style={styles.image}/>

        </View>

      </Modal>
    )
  )
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#f8f8f8',
    maxHeight: 150,
    marginHorizontal: 70,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  delete: {
    flex:1,
    borderBottomColor: '#ebe2cf',
    borderBottomWidth: 2,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  share: {
    flex:1,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    opacity: 0.7,
    margin: 2,
    width: 40,
    height: 40,
  },
});

export default ImageModal;