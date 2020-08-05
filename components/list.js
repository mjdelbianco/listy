import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, View, Image } from 'react-native';

function List ({ navigation, item }) {

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MainScreen', {item})}>
          <View style={styles.listTitleView}>
            <Text style={styles.listTitle}>{item.name}</Text>
            <Image style={styles.icon} source={require('../assets/edit.png')}/>
          </View>

          <FlatList
          data={item.items}
          renderItem={({item}) => <Text style={[styles.itemName, {textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? 'grey' : 'black'}]}>{item.name}</Text>}
          keyExtractor={(item) => item.key}
          />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingBottom: 10,
    backgroundColor: '#ebe2cf',
    margin: 6,
    borderRadius: 5,
    width: 250,
    height: 400,
    shadowColor: '#ebe2cf',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
  },
  listTitleView: {
    marginHorizontal: 6,
    marginBottom: 4,
    borderBottomColor: '#ea6856',
    borderBottomWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingLeft: 15,
    margin: 4,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'serif',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemName: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#2d2c32',
    fontFamily: 'serif',
    fontWeight: '200'
  },
  icon: {
    alignSelf: 'flex-start',
    marginTop: 10,
    margin: 2,
    width: 15,
    height: 15,
    opacity: 0.5
}});

export default List;
