import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IPADRESS  from "../../Controllers/IP_Local"

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";

function RegisterPages() {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [puerta, setPuerta] = useState("");
    const [RFID, setRFID] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true); // Estado para controlar si se muestra o no la contraseña
  
    useEffect(() => {
        // Recuperar el correo electrónico almacenado al cargar la vista
        AsyncStorage.getItem('userEmail').then((value) => {
            if (value !== null) {
                setUserEmail(value);
            }
        });
    }, []);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = async () => {

    try {
      const response = await axios.post(
        `http://${IPADRESS}:3000/api/register`,
        {
          username: username,
          email:email,
          emailAdmin:userEmail,
          rfid: RFID,
          puerta: puerta
        }
      );

      console.log("Respuesta del servidor:", response.data);
      console.log("ID del usuario:", response.data.id);
      console.log("Nombre de usuario:", response.data.username);
      console.log("Correo electrónico:", response.data.email);
      console.log("RFID:", response.data.rfid);
      console.log("Puerta:", response.data.puerta);

      setUsername("");
      setEmail("");
      // setPassword("");
      setRFID("");
      setPuerta("");

      Alert.alert(
        "Registro exitoso",
        "¡Tu cuenta ha sido registrada con éxito!"
      );
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error.message);
      Alert.alert(
        "Error de registro",
        "Hubo un problema al registrar la cuenta. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contenido}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={setUsername}
          keyboardType="default"
          value={username}
        />
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={setEmail}
          keyboardType="email-address"
          value={email}
        />
       
        <Text style={styles.label}>Tarjeta</Text>
        <TextInput
          style={styles.input}
          placeholder="RFID"
          onChangeText={setRFID}
          keyboardType="default"
          value={RFID}
        />
        <Text style={styles.label}>Puerta</Text>
        <TextInput
          style={styles.input}
          placeholder="puerta"
          onChangeText={setPuerta}
          keyboardType="numeric"
          value={puerta}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.btnRegistrar}>
          <Text style={styles.btnTexto}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contenido: {
    backgroundColor: "#c8cbd1",
    flex: 1,
    justifyContent: "flex-start", // Alinea el contenido al principio
    paddingHorizontal: 23,
    padding: 20,

  },
  label: {
    color: "#151517",
    marginBottom: 10,
    marginTop: 20,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#f0e9d8",
    padding: 15,
    borderRadius: 10,
    color: "#000000",
    marginBottom: 10,
    textAlign:"center"
  },
  btnRegistrar: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "#0d1323",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnTexto: {
    color: "#ebd7be",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 23,
    textTransform:"uppercase"
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#959ac0",
    padding: 15,
    borderRadius: 10,
    color: "#0d1323",
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "#ece6ea",
    borderRadius: 10,
    marginLeft: 10,
  },
  toggleButtonText: {
    color: "#ebd7be",
    fontWeight: "bold",
  },
});

export default RegisterPages;
