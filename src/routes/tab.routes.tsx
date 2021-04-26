import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home';
import { SaveStore } from '../screens/SaveStore';
import colors from '../styles/colors';

const Tabs = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                labelPosition: 'below-icon',
            }}
        >
            <Tabs.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    )
                }}
            />

            <Tabs.Screen 
                name="Adicionar Loja" 
                component={SaveStore}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons name="add" color={color} size={size} />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}