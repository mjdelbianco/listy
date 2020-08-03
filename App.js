import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import List from './components/list';
import _ from 'lodash'; //uninstall

export default function App() {

  const [inputList, setInputList] = useState('');
  const [shoppingLists, setShoppingLists] = useState([
    {key: uuidv4(), name: 'List1',
    items: [
      {key: uuidv4(), name: 'item 1', barcode_number: 1, completed: false},
      {key: uuidv4(), name: 'item 11', barcode_number: 11, completed: false},{key: uuidv4(), name: 'item 111', barcode_number: 111, completed: false}]},
    {key: uuidv4(), name: 'List2',
      items: [
        {key: uuidv4(), name: 'item 2', barcode_number: 2, completed: false},
        {key: uuidv4(), name: 'item 22', barcode_number: 22, completed: false},{key: uuidv4(), name: 'item 222', barcode_number: 222, completed: false}]}]);

  const [addListModal, setAddListModal] = useState(false);

  useEffect( () => {
    const setUpdateLists = async () => {
      const stringified = await JSON.stringify(shoppingLists);
    try {
      await AsyncStorage.setItem('storageLists', stringified);
    } catch (e) {
      console.log('Error message', e)
        }}
        setUpdateLists()
  }, [shoppingLists])

  useEffect( () => {
    const getLists = async () => {
      try {
      const jsonValue = await AsyncStorage.getItem('storageLists');
      const data = await JSON.parse(jsonValue || []);
      setShoppingLists(data);
    } catch (e) {
      console.log('Error message', e)
    }
    }
    getLists();
  }, [])

  const addList = (listName) => {
    if (shoppingLists.some(list => list.name === listName)) {
      Alert.alert('A list with that title already exists')
    } else {
      setShoppingLists( shoppingLists => {
        return [{key: uuidv4(), name: listName, items: []},...shoppingLists]
      });
      Alert.alert('List created');
      console.log(shoppingLists)
    }
  }

  const isCompleted = (key) => {
    setShoppingLists(prevList => {
      let list = []
      for (let i=0; i<prevList.length; i++) {
        let listItems = []
        if (prevList[i].items && prevList[i].items.some(i => i.key===key)) {
          list = prevList[i]
          listItems = list.items
          let itemToUpdate = listItems.find(item => item.key === key);
          itemToUpdate.completed = !itemToUpdate.completed
          listItems = [...listItems, {...itemToUpdate}]
          let listOne = [...list.items, ...listItems]
          list = {...list,...listOne}
        }
      }
      return [...shoppingLists] //NOT WORKING
    })
  }

  const deleteItem = (key) => {
    setShoppingLists(prevList => {
      let list = []
      for (let i=0; i<prevList.length; i++) {
        let listItems = []
        if (prevList[i].items && prevList[i].items.some(i => i.key===key)) {
          list = prevList[i]
          listItems = list.items
          const filteredListItems = listItems.filter(item => item.key !==key)
          listItems = filteredListItems
          list  = {...list, items:[...listItems] }
        }
      }
      return [...shoppingLists] //NOT WORKING
    })
  }

//FIXXX NEED HELP
  const inputManually = (value) => {
    setShoppingLists(prevList => {
      let list = []
      for (let i=0; i<prevList.length; i++) {
        let listItems = []
        if (prevList[i].items) {

          let newItem = {key: uuidv4(), name: value, barcode_number: 0, completed: false}
          list = prevList[i]
          listItems = list.items.push(newItem)
          listItems = [...listItems, {...newItem}]
          console.log(listItems, 'list it')
          let listOne = [...list.items, ...listItems]
          list = {...list,...listOne}
        }
      }
      return [...shoppingLists]
    })
  }

  const barcodeFound = (barcode) => {
    let toLookFor = barcode.data;
    if (!items.some(item => item.barcode_number === toLookFor)) {
      setItems(items=> {
        Alert.alert('Added: blabla')
        return [{key: uuidv4(), name: 'whatever', barcode_number: toLookFor, completed: false},...items]
        });
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

    }

  const showModal = () => {
    setAddListModal(!addListModal)
  }

  function HomeScreen({navigation}) {
    return (

      <View style={styles.container}>

        <View style={styles.container}>
          <Text style={styles.text}>Create your shopping lists</Text>
          <TouchableOpacity style={styles.addArea} onPress={()=>showModal()}>
            <Image source={require('./assets/plus.png')} style={styles.addIcon}/>

            {addListModal ?
              <Modal style={{backgroundColor:'#000000aa', margin: 0, flex:1}} transparent={true} visible={true} onBackdropPress={()=>showModal()}>
                  <View style={styles.addListModal}>
                    <Text>Add new list title</Text>
                    <TextInput style={styles.input} placeholder='Insert list name...' value={inputList} onChangeText={setInputList} onSubmitEditing={(event) => {
                      const text = event.nativeEvent.text;
                      if (text) {
                      addList(text);
                      setInputList('');
                      showModal();
                      }
                    }}/>
                  </View>
              </Modal>
            : <Text style={styles.addList}>Add list</Text>}

          </TouchableOpacity>
        </View>

        <View style={styles.lists}>
          <FlatList data={shoppingLists} keyExtractor={item => item.key} horizontal={true} showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <List deleteItem={deleteItem} isCompleted={isCompleted} item={item} shoppingLists={shoppingLists} inputManually={inputManually} barcodeFound={barcodeFound}/>}
          />
        </View>

      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 15
    },
    text: {
      fontSize: 40,
      textAlign: 'center',
      margin: 10,
      padding:10
    },
    addArea: {
      zIndex: 1,
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    addIcon: {
      margin: 2,
      width: 40,
      height: 40,
      padding: 17,
    },
    input: {
      zIndex: 2,
      height: 40,
      borderColor:'gray',
      borderWidth: 2,
      paddingHorizontal: 5,
      paddingVertical: 1,
      borderRadius: 3,
      textDecorationLine: 'none',
      fontSize: 20,
      width:200
    },
    lists: {
      flex: 1,
      width: 300,
      height: 300
    },
    addList: {
      fontSize: 20,
      opacity: 0.4,
      marginRight: 10
    },
    addListModal: {
      backgroundColor: 'lightblue',
      marginVertical: 200,
      marginHorizontal: 50,
      padding: 30,
      borderRadius: 5,
      flex: 1,
    }
  });
