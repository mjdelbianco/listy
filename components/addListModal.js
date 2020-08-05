import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

function AddListModal ({addListModal, showModal, addList}) {
  const [inputList, setInputList] = useState('');

  return (
    (addListModal &&
      <Modal style={{backgroundColor:'#000000aa', margin: 0, flex:1}} transparent={true} visible={true} onBackdropPress={()=>{showModal()}
        }>

        <View style={styles.addListModal}>
          <Text style={styles.title}>Create Shopping List</Text>
          <TextInput style={styles.input} autoFocus={true} placeholder='Insert list name...' defaultValue={inputList} onChangeText={setInputList} onSubmitEditing={(event) => {
        const text = event.nativeEvent.text;
        if (text) {
              addList(inputList);
              setInputList('');
              showModal();
            } else {
              Alert.alert('The field is required')
            }
        }}/>
          <TouchableOpacity style={styles.create} onPress={() => {
            if (inputList) {
              addList(inputList);
              setInputList('');
              showModal();
            } else {
              Alert.alert('The field is required')
            }
          }}>
            <Text style={styles.createText}> CREATE </Text>
          </TouchableOpacity>
        </View>

      </Modal>
    )
  )
}

const styles = StyleSheet.create({
  addListModal: {
    backgroundColor: 'white',
    maxHeight: 300,
    marginHorizontal: 30,
    padding: 5,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30
  },
  input: {
    height: 40,
    borderColor:'transparent',
    borderBottomWidth: 4,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
    borderBottomColor: '#ea6856',
    textDecorationLine: 'none',
    fontSize: 18,
    width:240,
    marginBottom: 30
  },
  create: {
    backgroundColor: '#37897c',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 3,
  },
  createText: {
    fontSize: 16,
    color: 'white',
  }
});

export default AddListModal;