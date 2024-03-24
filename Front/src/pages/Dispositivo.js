import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Dispositivo = () => {

  const encenderAlarma = async () => {
    let url = 'http://192.168.1.8:3000/api/actuadores/65ff85d16bebdfad691d7b9e'; // Define la URL de tu API aquí

    // Configura la solicitud para encender la alarma
    let requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor: true }), // Envía el valor true como JSON para encender la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log('Respuesta de la API:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const apagarAlarma = async () => {
    let url = 'http://192.168.1.8:3000/api/actuadores/65ff85d16bebdfad691d7b9e'; // Define la URL de tu API aquí

    // Configura la solicitud para apagar la alarma
    let requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor: false }), // Envía el valor false como JSON para apagar la alarma
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log('Respuesta de la API:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

    
  

  return (
    <View style={styles.container}>

      {/* Contenedor de Alarma */}
      <View style={styles.alarmContainer}>
        <Text style={styles.sectionTitle}>Alarma</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={apagarAlarma}
        >
          <Text style={styles.buttonText}>Apagar</Text>
        </TouchableOpacity>
 
        <TouchableOpacity
          style={styles.button}
          onPress={encenderAlarma}
        >
          <Text style={styles.buttonText}>Encender</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor de Puerta 1 y Puerta 2 */}
      <View style={styles.doorContainer}>
        <View style={styles.doorSection}>
          <Text style={styles.sectionTitle}>Puerta 1</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Abrir Puerta 1')}
          >
            <Text style={styles.buttonText}>Abrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Cerrar Puerta 1')}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.doorSection}>
          <Text style={styles.sectionTitle}>Puerta 2</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Abrir Puerta 2')}
          >
            <Text style={styles.buttonText}>Abrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress('Cerrar Puerta 2')}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenedor de Puerta 3 */}
      <View style={styles.singleDoorContainer}>
        <Text style={styles.sectionTitle}>Puerta 3</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Abrir Puerta 3')}
        >
          <Text style={styles.buttonText}>Abrir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('Cerrar Puerta 3')}
        >
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  alarmContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  doorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  singleDoorContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10, 
    marginBottom: 160,
    flex: 1,
  },
  doorSection: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    margin:8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0d1323',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ebd7be',
    textAlign: 'center',
  },
});

export default Dispositivo;
