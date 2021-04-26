import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends RectButtonProps {
    text: string,
}

export function Button( {text, ...rest}: ButtonProps ) {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <Text
                style={styles.text}
            >
                {text}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        paddingVertical: 15,
        width: '100%',
        borderRadius: 5
    },
    text: {
        color: colors.white,
        fontFamily: fonts.heading,
        textTransform: 'uppercase'
    }
})
