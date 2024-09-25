import React, { useState, forwardRef } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import DepartmentList from './components/DepartmentList';

const Stack = createStackNavigator();

const ToastComponent = forwardRef((props, ref) => {
  return <Toast style={{ zIndex: 1 }} ref={ref} />;
});

function App() {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDepartmentsFetched = (data) => {
    setDepartmentData(data);
    setLoading(false);
  };

  const showToast = (icon, txt1, message) => {
    Toast.show({
      type: icon,
      position: 'bottom',
      text1: txt1,
      text2: message,
      visibilityTime: 3000,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Form"
              component={Form}
              initialParams={{ showToast: showToast, departments: departmentData }}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <ToastComponent ref={(ref) => Toast.setRef(ref)} />
      <DepartmentList onDepartmentsFetched={handleDepartmentsFetched} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
