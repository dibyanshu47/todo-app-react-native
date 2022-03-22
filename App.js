import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import NoTodo from './components/noTodo';

export default function App() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = () => {
            AsyncStorage.getItem('todos').then(data => {
                setTodos((prevTodos) => {
                    if (data !== null) {
                        return [...prevTodos, ...JSON.parse(data)];
                    } else {
                        return [...prevTodos];
                    }
                })
            }).catch((error) => console.log(error));
        };
        fetchTodos();
    }, [])

    useEffect(() => {
        console.log("UPDAGTE");
        const fetchTodos = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todos));
                // debugTodo();
            } catch (error) {
                console.log(error);
            }
        };
        fetchTodos();
    }, [todos])


    const debugTodo = () => {
        AsyncStorage.getItem('todos').then(data => {
            console.log(JSON.parse(data));
        }).catch(error => console.log(error));
    }

    const updateTodos = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
            // debugTodo();
        } catch (error) {
            console.log(error);
        }
    }

    const pressHandler = (key) => {
        // console.log(todos);
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
        // console.log(todos);
    }

    const submitHandler = (text) => {
        if (text.length > 2) {
            console.log("UP");
            console.log(todos);
            setTodos((prevTodos) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevTodos
                ]
            })
            console.log("DOWN");
            console.log(todos);
        } else {
            Alert.alert('OOPS!', 'Todos must be over 2 characters long.', [
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
