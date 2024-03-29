import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import axios from "axios";

function Registros() {
  const [movimientos, setMovimientos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [fadeAnimMovimientos] = useState(new Animated.Value(0));
  const [fadeAnimUsuarios] = useState(new Animated.Value(0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMovimientos();
      fetchUsuarios();
    }, 2000);

    // Limpio el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const fetchMovimientos = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.12:3000/api/getMovimientos"
      );
      setMovimientos(response.data);
      Animated.timing(fadeAnimMovimientos, {
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
        "http://192.168.1.12:3000/api/getUsuarios"
      );
      setUsuarios(response.data);
      Animated.timing(fadeAnimUsuarios, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const renderMovimientoItem = ({ item }) => {
    const fecha = new Date(item.fecha);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}`;

    return (
      <Animated.View style={[styles.row, { opacity: fadeAnimMovimientos }]}>
        <Text style={styles.dataText}>{item.username}</Text>
        <Text style={styles.dataText}>{fechaFormateada}</Text>
        <Text style={styles.dataText}>{item.puerta}</Text>
      </Animated.View>
    );
  };

  const renderUsuarioItem = ({ item }) => (
    <Animated.View style={[styles.row, { opacity: fadeAnimUsuarios }]}>
      <Text style={styles.dataText}>{item.username}</Text>
      <Text style={styles.dataText}>{item.email}</Text>
      <Text style={styles.dataText}>{item.rfid}</Text>
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
      <Text style={styles.headerText}>Fecha</Text>
      <Text style={styles.headerText}>Puerta</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: "#c8cbd1",
    paddingVertical: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom:5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "900",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10,
    marginTop: 10,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dataText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default Registros;
