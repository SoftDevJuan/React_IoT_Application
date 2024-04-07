import React, { useState, useEffect  } from "react";
import IPADRESS from "../../Config/IP_Local";
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
import AsyncStorage from '@react-native-async-storage/async-storage';


function RegisterPuerta() {

  const [numero, setNumero] = useState("");
  const [idPuerta, setIdPuerta] = useState("");
  const [userEmail, setUserEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Nuevo estado para almacenar los usuarios y sus rfid_id
  const [nuevoUsuario, setNuevoUsuario] = useState(""); // Estado para almacenar el nuevo usuario


  useEffect(() => {
      // Recuperar el correo electrónico almacenado al cargar la vista
      AsyncStorage.getItem('userEmail').then((value) => {
          if (value !== null) {
              setUserEmail(value);
              console.log("Valor de userEmail:", value); 
          }
      });
  }, []);

  const handleRegister = async () => {

    try {
      const response = await axios.post(
        `${IPADRESS}api/puertasForm`,
        {

          numero: numero,
          idPuerta:idPuerta,
          emailAdmin: userEmail,
          usuarios: usuarios 
        }
      );

      console.log("Respuesta del servidor:", response.data);
      console.log("ID del la puerta:", response.data.id);
      console.log("numero de puerta:", response.data.numero);
      console.log("idPuerta de puerta: ", response.data.idPuerta);
      console.log("UserAdmin de puerta: ", response.data.userEmail);
    
      

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

  const agregarUsuario = () => {
    setUsuarios([...usuarios, { rfid_id: nuevoUsuario }]);
    setNuevoUsuario("");
    
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
          // value={"gate_oo1"}
        />

         {/* Nuevo campo de entrada para el rfid_id del usuario */}
         <Text style={styles.label}>Usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuarios Permitidos"
          onChangeText={setNuevoUsuario}
          value={nuevoUsuario}
        />
        {/* Botón para agregar el nuevo usuario */}
        <TouchableOpacity onPress={agregarUsuario} style={styles.btnAgregarUsuario}>
          <Text style={styles.btnTextoAgregar}>Agregar Usuario</Text>
        </TouchableOpacity>

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
    marginTop: 30,
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
  btnTexto: {
    color: "#ebd7be",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    textTransform:"uppercase"
  },
  btnTextoAgregar:{
    color: "#ebd7be",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
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
