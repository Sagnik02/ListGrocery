import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { useState } from "react";
import Task from "./components/Task";

export default function Index() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 bg-purple-100`}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={tw`text-3xl mt-20 text-center font-bold`}>
            Today's Grocery List
          </Text>
          <View style={tw`ml-10`}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={tw`flex-row justify-around p-6 ml-3 mb-1`}>
          <View style={tw`bg-slate-400 px-3 py-1 w-70 mr-10 rounded-xl`}>
            <TextInput
              placeholder="Enter Grocery Item"
              style={tw`text-lg font-bold mt-2`}
              value={task}
              onChangeText={(text) => setTask(text)}
            />
          </View>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={tw`bg-zinc-500 p-1.5 w-12 rounded-full mr-2`}>
              <Text style={tw`text-3xl ml-2.5 mb-1 `}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
