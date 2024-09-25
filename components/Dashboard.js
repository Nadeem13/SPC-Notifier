import React, { useState, useEffect } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FirstTabScene, SecondTabScene } from './TabScenes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const [departmentName, setDepartmentName] = useState('Physics');

  const scenes = [
    { key: 'first', title: `Department\n(${departmentName})`, component: FirstTabScene },
    { key: 'second', title: 'General', component: SecondTabScene },
  ];

  const renderScene = SceneMap({
    first: FirstTabScene,
    second: SecondTabScene,
  });

  useEffect(() => {
    const fetchDepartmentName = async () => {
      try {
        const storedDepartmentString = await AsyncStorage.getItem('department');
        const storedDepartment = JSON.parse(storedDepartmentString);
        const departmentNameFromStorage = storedDepartment.name;
        if (departmentNameFromStorage) {
          setDepartmentName(departmentNameFromStorage);
        }
      } catch (error) {
        console.error('Error fetching department name from AsyncStorage:', error);
      }
    };

    fetchDepartmentName();
  }, []);

  return (
    <TabView
      navigationState={{ index, routes: scenes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
};

export default Dashboard;
