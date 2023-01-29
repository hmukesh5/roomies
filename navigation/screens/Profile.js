import * as React from 'react';
import {TouchableOpacity, View, Text} from 'react-native'

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


    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8EAED'}}>
            <Text
                onPress={() => writeName("hemmy", 1)}
                style={{fontSize: 26, fontWeight: 'bold'}}>
                Profile Screen
            </Text>
            
            <Text style={{fontSize:75}}>Welcome Adnan!</Text>
            <Text>Group ID: 7</Text>
            <Text>Group Members:</Text>
            <View >
              <Text >Hemanth</Text>
              <Text>Albert</Text>
              <Text>Payton</Text>
            </View>
        </View>
    )
}