import React, { useState, useEffect } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function Registros() {
  const navigation = useNavigation();
  const [movimientos, setMovimientos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Función para obtener los últimos movimientos al cargar el componente
    const fetchMovimientos = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.8:3000/api/getMovimientos"
        );
        setMovimientos(response.data);
        // Realizar animación fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error al obtener movimientos:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(

          "http://192.168.1.8:3000/api/getUsuarios"
        );
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchMovimientos();
    fetchUsuarios();

  }, []);

  const renderMovimientoItem = ({ item }) => {
    // Obtener la fecha en formato Date
    const fecha = new Date(item.fecha);
    // Obtener los componentes de la fecha
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // El mes es devuelto de 0 a 11, por lo que se le suma 1
    const anio = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    // Crear la cadena de texto formateada
    const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  
    return (
      <Animated.View style={[styles.row, { opacity: fadeAnim }]}>
        <Text>{item.username}</Text>
        <Text>{fechaFormateada}</Text> 
        <Text>{item.puerta}</Text>
      </Animated.View>
    );
  };
  const renderUsuarioItem = ({ item }) => (
    <Animated.View style={[styles.row, { opacity: fadeAnim }]}>
      <Text>{item.username}</Text>
      <Text>{item.email}</Text>
      <Text>{item.rfid}</Text>
    </Animated.View>
  );
  const renderUsuarioHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Nombre</Text>
      <Text style={styles.headerText}>Email</Text>
      <Text style={styles.headerText}>RFID</Text>
    </View>
  );
  const renderMovimientoHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Nombre</Text>
      <Text style={styles.headerText}>fecha</Text>
      <Text style={styles.headerText}>Puerta</Text>
    </View>
  );

 

  return (
    <View style={styles.contenido}>

      <View style={styles.listContainer}>
      <Text style={styles.titulo}>Últimos Movimientos</Text>
      {renderMovimientoHeader()}
      <FlatList
        data={movimientos}
        renderItem={renderMovimientoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    
      <View style={styles.listContainer}>
      <Text style={styles.titulo}>Usuarios Registrados</Text>
      {renderUsuarioHeader()}
      <FlatList
        data={usuarios}
        renderItem={renderUsuarioItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  contenido: {
    backgroundColor: "#e3e3e3",
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 0, // Cambiado de 30 a 0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
  },
  label: {
    color: "#0d1323",
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 20,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#85899d",
    padding: 15,
    borderRadius: 10,
    color: "#ffffff",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
    marginLeft: 15,
    fontSize: 20,
    textAlign: "center",
  },
  btnRegistrar: {
    textAlign: "center",
    fontSize: 24,
    color: "#f5b202",
    backgroundColor: "#485f69",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 15,
    padding: 8,
    textTransform: "uppercase",
  },
  titulo: {
    textAlign:'center',
    fontSize: 30,
    marginBottom: 30,
    color: "#0c1c21",
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2, // Elevación para sombra (Android)
    shadowColor: "#000", // Color de sombra (iOS)
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Registros;
