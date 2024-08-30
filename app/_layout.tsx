import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
