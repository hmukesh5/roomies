import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

import { useFonts } from 'expo-font';

function CreateEventOption({text, val, setter}) {
    const [loaded] = useFonts({
        'SignikaNegative-Medium': require('../assets/fonts/SignikaNegative-Medium.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.view}>
            <Text style={styles.text}>{text}</Text>
            <TextInput
                value={val}
                onChangeText={setter}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 18,
        fontFamily: "SignikaNegative-Medium",
    },
    text: {
        fontWeight: 'bold',
        fontFamily: "SignikaNegative-Medium",
        fontSize: 18
    },
    view: {
        marginBottom: 20
    },
})

export default CreateEventOption;