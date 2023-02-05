import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Button, Alert} from 'react-native'
import * as FileSystem from 'expo-file-system';

export var GLOBALNAME = "";
export var GLOBALGROUPID = 0;

import colors from '../config/colors'

async function writeToFile(data) {
    try {
      const fileUri = './components/profile.txt';
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
    } catch (error) {
      console.error(error);
    }
}

async function readFile() {
    try {
      const fileUri = './components/profile.txt';
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      console.log(fileContents);
      GLOBALGROUPID = parseInt(fileContents);
    } catch (error) {
      console.error(error);
    }
  }

//write name with a string name and groupid number
function writeName(name, groupid) {
    writeToFile(groupid);
    console.log("writing");
    fetch('http://10.2.0.25:3000/roomies/name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({
            name: name,
            groupid: groupid
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    GLOBALNAME = name;
    GLOBALGROUPID = groupid;
}

export default function ProfileScreen({navigation}) {
    readFile();

    const [idName, setIDName] = React.useState(0);
    const [name, setName] = React.useState("");

    return(
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>ID:</Text>
            <TextInput
                value={idName}
                onChangeText={text => setIDName(text)}
                style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
            />
            <Text style={{ fontWeight: 'bold' }}>Name:</Text>
            <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
            />
            <Button onPress={() => writeName(name, idName)} title="Sync" style={styles.button}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button : {
        
    },
    container: {
        flex: 1,
        backgroundColor: colors.main_background,
    },
})