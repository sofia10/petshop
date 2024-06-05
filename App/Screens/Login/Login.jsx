import { Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../../assets/Colors';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View style = {styles.backgroundContainer}>
            <Image source = {require('../../../assets/images/molly.jpg')} resizeMode = 'cover' style = {styles.backdrop} />
        </View>
        <View style = {styles.overlay}>
            <Text style={styles.title}>Healthy And Happy Pets</Text>
            <Text style={styles.subtitle}>Welcome to online pet store</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <View style={styles.iconWrapper}>
                    <FontAwesome name="google" size={24} color="#fff" />
                </View>
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      backdrop: {
        height: '70%',
        width: '100%',
      },
      overlay: {
        height: '55%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        backgroundColor: Colors.WHITE,
        paddingTop: 100,
        paddingHorizontal: 30,
        display: 'flex',
        alignItems: 'center',
      },
      title: {
        fontFamily: 'Outfit-Bold',
        fontSize: 28,
        textAlign: 'center',
        color: Colors.BLACK
      },
      subtitle: {
        fontFamily: 'Outfit',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 40,
        color: Colors.BLACK
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLUEFB,
        borderRadius: 10,
        height: 50,
        position: 'absolute',
        bottom: 60,
        width: 300,
        alignSelf: 'center',
      },
      iconWrapper: {
        position: 'absolute',
        left: 15,
      },
      buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: 'Outfit-Medium',
      },
})