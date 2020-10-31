import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const StartScreen = ({navigation}) => {
    let progress = new Animated.Value(0);
    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.containerElements}>
                <View style={styles.flexOnly}>
                    <LottieView onAnimationFinish={() => navigation.replace("Home")} loop={false} autoPlay={true} source={require('../assets/githubLogo.json')} progress={progress} />
                </View>
                <View style={styles.flexOnly}>
                    <Text style={styles.LogoText}>Github Finder</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerElements: {
        flex: 1,
        
    },
    flexOnly: {
        flex: 1,
        alignItems: "center"
    },
    LogoText: {
        fontWeight: "bold",
        fontFamily: "monospace",
        fontSize: 25
    }
})

export {StartScreen}