import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
//import GestureRecognizer from 'react-native-swipe-gestures';
import Swipeout from 'react-native-swipeout';

function Item ({item, isCompleted, onSwipeRight}) {

  const swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'pink',
    onPress: () => {onSwipeRight(item.name)},
    component: <Image source={require('../assets/delete-icon.png')} style={styles.deleteButton} />
  }]

  return (
    <Swipeout right={swipeBtns} autoClose='true' style={styles.swipeContainer}>
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemView}>
          <Text style={[styles.productName, {textDecorationLine: item.completed ? 'line-through' : 'none'}]} onPress={()=>{isCompleted(item.name)}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
   </Swipeout>
  );
}

const styles = StyleSheet.create({
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

export default Item;
