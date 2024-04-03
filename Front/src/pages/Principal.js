import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    Text,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import {useNavigation} from '@react-navigation/native';



import Registros from './Registros';
import Dispositivo from './Dispositivo';
import RegisterPages from './Register';
import RegisterPuerta from './RegistroPuerta';

const Menu = createDrawerNavigator();

function Principal() {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Recuperar el correo electrónico almacenado al cargar la vista
        AsyncStorage.getItem('userEmail').then((value) => {
            if (value !== null) {
                setUserEmail(value);
            }
        });
    }, []);

    Navigation= useNavigation();


    const HandleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userEmail');
            setUserEmail('');
            Navigation.navigate("Home");
        } catch (error) {
            console.error("Error al eliminar el correo electrónico:", error);
        }
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
            <Menu.Screen name="Registrar Puerta" component={RegisterPuerta}/>
            
            
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
