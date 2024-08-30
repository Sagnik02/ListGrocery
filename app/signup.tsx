import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Add user info to Firestore
        await addDoc(collection(db, "ListGroceryDB"), {
          name: name,
          email: email,
          listItems: [],
          createdAt: new Date(),
        });

        console.log("User added to Firestore:", user);

        // Redirect to login or home page
        router.replace("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={tw`flex-1 bg-indigo-100 justify-center items-center`}>
      <View style={tw`mb-10`}>
        <Text style={tw`text-4xl font-bold italic text-indigo-800`}>
          ListGrocery
        </Text>
      </View>
      <View
        style={tw`flex justify-center p-6 bg-indigo-200 w-10/12 rounded-xl shadow-xl`}
      >
        <Text style={tw`text-2xl font-bold mb-6 text-center text-indigo-800`}>
          Sign Up
        </Text>

        <TextInput
          style={tw`h-12 border border-gray-300 rounded-md p-3 mb-4 border-purple-400`}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="black"
        />

        <TextInput
          style={tw`h-12 border border-gray-300 rounded-md p-3 mb-4 border-purple-400`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="black"
        />

        <TextInput
          style={tw`h-12 border border-gray-300 rounded-md p-3 mb-6 border-purple-400`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="black"
        />

        <Button title="Sign Up" onPress={handleSignup} color="#3730a3" />

        <View style={tw`mt-4`}>
          <Text style={tw`text-center text-gray-700`}>
            Already have an account?
          </Text>
          <Button
            title="Log In"
            onPress={() => {
              router.replace("/login");
            }}
            color="#3730a3"
          />
        </View>
      </View>
    </View>
  );
};

export default Signup;
