import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Share,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import processBarcode from './ApiService';
import List from './components/list';
import MainScreen from './components/MainScreen';
import AddListModal from './components/addListModal';

export default function App() {
  const [title, setTitle] = useState('title');
  const [shoppingLists, setShoppingLists] = useState([]);

  const [addListModal, setAddListModal] = useState(false);
  const showModal = () => {
    setAddListModal(!addListModal);
  };

  useEffect(() => {
    console.log('inside use effect in app js');
    const setUpdateLists = async () => {
      const stringified = await JSON.stringify(shoppingLists);
      try {
        await AsyncStorage.setItem('newStorage', stringified);
      } catch (e) {
        console.log('Error message', e);
      }
    };
    setUpdateLists();
  }, [shoppingLists]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('newStorage');
        const data = await JSON.parse(jsonValue || []);
        setShoppingLists(data);
      } catch (e) {
        console.log('Error message', e);
      }
    };
    getLists();
  }, []);

  const addList = listName => {
    if (shoppingLists.some(list => list.name === listName)) {
      Alert.alert('A list with that title already exists');
    } else {
      setShoppingLists(shoppingLists => {
        return [{ key: uuidv4(), name: listName, items: [] }, ...shoppingLists];
      });
      ToastAndroid.showWithGravity(`${listName} created`, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  };

  const deleteList = listName => {
    setShoppingLists(shoppingLists => {
      return [...shoppingLists.filter(list => list.name !== listName)];
    });
    ToastAndroid.showWithGravity(
      `${listName} has been deleted`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const onShare = items => {
    items = `Items to buy: ${items.map(item => ' ' + item.name).toString()}`;
    Share.share({
      message: items.toString(),
    })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  const isCompleted = key => {
    setShoppingLists(prevList => {
      let listItems = [];
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i].items.some(i => i.key === key)) {
          listItems = prevList[i].items;
          let itemToUpdate = listItems.find(item => item.key === key);
          itemToUpdate.completed = !itemToUpdate.completed;
        }
      }
      return [...prevList];
    });
  };

  const deleteItem = key => {
    setShoppingLists(prevList => {
      let list;
      for (let i = 0; i < prevList.length; i++) {
        let listItems = [];
        if (prevList[i].items && prevList[i].items.some(i => i.key === key)) {
          list = prevList[i];
          listItems = list.items;
          const filteredListItems = listItems.filter(item => item.key !== key);
          prevList[i].items = [...filteredListItems];
        }
      }
      return [...prevList];
    });
  };

  const inputManually = (product, list) => {
    setTitle(oldTitle => oldTitle + 'a');
    setShoppingLists(prevList => {
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i].name === list) {
          let newItem = { key: uuidv4(), name: product, barcode_number: 0, completed: false };
          const updatedItems = [newItem, ...prevList[i].items];
          prevList[i].items = updatedItems;
        }
      }
      return [...prevList];
    });
  };

  const barcodeFound = (barcode, list) => {
    let toLookFor = barcode.data;
    processBarcode(toLookFor).then(parsed => {
      setShoppingLists(prevList => {
        for (let i = 0; i < prevList.length; i++) {
          if (
            prevList[i].name === list &&
            !prevList[i].items.some(item => item.barcode_number === toLookFor)
          ) {
            ToastAndroid.showWithGravity(
              `Added: ${parsed.products[0].product_name}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            const newBarcodeItem = {
              key: uuidv4(),
              name: parsed.products[0].product_name,
              barcode_number: parsed.products[0].barcode_number,
              completed: false,
            };
            const updatedBarcodeItems = [newBarcodeItem, ...prevList[i].items];
            prevList[i].items = updatedBarcodeItems;
            return [...prevList];
          } else {
            Alert.alert(`${parsed.products[0].product_name} already on the list`);
            return [...prevList];
          }
        }
      });
    });
  };

  function HomeScreen({ navigation }) {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground style={styles.backgroundImage} source={require('./assets/background.jpg')}>
          <View style={styles.mainMain}>
            <View style={styles.container}>
              <Text style={styles.text}> Listy </Text>
              <Text style={styles.textBuddy}> Your Shopping Buddy </Text>
              <TouchableOpacity style={styles.addArea} onPress={() => showModal()}>
                <Image source={require('./assets/plusIcon.png')} style={styles.addIcon} />
              </TouchableOpacity>
              <Text style={styles.addList}>Add list</Text>
              <AddListModal addList={addList} addListModal={addListModal} showModal={showModal} />
            </View>
            <View style={styles.lists}>
              <FlatList
                data={shoppingLists}
                keyExtractor={item => item.key}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <List
                    title={title}
                    navigation={navigation}
                    deleteItem={deleteItem}
                    isCompleted={isCompleted}
                    item={item}
                    onShare={onShare}
                    deleteList={deleteList}
                    shoppingLists={shoppingLists}
                    inputManually={inputManually}
                    barcodeFound={barcodeFound}
                  />
                )}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainScreen">
          {props => (
            <MainScreen
              title={title}
              onShare={onShare}
              deleteItem={deleteItem}
              isCompleted={isCompleted}
              shoppingLists={shoppingLists}
              deleteList={deleteList}
              inputManually={inputManually}
              barcodeFound={barcodeFound}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  mainMain: {
    backgroundColor: '#00000020',
    color: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginTop: 50,
    marginHorizontal: 50,
    borderRadius: 50,
    borderColor: '#b2afa8',
    borderWidth: 3,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    margin: 0,
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'cursive',
  },
  textBuddy: {
    fontFamily: 'serif',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 30,
    marginHorizontal: 40,
    color: 'black',
  },
  addArea: {
    elevation: 2,
    borderColor: 'gray',
    backgroundColor: '#89a6aa',
    borderWidth: 2,
    borderRadius: 3,
    padding: 3,
    marginHorizontal: 3,
  },
  addIcon: {
    margin: 2,
    width: 35,
    height: 35,
  },
  lists: {
    flex: 6,
    marginTop: 10,
    marginHorizontal: 15,
  },
  addList: {
    fontSize: 14,
    fontFamily: 'serif',
    opacity: 0.4,
  },
});
