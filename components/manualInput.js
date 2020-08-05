import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Image, View } from 'react-native';

function ManualInput ({inputManually, item}) {
  const [inputContent, setInputContent] = useState('');
  const name = item.name;

  return (
    <View style={styles.addArea}>
      <TouchableOpacity style={styles.iconContainer} onPress={()=>{
        if (inputContent) {
          inputManually(inputContent, name);
          setInputContent('');
          }}}>
        <Image source={require('../assets/plusIcon.png')} style={styles.addIcon}/>
      </TouchableOpacity>
      <TextInput style={styles.input} defaultValue={inputContent} onChangeText={setInputContent} onSubmitEditing={(event) => {
        const text = event.nativeEvent.text;
        if (text) {
          inputManually(text, name);
          setInputContent('');
          }
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  addArea: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 7,
    marginTop: 10,
  },
  iconContainer: {
    borderColor: 'gray',
    backgroundColor: '#ea6856',
    borderWidth: 2,
    borderRadius: 3,
    padding: 3,
    marginHorizontal: 3
  },
  addIcon: {
    margin: 1,
    width: 28,
    height: 28,
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
    fontSize: 20
  },
});

export default ManualInput;
