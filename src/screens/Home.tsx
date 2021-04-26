import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'

import liLogoImg from '../assets/li-logo.png';

import { StoreCard } from '../components/StoreCard'

import fonts from '../styles/fonts';
import colors from '../styles/colors';

import { deleteStore, loadStores, Store } from '../libs/storage';

export function Home() {
    const [stores, setStores] = useState<Store[]>([]);

    const navigator = useNavigation();
    const isFocused = useIsFocused();

    async function getStores() {
        const storeList = await loadStores();
        setStores(storeList);
    }

    async function handleRemoveStore(store: Store) {
        Alert.alert('Remover loja', `Deseja remover a loja ${store.name}?`, [
            {
                text: 'Sim',
                onPress: async () => {
                    await deleteStore(store.apiKey);
                    await getStores();
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    function handleStoreCardPressed(store: Store) {
        navigator.navigate('SaveStore', store);
    }

    useEffect(() => {
        getStores();
        
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTextTop}>Bem Vindo ao</Text>
                    <Text style={styles.headerTextBottom}>LI App 😁</Text>
                </View>
                <Image source={liLogoImg} style={styles.logoImage} />
            </View>
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Lojas cadastradas</Text>
                <View style={styles.storesArea}>
                    {stores.length 
                        ? stores.map(store => (
                            <StoreCard 
                                data={store} 
                                key={store.apiKey}
                                handleRemove={() => handleRemoveStore(store)}
                                onPress={() => handleStoreCardPressed(store)}
                            />
                        )) 
                        : <Text>Nenhuma loja cadastrada</Text>
                    }
                </View>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigator.navigate('SaveStore')}
                >
                    <Text style={styles.buttonText}>Adicionar Loja</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerTextTop: {
        fontSize: 20,
        color: colors.heading
    },
    headerTextBottom: {
        fontSize: 35,
        fontFamily: fonts.heading,
        color: colors.heading
    },
    logoImage: {
        width: 50,
        height: 50,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        width: '100%',
        fontFamily: fonts.heading,
        color: colors.heading
    },
    storesArea: {
        marginVertical: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
    },
    buttonText: {
        color: colors.white,
        fontSize: 15,
        textTransform: 'uppercase',
        fontFamily: fonts.heading
    }
})
