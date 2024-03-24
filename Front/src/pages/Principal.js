import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Registros from './Registros';
import Dispositivo from './Dispositivo';

const Menu = createDrawerNavigator();

function Principal() {
    return (
        <Menu.Navigator>
            <Menu.Screen name="Registros" component={Registros}/>
            <Menu.Screen name="Dispositivo" component={Dispositivo}/>
        </Menu.Navigator>
    );
}

export default Principal;
