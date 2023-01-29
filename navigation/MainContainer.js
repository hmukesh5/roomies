import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import HomeScreen from './screens/Home'
import TasksScreen from './screens/Tasks'
import ListScreen from './screens/List'

// Screen names
const homeName = "Home";
const tasksName = "Tasks";
const listName = "List";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    // icons at the bottom, highlights buttons when pressed
                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === tasksName) {
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (rn === listName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: '#e85a5a',
                inactiveTintColor: 'grey',
                labelStyle: {fontSize: 10}
            }}
            >

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={tasksName} component={TasksScreen}/>
            <Tab.Screen name={listName} component={ListScreen}/>


            </Tab.Navigator>
        </NavigationContainer>
    );
}