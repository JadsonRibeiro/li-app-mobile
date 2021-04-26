import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { saveStore, Store } from '../libs/storage';

export function SaveStore() {
    const navigator = useNavigation();
    const route = useRoute();
    
    const params = route.params as Store;

    const [name, setName] = useState(params?.name);
    const [apiKey, setApiKey] = useState(params?.apiKey);
    const [apiApp, setApiApp] = useState(params?.apiApp);

    async function handleButtonPress() {
        if(!name || !apiKey || !apiApp)
            return Alert.alert('Erro', 'Preencha todos os campos!');

        try {
            await saveStore(name, apiKey, apiApp);

            Alert.alert('Sucesso', 'Nova loja salva', [
                {
                    text: 'Ir para Home',
                    onPress: () => navigator.navigate('Home')
                },
                {
                    text: 'Salvar outra',
                    style: 'destructive',
                    onPress: () => {
                        setName('');
                        setApiKey('');
                        setApiApp('');
                    }
                }
            ]);

        }
        catch (e) {
            Alert.alert('Erro ao salvar loja');
            console.log('Erro when adding new store', e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {params ? 'Atualizar' : 'Adicionar'} Loja
            </Text>
            <View style={styles.form}>
                <View style={styles.formControll}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                <View style={styles.formControll}>
                    <Text style={styles.label}>API Key</Text>
                    <TextInput 
                        style={styles.input}
                        autoCapitalize="none"
                        value={apiKey}
                        editable={!params}
                        onChangeText={(value) => setApiKey(value)} 
                        />
                </View>
                <View style={styles.formControll}>
                    <Text style={styles.label}>API App</Text>
                    <TextInput 
                        style={styles.input}
                        autoCapitalize="none"
                        value={apiApp}
                        onChangeText={(value) => setApiApp(value)} 
                    />
                </View>
            </View>
            <Button 
                text={params ? 'Atualizar': 'Adicionar'}
                onPress={handleButtonPress}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom: 20
    },
    form: {
        width: '100%'
    },
    formControll: {
        marginBottom: 20,
        width: '100%'
    },
    label: {
        fontSize: 20,
        fontFamily: fonts.text,
        textAlign: 'left', 
        marginBottom: 5
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 5,
        height: 45,
        paddingHorizontal: 10
    }
})
