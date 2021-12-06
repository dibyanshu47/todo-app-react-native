import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import NoTodo from './components/noTodo';

export default function App() {
    const [todos, setTodos] = useState([]);

    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
    }

    const submitHandler = (text) => {

        if (text.length > 3) {
            setTodos((prevTodos) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevTodos
                ]
            })
        } else {
            Alert.alert('OOPS!', 'Todos must be over 3 characters long.', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                    <AddTodo submitHandler={submitHandler} />
                    {todos.length != 0 ? (
                        <View style={styles.list}>
                            <FlatList
                                data={todos}
                                renderItem={({ item }) => (
                                    <TodoItem item={item} pressHandler={pressHandler} />
                                )}
                            />
                        </View>
                    ) : <NoTodo />}
                </View>
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 40,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});
