import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

const groupActions = [
    {
        title: 'Produtos',
        id: 'products',
        actions: [
            { label: 'Alterar Preço', id: 'alter-price', screen: 'AlterProductPrice' },
            { label: 'Aplicar Desconto', id: 'apply-discount', screen: 'ApplyDiscountOnProduct' },
        ]
    },
    {
        title: 'Variantes',
        id: 'variants',
        actions: [
            { label: 'Alterar Preço', id: 'alter-price', screen: 'AlterVariantPrice' },
            { label: 'Aplicar Desconto', id: 'apply-discount', screen: 'ApplyDiscountOnVariant' },
        ]
    }
]

export function PricesListActions() {
    const navigator = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>O que você deseja realizar?</Text>
            <View style={styles.actionsList}>
                {groupActions.map(group => (
                    <View style={styles.actionsGroup} key={group.id}>
                        <Text style={styles.groupTitle}>{group.title}</Text>
                        {group.actions.map(action => (
                            <View style={styles.button} key={action.id}>
                                <Button text={action.label} onPress={() => navigator.navigate(action.screen)} />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom: 20
    },
    actionsList: {
        width: '100%'
    },
    actionsGroup: {
        marginBottom: 10
    },
    groupTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: fonts.heading,
        color: colors.heading,
    },
    button: {
        marginBottom: 10
    }
})
