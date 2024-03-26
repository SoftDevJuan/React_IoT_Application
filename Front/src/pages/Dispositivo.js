import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.doorContainer}>
          {/* Contenedor de Puerta 1 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 1</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity style={styles.button} onPress={apagarAlarma}>
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={encenderAlarma}>
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 1', 'Abrir')}>
                <Text style={styles.buttonText}>Abrir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 1', 'Cerrar')}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenedor de Puerta 2 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 2</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity style={styles.button} onPress={apagarAlarma}>
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={encenderAlarma}>
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 2', 'Abrir')}>
                <Text style={styles.buttonText}>Abrir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 2', 'Cerrar')}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenedor de Puerta 3 */}
          <View style={styles.doorWrapper}>
            <View style={styles.doorSection}>
              <Text style={styles.sectionTitle}>Puerta 3</Text>
              <View style={styles.alarmContainer}>
                <Text style={styles.sectionTitle}>Alarma</Text>
                <TouchableOpacity style={styles.button} onPress={apagarAlarma}>
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={encenderAlarma}>
                  <Text style={styles.buttonText}>Encender</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 3', 'Abrir')}>
                <Text style={styles.buttonText}>Abrir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => togglePuerta('Puerta 3', 'Cerrar')}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
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
    backgroundColor:"#c4c8c7"
  },
  alarmContainer: {
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 5,
    paddingBottom:3,
    paddingTop:3,
    paddingLeft:2,
    paddingRight:3,
    marginBottom: 10,
  },
  doorContainer: {
    justifyContent: 'space-between', // Para distribuir los doorWrapper horizontalmente
  },
  doorWrapper: {
    marginBottom:20,
    borderWidth: 5,
    borderRadius:15
  },
  doorSection: {
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#243542',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cca5a2',
    textAlign: 'center',
  },
});

export default Dispositivo;
