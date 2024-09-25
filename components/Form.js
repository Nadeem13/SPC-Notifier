import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('Select Department');
  const { showToast, departments } = route.params;

  const handleShowToast = (icon, txt1, message) => {
    showToast(icon, txt1, message);
  };

  useEffect(() => {

    AsyncStorage.getItem('username')
      .then((storedUsername) => {
        if (storedUsername) {
          navigation.navigate('Dashboard');
        }
      })
      .catch((error) => {
        console.error('Error checking AsyncStorage:', error);
      });
  }, []);

  const handleSubmit = async () => {
    const storedDepartmentString = await AsyncStorage.getItem('department');
    const storedUsername = await AsyncStorage.getItem('username');
    const isUsernameTaken = storedDepartmentString !== null;

    if (isUsernameTaken) {
      handleShowToast("error", storedUsername, `You are already logged in!`);
      navigation.navigate('Dashboard');
    } else {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('department', JSON.stringify(department));
        handleShowToast("success", username, `You are welcome to SPC Notifier`);
        navigation.navigate('Dashboard');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Department</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={department} onValueChange={(value) => setDepartment(value)}>
          {departments.map((dept) => (
            <Picker.Item key={dept.id} label={dept.name} value={dept} />
          ))}
        </Picker>
      </View>

      <Button title="Proceed" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
    padding: 10,
  },
});

export default Form;
