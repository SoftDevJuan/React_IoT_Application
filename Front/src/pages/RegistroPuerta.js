import React, { useState, useEffect  } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"; // Importar Feather Icons desde expo/vector-icons

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

function RegisterPuerta() {

  const [numero, setNumero] = useState("");
  const [idPuerta, setIdPuerta] = useState("");
  

  const handleRegister = async () => {

    try {
      const response = await axios.post(
        "http://192.168.1.19:3000/api/puertasForm",
        {
          numero: numero,
          idPuerta:idPuerta
        }
      );

      console.log("Respuesta del servidor:", response.data);
      console.log("ID del la puerta:", response.data.id);
      console.log("numero de puerta:", response.data.numero);
      console.log("idPuerta de puerta: ", response.data.idPuerta);
    
      

      setNumero("");
      setIdPuerta("");
      
      Alert.alert(
        "Registro exitoso",
        "¡Tu Puerta ha sido registrada con éxito!"
      );

    } catch (error) {
      console.error("Error al enviar datos al servidor:", error.message);
      Alert.alert(
        "Error de registro",
        "Hubo un problema al registrar la Puerta. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contenido}>
      <Text style={styles.label}>Numero</Text>
        <TextInput
          style={styles.input}
          placeholder="Numero de Puerta"
          onChangeText={setNumero}
          keyboardType="numeric"
          value={numero}
        />
        <Text style={styles.label}>ID Puerta</Text>
        <TextInput
          style={styles.input}
          placeholder="ID de la Puerta"
          onChangeText={setIdPuerta}
          keyboardType="numeric"
          value={idPuerta}
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
    padding: 60,
    
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
    color: "#343c48",
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
  accesoInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  accesoInput: {
    flex: 1,
    backgroundColor: "#f0e9d8",
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

export default RegisterPuerta;
