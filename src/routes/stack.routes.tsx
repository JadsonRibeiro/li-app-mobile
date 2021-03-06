import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UpdateStockVariant } from '../screens/UpdateStockVariant';
import { SaveStore } from '../screens/SaveStore';
import { TabRoutes } from './tab.routes';
import { AlterProductPrice } from '../screens/AlterProductPrice';

const Stack = createStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Tabs"
        >
            <Stack.Screen name="Tabs" component={TabRoutes} />
            <Stack.Screen name="UpdateStockVariant" component={UpdateStockVariant} />
            <Stack.Screen name="SaveStore" component={SaveStore} />
            <Stack.Screen name="AlterProductPrice" component={AlterProductPrice} />
        </Stack.Navigator>
    )
}