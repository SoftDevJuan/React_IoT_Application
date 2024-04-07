import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPADRESS from "../../Config/IP_Local";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function Registros() {
  const navigation = useNavigation();

  const [movimientos, setMovimientos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [fadeAnimMovimientos] = useState(new Animated.Value(0));
  // const [fadeAnimUsuarios] = useState(new Animated.Value(0));
  const fadeAnimUsuarios = useRef(new Animated.Value(0)).current;
  const [userEmail, setUserEmail] = useState("");

  // CORREO DE ADMIN
  useEffect(() => {
    // Recuperar el correo electrónico almacenado al cargar la vista
    AsyncStorage.getItem("userEmail").then((value) => {
      if (value !== null) {
        setUserEmail(value);
        console.log("Valor de userEmail:", value);
      }
    });
  }, []);
  // recargar vista
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMovimientos();
      fetchUsuarios();
    }, 3000);

    // Limpio el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  // Cargar Movimientos
  const fetchMovimientos = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (userEmail !== null) {
        const response = await axios.get(
          `${IPADRESS}api/getMovimientos`,
          { params: { emailAdmin: userEmail } }
        );
        setMovimientos(response.data);
        Animated.timing(fadeAnimMovimientos, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
    }
  };
  //¿Cargar Usuarios
  const fetchUsuarios = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (userEmail !== null) {
        const response = await axios.get(
          `${IPADRESS}api/getUsuarios`,
          { params: { emailAdmin: userEmail } }
        );
        setUsuarios(response.data);
        Animated.timing(fadeAnimUsuarios, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
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
      <View style={{ flex: 1 }}>
        <View style={styles.rowData}>
          <Text style={styles.headerText}>Nombre:</Text>
          <Text style={styles.dataText}>{item.username}</Text>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.headerText}>Email:</Text>
          <Text style={styles.dataText}>{item.email}</Text>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.headerText}>RFID:</Text>
          <Text style={styles.dataText}>{item.rfid}</Text>
        </View>
      </View>
      <TouchableOpacity
        onLongPress={() => deleteUser(item.email)}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditarUsuario", {
            email: item.email,
            username: item.username,
            emailAdmin: userEmail,
            rfid: item.rfid,
            puerta: item.puerta,
          })
        }
        style={styles.editButton}
      >
        <MaterialIcons name="edit" size={24} color="blue" />
      </TouchableOpacity>
    </Animated.View>
  );

  const deleteUser = async (email) => {
    try {
      const response = await axios.delete(
        `${IPADRESS}api/borrrarUsuario/${email}`
      );
      Alert.alert("Usuario Eliminado");
      // Vuelve a cargar los usuarios después de eliminar uno
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  //   const renderUsuarioHeader = () => (
  //   <View style={styles.header}>
  //     <Text style={styles.headerText}>Nombre</Text>
  //     <Text style={styles.headerText}>Email</Text>
  //     <Text style={styles.headerText}>RFID</Text>
  //   </View>
  // );

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
        {/* {renderUsuarioHeader()} */}
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
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 3,
    textAlign: "center",
    flex: 0.5,
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
    alignItems: "center", // Alinear los elementos verticalmente
    padding: 6,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    position: "relative", // Posición relativa para el contenedor de cada registro
  },
  rowData: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "900",
    marginBottom: 5,
    marginLeft: 20,
  },
  dataText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#333",
    textAlign: "right",
    flex: 1, // Usa flex: 1 para que el texto ocupe todo el espacio disponible
  },
  deleteButton: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
    marginLeft: 20,
  },
  editButton: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: 2,
    marginLeft: 10,
  },
});

export default Registros;
