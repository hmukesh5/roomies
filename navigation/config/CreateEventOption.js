import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

function CreateEventOption({text, val, setter}) {
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
        fontSize: 18
    },
    text: {
        fontWeight: 'bold'
    },
    view: {
        marginBottom: 20
    },
})

export default CreateEventOption;