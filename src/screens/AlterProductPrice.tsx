import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { loadStores, Store } from '../libs/storage'

export function AlterProductPrice() {
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<Store>();

    function handleAlterButtonPressed() {
        console.log('Selected Store', selectedStore);    
    }

    useEffect(() => {
        (async () => {
            const storagedStores = await loadStores();
            setStores(storagedStores);
        })()
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar Preço</Text>
            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Referência</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Referência" 
                    />
                </View>
                <View>
                    <Text style={styles.label}>Novo preço</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Preço" 
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
                <Button 
                    text="Alterar" 
                    onPress={handleAlterButtonPressed}
                />
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
        fontSize: 30,
        marginBottom: 30,
        fontFamily: fonts.heading,
        color: colors.heading
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
    select: {
        borderWidth: 1,
        borderColor: colors.heading,
        padding: 5,
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 15,
    }
})
