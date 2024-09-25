import React from 'react';
import { View, Text } from 'react-native';
import MyRecyclerView from './MyRecyclerView';
import MyRecyclerView2 from './MyRecyclerView2';

const FirstTabScene = () => (
   <View style={{ flex: 1}}>
         <MyRecyclerView />
   </View>
);

const SecondTabScene = () => (
  <View style={{ flex: 1}}>
         <MyRecyclerView2 />
   </View>
);

export { FirstTabScene, SecondTabScene };