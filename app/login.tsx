import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import tw from "twrnc";
import { auth } from "../configs/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);

      // Store user session data in AsyncStorage
      await AsyncStorage.setItem(
        "userSession",
        JSON.stringify({ email: user.email })
      );

      // Redirect to the main page
      router.replace("/main");
    } catch (error) {
      Alert.alert("Please enter the correct email or password");
    }
  };

  return (
    <ScrollView style={tw` flex-1 bg-indigo-100`}>
      <View style={tw`mt-[30%]`}>
        <Text style={tw`text-center text-3xl text-indigo-800 font-bold`}>
          Welcome to ListGrocery
        </Text>
      </View>
      <View style={tw`flex justify-center items-center mt-[30%]`}>
        <View
          style={tw`w-full max-w-sm bg-indigo-200 p-6 rounded-lg shadow-2xl w-10/12`}
        >
          <Text style={tw`text-2xl font-bold text-center mb-6 text-indigo-800`}>
            Login
          </Text>
          <TextInput
            style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="black"
          />
          <TextInput
            style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="black"
          />
          <TouchableOpacity
            style={tw`w-full bg-indigo-800 p-3 rounded-lg`}
            onPress={handleSignin}
          >
            <Text style={tw`text-white text-center font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
