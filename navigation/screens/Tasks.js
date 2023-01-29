import * as React from 'react';
import {View, Text, SafeAreaView, TextInput, StyleSheet} from 'react-native'

export default function TaskScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Enter Task Name:</Text>
            <TextInput style={styles.input}/>
            <Text
                onPress={() => navigation.navigate('Profile')}
                style={{fontSize: 26, fontWeight: 'bold'}}>
                Tasks Screen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input : {
        borderWidth: 2,
        borderColor: '#C0C0C0',
        borderRadius: 60,
        padding: 8,
        margin: 10,
        width: 200,
    }
})