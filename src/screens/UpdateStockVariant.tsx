import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'

import StoreManage from '../services/store-manage'

import colors from '../styles/colors'

const LOJA_INTEGRADA_API_APP='410a8180-48cc-4c18-98f0-926ee17da110'
const LOJA_INTEGRADA_MORAH_API_KEY='b25d760caf81ad23337d'

export function UpdateStockVariant() {
    const [variantSKU, setVariantSKU] = useState('');
    const [newStockQnt, setNewStockQnt] = useState('');

    async function handleButtonPress() {
        if(!variantSKU || !newStockQnt)
            return Alert.alert('Erro', 'Preencha os campos');
            
        try {
            const store = new StoreManage(LOJA_INTEGRADA_MORAH_API_KEY, LOJA_INTEGRADA_API_APP);
            const res = await store.updateStockBySKU(variantSKU, Number(newStockQnt));
            if(res.status === 200)
                Alert.alert('Sucesso', 'Estoque atualizado');
            else
                throw new Error('Error on request');
        }
        catch (e) {
            console.log('UPDATE VARIANT STOCK: Error on request', e);
            return Alert.alert('Erro', 'Erro ao atualizar estoque');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar  estoque</Text>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Digite o SKU da variante</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="ID da Variante"
                        onChangeText={value => setVariantSKU(value)}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Digite o novo valor</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Valor do estoque"
                        onChangeText={value => setNewStockQnt(value)}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (!variantSKU || !newStockQnt) && styles.buttonInactive
                    ]}
                    onPress={handleButtonPress}
                >
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 25,
        marginBottom: 30
    },
    form: {
        width: '100%'
    },
    label: {
        fontSize: 15,
        marginBottom: 10
    }, 
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.heading,
        padding: 15,
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 15
    },
    button: {
        padding: 15,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonInactive: {
        backgroundColor: colors.gray
    },
    buttonText: {
        fontSize: 20,
        color: colors.white
    }
})
