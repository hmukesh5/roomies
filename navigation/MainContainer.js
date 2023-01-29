import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, StyleSheet} from 'react-native';

// Screens
import ProfileScreen from './screens/Profile';
import TasksScreen from './screens/Tasks';
import ListScreen from './screens/List';
import EventsScreen from './screens/Events';

// Screen names
const profileName = "Profile";
const tasksName = "Tasks";
const listName = "List";
const eventsName = "Events";

const Tab = createBottomTabNavigator();

function LogoTitle() {
    return (
      <Image
        style={{alignContent: 'center', width: 90, height:40, marginBottom: 15}}
        source={require('./roomies-large.png')}
      />
    );
  }  

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={profileName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    // icons at the bottom, highlights buttons when pressed
                    if (rn === profileName) {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (rn === tasksName) {
                        iconName = focused ? 'checkbox' : 'checkbox-outline'
                    } else if (rn === listName) {
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (rn === eventsName) {
                        iconName = focused ? 'today' : 'today-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: '#81c8cc',
                tabBarInactiveTintColor: 'gray'
            })}>

            <Tab.Screen name={profileName} component={ProfileScreen} options={{headerStyle: {backgroundColor: '#95c9cc'}, tabBarBadge: 3, headerTitle: (props) => <LogoTitle {...props}/>}}/>
            <Tab.Screen name={tasksName} component={TasksScreen} options={{headerStyle: {backgroundColor: '#95c9cc'}, headerTitle: (props) => <LogoTitle {...props}/>}}/>
            <Tab.Screen name={listName} component={ListScreen} options={{headerStyle: {backgroundColor: '#95c9cc'}, headerTitle: (props) => <LogoTitle {...props}/>}}/>
            <Tab.Screen name={eventsName} component={EventsScreen} options={{headerStyle: {backgroundColor: '#95c9cc'}, headerTitle: (props) => <LogoTitle {...props}/>}}/>


            </Tab.Navigator>
        </NavigationContainer>
    );
}