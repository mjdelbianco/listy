import React, {useState} from 'react';
import { StyleSheet, Button, View, Text, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';


// list = {name: {key: uuidv4(), name: "lettuce", barcode_number: 1234, completed: false}}

// [{key: uuid, name: name, item: [{},{},{}]}, {shop list 2}]
export default function App() {
  const [input, setInput] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [shoppingLists, setShoppingLists] = useState([]);

  const addList = (listName) => {
    if (shoppingLists.some(list => list.name === listName)) {
      Alert.alert('A list with that title already exists')
    } else {
      setShoppingLists( shoppingLists => {
        return [{key: uuidv4(), name: listName},...shoppingLists]
      });
      Alert.alert('List created');
      console.log(shoppingLists)
    }
  }

  const showInput = () => {
    setInput(!input)
  }

  function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create your shopping lists</Text>
        <TouchableOpacity style={styles.addArea} onPress={()=>showInput()}>
          <Image source={require('./assets/plus.png')} style={styles.addIcon}/>
          {input && <TextInput style={styles.input} value={inputContent} onChangeText={setInputContent} onSubmitEditing={(event) => {
            const text = event.nativeEvent.text;
            if (text) {
              addList(text);
              setInputContent('');
              showInput();
              }
            }}/>}
      </TouchableOpacity>
        <Button
        title="Go to Main"
        onPress={() => navigation.navigate('MainScreen')}
      />
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    text: {
      fontSize: 40,
      textAlign: "center",
      margin: 10,
      padding:10
    },
    addArea: {
      zIndex: 1,
      flexDirection: 'row-reverse',
      alignItems: 'center',
      margin: 10,
      marginTop: 3,
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
    }
  });
