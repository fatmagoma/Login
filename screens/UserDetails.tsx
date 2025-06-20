import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function UserDetailsScreen({ route }: any) {
  const { id } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
    </View>
  );
}
