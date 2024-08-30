import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
interface TaskProps {
  text: string;
}

export default function Task(props: TaskProps) {
  return (
    <View style={tw` flex-row bg-white rounded-2xl p-3 mr-10 mt-5`}>
      <View style={tw`bg-blue-300 h-6 w-6 mt-1 rounded-full`}></View>
      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`ml-1 text-lg`}>{props.text}</Text>
      </View>
    </View>
  );
}
//
