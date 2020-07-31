import React, {useState} from 'react';
import { StyleSheet, TextInput, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ManualInput ({inputManually}) {
  const [input, setInput] = useState(false);
  const [inputContent, setInputContent] = useState('');

  const showInput = () => {
    setInput(!input)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addArea} onPress={()=>showInput()}>
          <Image source={require('../assets/plus.png')} style={styles.addIcon}/>
          {input && <TextInput style={styles.input} value={inputContent} onChangeText={setInputContent} onSubmitEditing={(event) => {
            const text = event.nativeEvent.text;
            if (text) {
              inputManually(text);
              setInputContent('');
              showInput();
              }
            }}/>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addArea: {
    zIndex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    margin: 10,
    marginTop: 3,
  },
  input: {
    height: 40,
    borderColor:'gray',
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 1,
    flexGrow: 2,
    borderRadius: 3,
    textDecorationLine: 'none',
    marginLeft: 12,
    fontSize: 20
  },
  addIcon: {
    margin: 2,
    width: 40,
    height: 40,
    padding: 17,
    marginRight: 12,
    marginLeft: 5,
  }
});

export default ManualInput;
