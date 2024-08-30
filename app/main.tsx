import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { db } from "../configs/FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import tw from "twrnc";
import { useState, useEffect } from "react";
import Task from "./components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing icons

export default function Index() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await AsyncStorage.getItem("userSession");
        if (session) {
          const userSession = JSON.parse(session);
          setEmail(userSession.email);

          const q = query(
            collection(db, "ListGroceryDB"),
            where("email", "==", userSession.email)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setTaskItems(userDoc.listItems || []);
          } else {
            Alert.alert("No tasks found for this user.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userSession");
      router.replace("/login");
      Alert.alert("Logged out successfully.");
      setEmail(null);
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Failed to log out.");
    }
  };

  const handleAddTask = async () => {
    if (!email) {
      Alert.alert("User email not found.");
      return;
    }

    Keyboard.dismiss();
    const updatedTasks = [...taskItems, task];
    setTaskItems(updatedTasks);
    setTask("");

    const q = query(
      collection(db, "ListGroceryDB"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, { listItems: updatedTasks });
    } else {
      Alert.alert("User document not found.");
    }
  };

  const completeTask = async (index: number) => {
    const updatedTasks = [...taskItems];
    updatedTasks.splice(index, 1);
    setTaskItems(updatedTasks);

    if (!email) {
      Alert.alert("User email not found.");
      return;
    }

    const q = query(
      collection(db, "ListGroceryDB"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, { listItems: updatedTasks });
    } else {
      Alert.alert("User document not found.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 bg-purple-100`}>
        {/* Top Bar with three-dot menu */}
        <View
          style={tw`flex-row justify-between items-end px-4 py-3 bg-purple-200 h-25`}
        >
          <Text style={tw`text-3xl font-bold text-purple-700`}>
            Grocery List
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={tw`ml-10`}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            ))}
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
          <TouchableOpacity onPress={handleAddTask}>
            <View style={tw`bg-zinc-500 p-1.5 w-12 rounded-full mr-2`}>
              <Text style={tw`text-3xl ml-2.5 mb-1 `}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal for Logout */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-4 rounded-t-xl`}>
              <TouchableOpacity
                onPress={handleLogout}
                style={tw`bg-red-500 p-4 rounded-full`}
              >
                <Text style={tw`text-center text-white text-lg font-bold`}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`mt-4 p-2`}
              >
                <Text style={tw`text-center text-gray-600`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
