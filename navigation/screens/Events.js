import * as React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CreateEventOption from '../config/CreateEventOption';
import colors from '../config/colors'

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
      <View style={styles.container}>
        <Modal style={{height: '50%'}} animationType="slide" transparent={false} visible={modalVisible}>
          <View style={styles.createEventContainer}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventInfoTitle}>Create Event</Text>
              
              <CreateEventOption text={"Event Name"} val={eventName} setter={text => setEventName(text)}/>
              <CreateEventOption text={"Date"} val={eventDate} setter={text => setEventDate(text)}/>
              <CreateEventOption text={"Time"} val={eventTime} setter={text => setEventTime(text)}/>
              <CreateEventOption text={"Description"} val={eventDescription} setter={text => setEventDescription(text)}/>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity style={[{ backgroundColor: '#3f963b'}, styles.createEventButtons]} onPress={submitEvent}>
                  <Text style={styles.eventOptionsText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: '#ab2626'}, styles.createEventButtons]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.eventOptionsText}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <Text style={styles.sectionTitle}>Events</Text>
        <View style={{marginTop: 30, justifyContent: 'center'}}>
          {events.length === 0 ? 
            <Text style={styles.noEvent}>No Events</Text> : 
            
            <ScrollView style={styles.scroll}>
              {events.map((event, index) => (
                <View key={index} style={styles.eventItem}>

                  <Text style={styles.eventTitle}>{event.eventName.length === 0 ? "No Name" : event.eventName}</Text>
                  <Text>{event.eventDate} at {event.eventTime}</Text>
                  <Text>{event.eventDescription.length === 0 ? "No Description" : event.eventDescription}</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={[{backgroundColor: '#3f963b'}, styles.eventOptions]} onPress={() => editEvent(index)}>
                      <Text style={styles.eventOptionsText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: '#ab2626'}, styles.eventOptions]} onPress={() => deleteEvent(index)}>
                      <Text style={styles.eventOptionsText}>Delete</Text>
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
  addText: {
    position: 'absolute',
    paddingBottom: 4,
    paddingLeft: 1,
    fontSize: 50,
    color: 'grey',
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
  container: {
    flex: 1,
    backgroundColor: colors.main_background,
  },
  createEventButtons: {
    padding: 10,
    borderRadius: 5,
    width: '45%'
  },
  createEventContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  eventInfo: {
    paddingTop: 20,
    width: '90%',
    borderRadius: 10,
    marginTop: 70
  },
  eventInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  eventOptions: {
    padding: 10,
    borderRadius: 5,
    width: '25%'
  },
  eventOptionsText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  noEvent: {
    textAlign:'center',
    justifyContent:'center',
    fontSize:'75',
    opacity:'0.1'
  },
  scroll: {
    //flex: 1
  },
  sectionTitle: {
    paddingTop: 40,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  tasksWrapper: {
      paddingTop: 40, 
      paddingHorizontal: 20,
  },
})