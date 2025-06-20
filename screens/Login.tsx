import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof schema>;

export default function Login({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    const loginData = {
      name: data.username,
      email: `${data.username}@example.com`,
      phone: '123-456-7890',
      website: 'example.com',
    };
    navigation.replace('MainTabs', { loginData });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          {/* Username Field */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                autoCapitalize="none"
              />
            )}
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                style={styles.input}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <View style={styles.buttonWrapper}>
            <Button title="Login" onPress={handleSubmit(onSubmit)} color="#2196F3" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
