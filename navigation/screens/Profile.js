import * as React from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native'


const NAME = { name: 'Hemanth' };

//write name with a string name and groupid number
function writeName(name, groupid) {
    console.log("pressing");
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
    .catch(error => console.error(error))
}

export default function ProfileScreen({navigation}) {


    const [idName, setIDName] = React.useState(0);
    const [name, setName] = React.useState("");

    return(
        <View>
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
        </View>
    )
}