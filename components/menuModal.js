import React from 'react';
import { StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

function MenuModal ({navigation, item, menu, showMenuModal, deleteList, onShare}) {

  return (
    (menu &&
      <Modal style={{backgroundColor:'#000000aa', margin: 0, flex:1}} transparent={true} visible={true} onBackdropPress={()=>{showMenuModal()}
        }>

        <View style={styles.menu}>

          <TouchableOpacity style={styles.delete} onPress={()=>deleteList(item.name)} onPressOut={()=> navigation.goBack()} >
            <Image source={require('../assets/trash.png')} style={styles.icon}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.share} onPress={()=>{onShare(item.items)}}>
            <Image source={require('../assets/shareIcon.png')} style={styles.icon}/>
          </TouchableOpacity>

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

export default MenuModal;