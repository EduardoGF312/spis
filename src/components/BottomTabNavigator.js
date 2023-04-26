import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import HomeScreen from "../screens/HomeScreen";
import RegistrarScreen from "../screens/RegistrarScreen";
import VisualizarScreen from "../screens/VisualizarScreen";
import FloatingButton from "./FloatingButton";
import FloatingButton2 from "./FloatingButton2";
import { TouchableOpacity } from "react-native";
import RegistroAutomatico from '../screens/registrar/RegistroAutomatico'
import RegistroManual from '../screens/registrar/RegistroManual';
import RegistroPaciente from '../screens/registrar/RegistroPacientes'
import VerPaciente from "../screens/ver/VerPaciente";
import ModificarPaciente from "../screens/modificar/ModificarPaciente";
import VerRegistro from '../screens/ver/VerRegistro'

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    const [selectedTabIcon, setSelectedTabIcon] = useState(null);
    const [isHomeFocused, setIsHomeFocused] = useState(true);
    const navigation = useNavigation();

    const handleIconSelected = (icon) => {
        setSelectedTabIcon(icon);
        setIsHomeFocused(icon === null);
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                setIsHomeFocused(navigation.getCurrentRoute().name === 'Inicio');
            });

            return () => {
                unsubscribe();
            };
        }, [navigation])
    );

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Ionicons
                                name={isHomeFocused ? 'home' : 'home-outline'}
                                size={25}
                                // color={isHomeFocused ? theme.titleColor : 'gray'}
                                color={isHomeFocused ? '#4ade80' : 'gray'}
                                style={styles.tabIcon}
                            />

                        </View>
                    ),
                    tabBarButton: (props) => <TouchableOpacity {...props} />,
                }}
            />

            <Tab.Screen name="Registrar" component={RegistrarScreen}
                options={{
                    tabBarVisible: false,
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name="Ver" component={VisualizarScreen}
                options={{
                    tabBarVisible: false,
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton2 onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='NuevoPaciente' component={RegistroPaciente}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='RegistroManual' component={RegistroManual}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='RegistroAuto' component={RegistroAutomatico}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='VerPaciente' component={VerPaciente}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton2 onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='VerRegistro' component={VerRegistro}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <View style={styles.tabIconContainer}>
                            <FloatingButton2 onIconSelected={handleIconSelected} selectedTabIcon={selectedTabIcon} />

                        </View>
                    ),
                }}
            />

            <Tab.Screen name='ModificarPaciente' component={ModificarPaciente}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                }}
            />

        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    tabIconContainer: {
        position: "absolute",
        top: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    tabIcon: {
        width: 32,
        height: 32,
    },
});
