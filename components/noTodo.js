import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NoTodo() {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Start your day by adding some todos!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})