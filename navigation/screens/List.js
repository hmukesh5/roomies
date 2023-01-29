import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import Task from './components/To-Dos';

export default function ListScreen({navigation}) {
    const [task, setTask] = useState(''); //how to create a state, first arg is name of state, second arg is 
    const [taskItems, setTaskItems] = useState([]);
    

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }


    return(
        <View style={styles.container}>

        {/* Shopping List */} 
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Shopping List</Text>
                
                <View style={{marginTop: 30, justifyContent: 'center'}}>
                    {/*Where shopping items will go */}
                    {taskItems.length === 0 ? 
                        <Text style={{textAlign:'center', justifyContent: 'center', fontSize:'75', opacity: '0.1'}}>No Items</Text> 
                        : taskItems.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => completeTask(index)}>
                                    <Task text={item} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        {/* Writing a shopping item */}
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}>
            <TextInput style={styles.input} placeholder={'Write a task...'} value={task} onChangeText={text => setTask(text)} />

            <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText} >+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 40, 
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    writeTaskWrapper: {
        flex: 1,
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 2,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 2,
    },
    addText: {
        position: 'absolute',
        paddingBottom: 4,
        paddingLeft: 1,
        fontSize: 50,
        color: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
});