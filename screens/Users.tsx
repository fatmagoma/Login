// screens/Users.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function Users({ navigation, route }: any) {
  const [users, setUsers] = useState([]);
  const loginData = route.params?.loginData;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        if (loginData) {
          const userWithId = { ...loginData, id: 9999 }; 
          setUsers([userWithId, ...data]);
        } else {
          setUsers(data);
        }
      });
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { id: item.id })}>
          <Text style={{ padding: 15, borderBottomWidth: 1 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
