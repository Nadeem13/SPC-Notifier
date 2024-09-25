import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const MyRecyclerView2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = '74743324-f62c-419a-9e20-e209268ec270';

        const response = await fetch(
          `https://system.spcollege.edu.in/api/v1/get-news-notifications?IsNotice=true&departmentId=${id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        const newsData = result.data.map((item) => ({
          id: item.id,
          title: item.title,
          createdDate: item.createdDate,
          slug: item.slug,
          fileLink: item.fileLink,
        }));

        setData(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardPress = (item) => {
    console.log(`Card with ID ${item.id} pressed`);
  };

  const shareFile = async (localFileUri) => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(localFileUri);
      } else {
        console.log('Sharing is not available on this platform.');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleShareFile = async (item) => {
    try {
      const localURI = FileSystem.documentDirectory + item.title + '.pdf';
      const downloadResult = await FileSystem.downloadAsync(
        'https://system.spcollege.edu.in/notifications/' + item.fileLink,
        localURI
      );

      if (downloadResult.status === 200) {
        console.log('File downloaded to: ' + downloadResult.uri);
        shareFile(downloadResult.uri);
      } else {
        console.error('Download failed with status ' + downloadResult.status);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownloadFile = async (item) => {
    try {
      const localURI = FileSystem.documentDirectory + item.title + '.pdf';

      const downloadResult = await FileSystem.downloadAsync(
        'https://system.spcollege.edu.in/notifications/' + item.fileLink,
        localURI
      );

      if (downloadResult.status === 200) {
        console.log('File downloaded to: ' + downloadResult.uri);
        console.log('Local file URI:', localURI);
      } else {
        console.error('Download failed with status ' + downloadResult.status);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const renderItem = ({ item }) => (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="rgba(0, 0, 0, 0.1)"
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.item}>
        <Card>
          <Card.Title title={item.title} />

          <Card.Content>
            <Text>{item.createdDate}</Text>
          </Card.Content>

          <Card.Content>
            <Text>{item.slug}</Text>
          </Card.Content>

          <Card.Actions>
            <IconButton icon="share" onPress={() => handleShareFile(item)} />
            <IconButton icon="download" onPress={() => handleDownloadFile(item)} />
          </Card.Actions>
        </Card>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 5,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#F00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
  },
});

export default MyRecyclerView2;
