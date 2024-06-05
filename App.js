import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/Login/Login';
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import{ NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Screens/Navigations/TabNavigation';
import RootNavigation from './App/Screens/Navigations/RootNavigation';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_Z3JlYXQtZG9ua2V5LTI5LmNsZXJrLmFjY291bnRzLmRldiQ">
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login/>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
