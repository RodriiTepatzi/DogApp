import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchRandomDog();
  }, []);

  const fetchRandomDog = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setImage(data.message);
    await AsyncStorage.setItem('dogImage', data.message);
  };

  const deleteImage = async () => {
    setImage('');
    await AsyncStorage.removeItem('dogImage');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSeparator}>
        <Text style={styles.title}>Bienvenido a la app de perros!</Text>
        {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchRandomDog}>
        <Text style={styles.buttonText}>Generar otra imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteImage}>
        <Text style={styles.buttonText}>Eliminar imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Subir imagen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCF5FF',
    alignItems: 'center',
  },
  containerSeparator:{
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    borderBottomRightRadius: '30',
    borderBottomLeftRadius: '30',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: +2
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20
  },  
  button: {
    width: '90%',
    alignItems: 'center',
    borderRadius: '10',
    backgroundColor: '#215192',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  }
});
