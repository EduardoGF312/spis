import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

export default function FloatingButton({onIconSelected, selectedTabIcon}) {
    const [animation] = useState(new Animated.Value(0));
    const [open, setOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const navigation = useNavigation();

    const toggleMenu = () => {
        if(selectedTabIcon !== null && selectedTabIcon !== 'create') {
            return;
        }

        const toValue = open ? 0 : 1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: false,
        }).start();

        setOpen(!open);

        setSelectedIcon(selectedIcon === "create" ? null : 'create');

        if(onIconSelected) {
            onIconSelected(selectedIcon === 'create' ? null : 'create');
        }
    };


    const pinStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70],
                }),
            },
        ],
    };

    const thumbStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -105],
                }),
            },
        ],
    };

    const heartoStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70],
                }),
            },
        ],
    };

    const opacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });



    return (
        <View style={[styles.container]}>
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('RegistroManual');
            }}>
                <Animated.View style={[styles.button, styles.secondary, heartoStyle, opacity, {left: 45}]}>
                    <Entypo name='pencil' size={20} color='gray' />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('RegistroAuto');
            }}>
                <Animated.View style={[styles.button, styles.secondary, thumbStyle, opacity]}>
                    <Ionicons name='play-forward-outline' size={20} color='gray' />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('NuevoPaciente');
            }}>
                <Animated.View style={[styles.button, styles.secondary, pinStyle, opacity, {right: 45}]}>
                    <Ionicons name='person-add-outline' size={20} color='gray' />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View>
                    <Ionicons
                        name={selectedIcon === "create" ? 'create' : 'create-outline'}
                        color={selectedIcon === "create" ? '#22c55e' : 'gray'}
                        size={25}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
    },
    secondary: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#FFF',
    },
})