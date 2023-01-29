import * as React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';



export default function EventsScreen({navigation}) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [eventName, setEventName] = React.useState('');
    const [eventDate, setEventDate] = React.useState('');
    const [eventTime, setEventTime] = React.useState('');
    const [eventDescription, setEventDescription] = React.useState('');
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    
    const deleteEvent = (index) => {
        setEvents(events.filter((event, i) => i !== index));
    };
    

    const submitEvent = () => {
        if(selectedEvent !== null){
          // if existing event, idk if this shit finna work
          const updatedEvents = [...events];
          updatedEvents[selectedEvent] = {
            eventName,
            eventDate,
            eventTime,
            eventDescription
          }
          setEvents(updatedEvents);
          setSelectedEvent(null);
        } else {
          // change vars to
          setEvents([
              ...events,
              {
                  eventName,
                  eventDate,
                  eventTime,
                  eventDescription
              }
          ]);
        }
        setModalVisible(false);
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventDescription('');
    };

    const editEvent = (index) => {
        setModalVisible(true);
        setEventName(events[index].eventName);
        setEventDate(events[index].eventDate);
        setEventTime(events[index].eventTime);
        setEventDescription(events[index].eventDescription);
        setSelectedEvent(index);
      };



    return(
        //watch videos on modal idk whats going on
<View style={styles.container}>
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
      <View style={{ alignSelf: 'flex-start', padding: 20, width: '90%', borderRadius: 10,marginTop: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Create Event</Text>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Event Name</Text>
          <TextInput
            value={eventName}
            onChangeText={text => setEventName(text)}
            style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Date</Text>
          <TextInput
            value={eventDate}
            onChangeText={text => setEventDate(text)}
            style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Time</Text>
          <TextInput
            value={eventTime}
            onChangeText={text => setEventTime(text)}
            style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Description</Text>
          <TextInput
            value={eventDescription}
            onChangeText={text => setEventDescription(text)}
            style={{ borderBottomWidth: 1, padding: 5, fontSize: 18 }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#3f963b', padding: 10, borderRadius: 5, width: '45%'}} onPress={submitEvent}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#ab2626', padding: 10, borderRadius: 5, width: '45%'}} onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  <Text style={styles.sectionTitle}>Events</Text>
                <View style={{marginTop: 30, justifyContent: 'center'}}>
                {events.length === 0 ? <Text style={{textAlign:'center',justifyContent:'center',fontSize:'75',opacity:'0.1'}}>No Events</Text> : 
        <ScrollView>
            
                {events.map((event, index) => (
  <View key={index} style={{backgroundColor: '#FFFFFF', padding: 10, margin: 10,borderRadius: 10}}>
    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{event.eventName}</Text>
    <Text>{event.eventDate} at {event.eventTime}</Text>
    <Text>{event.eventDescription}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity style={{ backgroundColor: '#3f963b', padding: 10, borderRadius: 5, width: '25%'}} onPress={() => editEvent(index)}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#ab2626', padding: 10, borderRadius: 5, width: '25%'}} onPress={() => deleteEvent(index)}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
))}
</ScrollView>
} 
</View>


            <TouchableOpacity
                style={styles.addWrapper}
                onPress={() => {setModalVisible(true)}}
            >
                    <Text style={styles.addText} >+</Text>
            </TouchableOpacity>
        </View>
    )
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
      paddingTop: 40,
      paddingHorizontal: 20,
      fontSize: 24,
      fontWeight: 'bold',
      justifyContent: 'center'
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
        position: 'absolute',
        bottom: 60,
        right: 26,
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
})