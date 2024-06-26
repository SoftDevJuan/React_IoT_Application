import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPADRESS from "../../Config/IP_Local";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";



const Dispositivo = () => {

  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState("");
  const [puertas, setPuertas] = useState([]);

  useEffect(() => {
    // Recuperar el correo electrónico almacenado al cargar la vista
    AsyncStorage.getItem("userEmail").then((value) => {
      if (value !== null) {
        setUserEmail(value);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");

        if (userEmail !== null) {
          // Construir la URL con los parámetros de la cadena de consulta
          const url = `${IPADRESS}api/puertaNumero?emailAdmin=${encodeURIComponent(
            userEmail
          )}`;

          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => setPuertas(data))
            .catch((error) => console.error("Error fetching data: ", error));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const intervalId = setInterval(fetchData, 2000); // Realizar la consulta cada 2 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // PUT A PUERTA
  const statusPuerta = async (
    id,
    valorStatus,
    valorAlarma,
    valorActivacion
  ) => {
    let url = `${IPADRESS}api/puertasDispositivo/${id}`;

    // Crea un objeto para almacenar los campos a actualizar
    let fieldsToUpdate = {};

    // Si valorStatus se proporciona, añádelo al objeto de actualización
    if (valorStatus !== null && valorStatus !== undefined) {
      fieldsToUpdate.status = valorStatus;
    }

    // Si valorAlarma se proporciona, añádelo al objeto de actualización
    if (valorAlarma !== null && valorAlarma !== undefined) {
      fieldsToUpdate.alarma = valorAlarma;
    }

    // Si valorActivacion no está definido, establece el valor predeterminado como "local"
    if (valorActivacion === undefined) {
      valorActivacion = "remota";
    }

    // Añade el valor de activacion al objeto de actualización
    fieldsToUpdate.activacion = valorActivacion;

    // Configura la solicitud para encender la alarma
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fieldsToUpdate), // Envía el valor true como JSON para encender la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.text();
      console.log("Respuesta de la API:", data); // Imprime la respuesta completa
      const jsonData = JSON.parse(data);
      console.log("Respuesta JSON:", jsonData);
      Alert.alert("PUERTA ACTUALIZADA");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const toggleAlarm = (numero, action) => {
    const puerta = puertas.find((puerta) => puerta.numero === numero);
    const valorAlarma = action === "encender" ? true : false;
    statusPuerta(puerta._id, null, valorAlarma);
  };

  const toggleDoor = (numero, action) => {
    const puerta = puertas.find((puerta) => puerta.numero === numero);
    const valorStatus = action === "abrir" ? true : false;
    statusPuerta(puerta._id, valorStatus, null);
  };
  const deletePuerta = async (_id) => {
    try {
      const response = await axios.delete(
        `${IPADRESS}api/borrarPuerta/${_id}`
      );
      Alert.alert("Puerta Eliminada");
      
    } catch (error) {
      console.error("Error al eliminar Puerta:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {puertas.map((puerta) => (
          <View style={styles.doorWrapper} key={puerta._id}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta {puerta.numero}</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleAlarm(puerta.numero, "apagar")}
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleAlarm(puerta.numero, "encender")}
                >
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.alarmContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleDoor(puerta.numero, "abrir")}
                >
                  <Text style={styles.buttonText}>Abrir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleDoor(puerta.numero, "cerrar")}
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity 
              style={styles.iconButton}
              onLongPress={() => deletePuerta(puerta._id)}
              >
              <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}
             onPress={() =>
              navigation.navigate("EditarPuerta", {
                _id: puerta._id,
                numeroPuerta: puerta.numero,
                usuarios: puerta.usuarios,
                id_Puerta: puerta.idPuerta
                
              })
             
              }>
                <MaterialIcons name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#c8cbd1",
  },
  alarmContainer: {
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 15,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 2,
    paddingRight: 3,
    marginBottom: 10,
    marginTop: 5,
  },
  doorContainer: {
    justifyContent: "space-between", // Para distribuir los doorWrapper horizontalmente
  },
  doorWrapper: {
    marginBottom: 20,
    borderWidth: 5,
    borderRadius: 15,
    backgroundColor: "#e7f0e6",
  },
  doorSection: {
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0d1323",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ebd7be",
    textAlign: "center",
    textTransform: "uppercase",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom:15,
    marginLeft:40,
    marginRight:40,

  },
  iconButton: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderColor:"#212121",
    borderWidth: 5, // Ancho del borde
    marginHorizontal: 5,
    marginLeft:30,
    marginRight:30,
  },
});

export default Dispositivo;