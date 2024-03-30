import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const Dispositivo = () => {
  // CONTROLAR LA ALARMA
  const encenderAlarma = async (id) => {
    let url = `http://192.168.1.12:3000/api/actuadores/${id}`; // Define la URL de tu API aquí

    // Configura la solicitud para encender la alarma
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valor: true }), // Envía el valor true como JSON para encender la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      Alert.alert("ALARMA ENCENDIDA");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const apagarAlarma = async (id) => {
    let url = `http://192.168.1.12:3000/api/actuadores/${id}`; // Define la URL de tu API aquí

    // Configura la solicitud para apagar la alarma
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valor: false }), // Envía el valor false como JSON para apagar la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      Alert.alert("ALARMA APAGADA");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  // CONTROLAR EL SERVO MOTOR
  const abrirPuerta = async (id) => {
    let url = `http://192.168.1.12:3000/api/actuadores/${id}`; // Define la URL de tu API aquí

    // Configura la solicitud para encender la alarma
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valor: true }), // Envía el valor true como JSON para encender la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      Alert.alert("PUERTA ABIERTA");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const cerrarPuerta = async (id) => {
    let url = `http://192.168.1.12:3000/api/actuadores/${id}`; // Define la URL de tu API aquí

    // Configura la solicitud para apagar la alarma
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valor: false }), // Envía el valor false como JSON para apagar la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      Alert.alert("PUERTA CERRADA");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  // PUT A PUERTA
  const statusPuerta = async (
    id,
    valorStatus,
    valorAlarma,
    valorActivacion
  ) => {
    let url = `http://192.168.1.12:3000/api/puertas/${id}`;

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
      valorActivacion = "local";
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

  // Función para encender/apagar la alarma
  const toggleAlarm = (id, action) => {
    // Establece el valor de la alarma según la acción
    const valorAlarma = action === "encender" ? true : false;
    statusPuerta(id, null, valorAlarma); // Solo cambia el valor de la alarma
  };

  // Función para abrir/cerrar la puerta
  const toggleDoor = (id, action) => {
    // Establece el valor de status según la acción
    const valorStatus = action === "abrir" ? true : false;
    statusPuerta(id, valorStatus, null); // Solo cambia el valor de status
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.doorContainer}>
          {/* Contenedor de Puerta 1 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 1</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("66084d807f5c2b9b20c7aa9c", "apagar")
                  }
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("66084d807f5c2b9b20c7aa9c", "encender")
                  }
                >
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.alarmContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("66084d807f5c2b9b20c7aa9c", "abrir")
                  }
                >
                  <Text style={styles.buttonText}>Abrir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("66084d807f5c2b9b20c7aa9c", "cerrar")
                  }
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Contenedor de Puerta 2 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 2</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("660858ee18c011eb693b2b1c", "apagar")
                  }
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("660858ee18c011eb693b2b1c", "encender")
                  }
                >
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.alarmContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("660858ee18c011eb693b2b1c", "abrir")
                  }
                >
                  <Text style={styles.buttonText}>Abrir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("660858ee18c011eb693b2b1c", "cerrar")
                  }
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Contenedor de Puerta 3 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 3</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("6608596d7fc18b2d8acdd26c", "apagar")
                  }
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleAlarm("6608596d7fc18b2d8acdd26c", "encender")
                  }
                >
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.alarmContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("6608596d7fc18b2d8acdd26c", "abrir")
                  }
                >
                  <Text style={styles.buttonText}>Abrir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    toggleDoor("6608596d7fc18b2d8acdd26c", "cerrar")
                  }
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
});

export default Dispositivo;
