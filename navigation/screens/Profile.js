import * as React from 'react';
import {View, Text} from 'react-native'

export default function ProfileScreen({navigation}) {


    return(
        <View>
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