import React, {useState, Fragment} from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen'
import { TextInput } from 'react-native-gesture-handler';

export default function App() {
  const [user, setUser] = useState('');
  const [showUserInput, setShowUserInput] = useState('true')
  const [userContent, setUserContent] = useState('')

  const showInput = () => {
    setShowUserInput(!showUserInput)
  }

  function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome <Text style={styles.text} onPress={showInput}>{user}</Text></Text>
        <TextInput value={userContent} onChange={setUserContent} onSubmitEditing={(event) => {
          const text = event.nativeEvent.text;
          console.log(text)
          if (text) {
            setUser(text);
            }
          }}
        placeholder='Enter your name'/>
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
      fontSize: 20,
      textAlign: "center",
      margin: 10
    }
  });
