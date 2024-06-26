import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IPADRESS from "../../Config/IP_Local";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";

function EditarUsuario({ route }) {

  const navigation = useNavigation();

  const { email, username, emailAdmin, rfid, puerta } = route.params;
  
  const emailViejo = email;

  const [userEmail, setUserEmail] = useState('');
  const [usernameForm, setUsernameForm] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [RFID, setRFID] = useState('');
  const [puertaUser, setPuertaUser] = useState([]); 
  const [nuevaPuerta, setNuevaPuerta] = useState(""); 

  useEffect(() => {
    // Actualizar los estados cuando cambien los valores de route.params
    setUsernameForm(username);
    setEmailUser(email);
    setRFID(rfid);
    setPuertaUser(puerta);
  }, [email, username, rfid, puerta]);

  useEffect(() => {
    // Recuperar el correo electrónico almacenado al cargar la vista
    AsyncStorage.getItem('userEmail').then((value) => {
      if (value !== null) {
        setUserEmail(value);
      }
    });
  }, []);

  const handleEdit = async () => {
    try {
      const response = await axios.post(
        `${IPADRESS}api/actualizarUsuario`,
        {
          emailViejo: emailViejo,
          email: emailUser,
          username: usernameForm,
          emailAdmin: userEmail,
          rfid: RFID,
          puerta: puertaUser
        }
      );

      if (response.status === 200) {
        setUsernameForm("");
        setEmailUser("");
        setRFID("");
        setPuertaUser([]);
        Alert.alert(
          `Usuario ${username} actualizado`
        );
        navigation.navigate('Principal');
      } else if (response.status === 400) {
        Alert.alert(
          "Error al actualizar usuario",
          response.data.message // Mostrar el mensaje de error del servidor
        );
      }
    } catch (error) {
      console.error("Error al enviar datos al servidor:", error.message);
      Alert.alert(
        "Error de registro",
        "Hubo un problema al actualizar la cuenta. Por favor, intenta nuevamente."
      );
    }
  };

  const agregarPuerta = () => {
    setPuertaUser([...puertaUser, { puerta_id: nuevaPuerta }]);
    setNuevaPuerta("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contenido}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={setUsernameForm}
          keyboardType="default"
          value={usernameForm}
        />
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={setEmailUser}
          keyboardType="email-address"
          value={emailUser}
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
          placeholder="Puerta"
          onChangeText={setNuevaPuerta}
          keyboardType="default"
          value={nuevaPuerta}
        />

        {/* Botón para agregar la nueva puerta */}
        <TouchableOpacity onPress={agregarPuerta} style={styles.btnAgregarUsuario}>
          <Text style={styles.btnTextoAgregar}>Agregar Puertas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEdit} style={styles.btnRegistrar}>
          <Text style={styles.btnTexto}>EDITAR USUARIO</Text>
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
  btnAgregarUsuario:{
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 55,
    marginRight: 55,
    backgroundColor: "#0d1323",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnTextoAgregar:{
    color: "#ebd7be",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    textTransform:"uppercase"
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

export default EditarUsuario;
