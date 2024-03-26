import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
 } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Enviar datos a la API
    fetch('http://192.168.1.8:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(email)
        console.log(password)


        // Verificar la respuesta de la API
        if (data.id) {
        setEmail("");
        setPassword("");
       
          // Si la respuesta es correcta, mostrar un Alert y navegar a la pantalla "Principal"
          Alert.alert('¡Inicio de sesión exitoso!', '¡Bienvenido!');
          navigation.navigate('Principal'); // Ajusta el nombre de la pantalla según corresponda
        } else {
          // Si la respuesta no es correcta, mostrar un Alert con el mensaje de error
          Alert.alert('Error', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <View style={styles.contenido}>
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType='email-address'
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#ece6ea',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#151517',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 10,
    textTransform:'uppercase',

  },
  input: {
    backgroundColor: '#959ac0',
    padding: 15,
    borderRadius: 10,
    color: '#0d1323',
    marginBottom: 20,
    width: '80%',
    fontSize:15,
    textAlign:'center',

    
  },
  button: {
    backgroundColor: '#0d1323',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ebd7be',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:25,
  },
});


export default LoginForm;
