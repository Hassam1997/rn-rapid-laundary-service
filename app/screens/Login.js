/**
 * essential imports
 */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, AppState } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
/**
 * ui imports
 */
import Logo from '../assets/logo.svg';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
import Clipboard from '@react-native-clipboard/clipboard';
import BackgroundTimer from 'react-native-background-timer';
/**
 * function jsx
 */







function Login(props) {

    const [isText, setText] = useState('')





    // let interval = null;
    // useEffect(() => {
    //     const focusListener = props.navigation.addListener('focus', () => {
    //         BackgroundTimer.runBackgroundTimer(() => {
    //             str()
    //         }, 3000);
    //     })
    //     return () => {
    //         focusListener()
    //         BackgroundTimer.stopBackgroundTimer();
    //     }
    // }, [])


    const str = async () => {
        const text = await Clipboard.getString();
        setText(text)
    }
    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            {/* <Text>{isText}</Text> */}
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("SignIn") }}>
                    <Button text={"Login"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.navigation.navigate("SignUp") }}>
                    <Button text={"Signup"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button text={"Connect With Gmail"} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button text={"Connect With Facebook"} />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>By clicking an account you agree to <Text style={styles.SubTextStyle}>Terms Conditions</Text> and <Text style={styles.SubTextStyle}>Privacy Policy</Text>.</Text>
            </View>
        </View>
    )
};
export default Login;
/**
 * style sheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    LogoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20
    },
    ButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    TextStyle: {
        color: color.palette.black,
        fontFamily: "Poppins-Regular",
        fontSize: 13,
        textAlign: "center",
        width: 300
    },
    SubTextStyle: {
        color: color.palette.blue,
        textDecorationLine: "underline",
    }
});