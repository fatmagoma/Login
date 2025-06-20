import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((res) => res.json())
      .then(setAlbums);
  }, []);

  return (
    <FlatList
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={{ padding: 15, borderBottomWidth: 1 }}>{item.title}</Text>
      )}
    />
  );
}
