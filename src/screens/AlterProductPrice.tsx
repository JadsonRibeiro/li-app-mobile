import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { StatusBar } from 'expo-status-bar'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { loadStores, Store } from '../libs/storage'
import StoreManage, { Price } from '../services/store-manage'

export function AlterProductPrice() {
    const [reference, setReference] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<Store>();
    const [loadedPrice, setLoadedPrice] = useState<Price>();

    async function handleLoadPriceButtonPressed() {
        if(!reference || !selectedStore) 
            return Alert.alert('Erro', 'Informe a referência');

        const storeManage = new StoreManage(selectedStore.apiKey, selectedStore.apiApp); 

        try {
            const priceValues = await storeManage.getAllChildrensPriceByParentSKU(reference);
            if(priceValues) {
                const childrenPrice = priceValues[0];
                setLoadedPrice(childrenPrice);
                setNewPrice(Number(childrenPrice.cheio).toFixed(2));
            }
        } catch(e) {
            console.log('Erro', e);
        }
    }

    function handlePriceChange(value: string) {
        value = value.replace(/\D/g, '');
        if(value.length === 1) {
            value = `0.0${value}`;
            return setNewPrice(value);
        }

        value = [value.slice(0, -2), value.slice(value.length - 2)].join('.');
        value = Number(value).toFixed(2);

        setNewPrice(value);
    }

    async function handleAlterButtonPressed() {
        if(!reference || !newPrice || !selectedStore)
            return Alert.alert('Erro', 'Preencha todos campos');

        const storeManage = new StoreManage(selectedStore.apiKey, selectedStore.apiApp);

        try {
            const priceObj = {
                cheio: newPrice,
                custo: '0.00',
                promocional: '0.00'
            };

            await storeManage.updateAllChildrensPriceByParentSKU(reference, priceObj);
            Alert.alert('Sucesso', 'Preço alterado!');
        } catch(e) {
            console.log('Erro when updating products price', e);
            Alert.alert('Erro', 'Não foi possível alterar o preço');
        }
    }

    useEffect(() => {
        (async () => {
            const storagedStores = await loadStores();
            setStores(storagedStores);
        })()
    }, []);

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>                
                    <Text style={styles.title}>Alterar Preço</Text>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Referência</Text>
                            <TextInput 
                                style={styles.input}
                                value={reference}
                                onChangeText={(value) => setReference(value)}
                                keyboardType="number-pad"
                                placeholder="Referência" 
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Loja</Text>
                            <View style={styles.select}>
                                <Picker
                                    accessibilityLabel="Escolha a loja"
                                    selectedValue={selectedStore}
                                    onValueChange={(store: Store) => setSelectedStore(store)}
                                >
                                    {stores.map(store => (
                                        <Picker.Item 
                                            key={store.apiKey}
                                            label={store.name} 
                                            value={store} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        {loadedPrice 
                        ? (
                            <>
                                <View>
                                    <Text style={styles.label}>Novo preço</Text>
                                    <TextInput 
                                        style={styles.input}
                                        value={newPrice}
                                        onChangeText={handlePriceChange}
                                        keyboardType="number-pad"
                                        placeholder="Preço" 
                                    />
                                </View>
                                <Button 
                                    text="Alterar" 
                                    onPress={handleAlterButtonPressed}
                                />
                            </>
                        ) : (
                            <Button 
                                text="Carregar valores" 
                                onPress={handleLoadPriceButtonPressed}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    title: {
        fontSize: 30,
        marginBottom: 30,
        fontFamily: fonts.heading,
        color: colors.heading,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
        color: colors.heading
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
    select: {
        borderWidth: 1,
        borderColor: colors.heading,
        padding: 5,
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 15,
    }
})
