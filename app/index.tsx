import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import tw from "twrnc";

const Index = () => {
  return (
    <View style={tw`flex-1 justify-center items-center p-5 bg-indigo-100`}>
      <View style={tw`w-3/4 bg-indigo-200 p-10 rounded-2xl shadow`}>
        <Text
          style={tw`text-2xl mb-2 italic font-bold  text-indigo-800 text-center`}
        >
          Welcome
        </Text>
        <Text
          style={tw`text-2xl mb-2 italic font-bold text-indigo-800 text-center`}
        >
          to
        </Text>
        <Text
          style={tw`text-2xl mb-8 italic font-bold text-indigo-800 text-center`}
        >
          ListGrocery
        </Text>
        <View style={tw`w-full mb-3`}>
          <TouchableOpacity
            style={tw`w-full bg-indigo-600 p-3 rounded-lg`}
            onPress={() => {
              router.replace("/signup");
            }}
          >
            <Text style={tw`text-white text-center font-bold`}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full mb-3`}>
          <TouchableOpacity
            style={tw`w-full bg-indigo-600 p-3 rounded-lg`}
            onPress={() => {
              router.replace("/login");
            }}
          >
            <Text style={tw`text-white text-center font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Index;
