import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Item from './item';

function List ({items, isCompleted, onSwipeRight}) {
  return (
      <View style={styles.container}>
        <Text style={styles.listTitle}>My list</Text>
        <FlatList
          data={items}
          renderItem={({item})=> <Item item={item} isCompleted={isCompleted} onSwipeRight={onSwipeRight} />}
          keyExtractor={item => item.key}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    zIndex: 1,
    flexGrow: 2,
    marginTop: 7,
    paddingBottom: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  listTitle: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 30,
    color: 'black'
}});

export default List;
