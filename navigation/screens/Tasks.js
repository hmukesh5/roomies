import * as React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

import colors from '../config/colors'

export default function TaskScreen({navigation}) {
    return(
        <View style={styles.container}>
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
        backgroundColor: colors.main_background,
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