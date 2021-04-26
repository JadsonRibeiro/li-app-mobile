import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler'

import { Store } from '../libs/storage'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface StoreCardProps extends RectButtonProps {
    data: Store,
    handleRemove: () => void;
}

export function StoreCard({data, handleRemove, ...rest}: StoreCardProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View
                        style={styles.removeArea}
                    >
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" color={colors.white} size={30}  />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton 
                style={styles.storeItem}
                {...rest}
            >
                    <Text style={styles.storeTitle}>{data.name}</Text>
                    <View>
                        <View style={styles.detail}>
                            <Text style={styles.detailLabel}>API Key:</Text>
                            <Text style={styles.detailValue}>{data.apiKey.slice(0, 8)}***</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.detailLabel}>API App:</Text>
                            <Text style={styles.detailValue}>{data.apiApp.slice(0, 8)}***</Text>
                        </View>
                    </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    storeItem: {
        paddingVertical: 10,
        paddingRight: 5,
        backgroundColor: colors.shape,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    storeTitle: {
        fontSize: 17,
    },
    detail: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailLabel: {
        fontFamily: fonts.heading,
        marginRight: 5
    },
    detailValue: {
        fontStyle: 'italic'
    },
    removeArea: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRemove: {
        backgroundColor: colors.red,
        height: '90%',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10
    }
})
