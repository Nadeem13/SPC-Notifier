import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function DepartmentList({ onDepartmentsFetched }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://system.spcollege.edu.in/api/v1/public/departments')
      .then((response) => response.json())
      .then((data) => {
        const departmentsData = data.data.map((category) => category.departments);
        const flattenedDepartments = [].concat(...departmentsData);
        onDepartmentsFetched(flattenedDepartments);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onDepartmentsFetched]);

  return (
    <View>
      {loading ? (
        <Text>Loading departments...</Text>
      ) : null}
    </View>
  );
}
