/**
 * essential imports
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * ui imports
 */
import Logo from '../assets/logo.svg';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
/**
 * function jsx
 */
import { connect } from 'react-redux';
import RestDialogBox from '../components/RestDialogBox';
import { login } from '../actions/auth/authAction';



function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grandType, setGrandType] = useState('password')

    const SignInClick = () => {
        let userDetails = {
            email: email,
            password: password,
            grantType: grandType
        }
        props.login(userDetails)
    }

    // const callApi = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('username', email)
    //         formData.append('password', password)
    //         formData.append('grantType', 'password')

    //         fetch('https://custom-demo.net/rapid_laundry_dev/v1/login', {
    //             method: 'post',
    //             headers: {
    //                 Accept: 'multipart/form-data',
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             body: formData
    //         })
    //             .then(response => response.json())
    //             .then(async (response) => {
    //                 console.log(response)
    //                 try {
    //                     await AsyncStorage.setItem('Token', response.accessToken)
    //                 } catch (e) {
    //                     console.log('error token', e)
    //                 }
    //             }).catch(err => {
    //                 console.log(err)
    //             })

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.ScrollContainer}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            <View style={styles.TextInputContainer}>
                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder="Email"
                    keyboardType='email-address'
                    onChangeText={(value) => setEmail(value)}
                    style={styles.TextInputStyle}
                    value={email}
                />
                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.TextInputStyle}
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => SignInClick()}>
                    <Button text={"Login"} />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>Create Account: <Text onPress={() => { props.navigation.navigate("SignUp") }} style={styles.SubTextStyle}>Signup</Text>.</Text>
                <Text style={styles.TextStyle}>By clicking an account you agree to <Text style={styles.SubTextStyle}>Terms Conditions</Text> and <Text style={styles.SubTextStyle}>Privacy Policy</Text>.</Text>
            </View>
            <RestDialogBox />
        </ScrollView>
    )
};

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(login(payload)),
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
/**
 * style sheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    ScrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between"
    },
    LogoContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20
    },
    TextInputContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 100
    },
    ButtonContainer: {
        flex: 0.75,
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
    },
    TextInputStyle: {
        width: wp('90%'),
        fontSize: 15,
        fontFamily: "Poppins-Regular",
        color: color.primary,
        paddingLeft: 20,
        backgroundColor: color.primaryLighter,
        height: 57,
        borderRadius: 10,
        marginVertical: 10
    }
});