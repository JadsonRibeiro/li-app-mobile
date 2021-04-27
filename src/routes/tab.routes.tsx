import React from 'react'
import { Foundation } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home';
import { SaveStore } from '../screens/SaveStore';
import { PricesListActions } from '../screens/PricesListActions';

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
                name="Preços" 
                component={PricesListActions}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Foundation name="pricetag-multiple" color={color} size={size} />
                    )
                }}
            />

            <Tabs.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Foundation name="home" color={color} size={size} />
                    )
                }}
            />

            <Tabs.Screen 
                name="Estoque" 
                component={SaveStore}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Foundation name="shopping-cart" color={color} size={size} />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}