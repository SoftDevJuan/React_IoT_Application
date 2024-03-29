import React from 'react';
import { Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import {useNavigation} from '@react-navigation/native';

import Registros from './Registros';
import Dispositivo from './Dispositivo';
import RegisterPages from './Register';

const Menu = createDrawerNavigator();

function Principal() {

    Navigation= useNavigation();


    const HandleLogout = () => {
        
        Navigation.navigate("Home")
    };  
    
    return (
        <Menu.Navigator
        screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onLongPress={HandleLogout}
                >
                    <Text style={styles.salirText}>Salir</Text>
                </TouchableOpacity>
            ),
        }}
    >
            <Menu.Screen name="Registros" component={Registros}/>
            <Menu.Screen name="Dispositivo" component={Dispositivo}/>
            <Menu.Screen name="Registrar Usuario" component={RegisterPages}/>
            
            
        </Menu.Navigator>
    );
}

const styles = StyleSheet.create({
    salirText: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
         
    },
});

export default Principal;
