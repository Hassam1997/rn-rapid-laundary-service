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
import { storeData } from '../actions/auth/constants';
/**
 * function jsx
 */
function SignUp(props) {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const setData = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (FirstName.length == 0) {
            Alert.alert('Error!', 'please enter your first name')
            return;
        } else if (LastName.length == 0) {
            Alert.alert('Error!', 'please enter your Last name')
            return;
        } else if (Phone.length == 0) {
            Alert.alert('Error!', 'please enter your Phone Number')
            return;
        } else if (reg.test(Email) === false) {
            Alert.alert('Error!', 'please enter your Email')
        } else if (Password.length <= 6) {
            Alert.alert('Error!', 'Password must be minimum 7 characters')
        }
        else {
            try {
                await storeData('@firstName', FirstName);
                await storeData('@lastName', LastName);
                await storeData('@phone', Phone);
                await storeData('@email', Email);
                await storeData('@password', Password);
                navigation.navigate('CurrentLocation')
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.ScrollContainer}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            <Text style={styles.HeadingText}>Join us now!</Text>
            <View style={styles.TextInputContainer}>
                <View style={{ flexDirection: 'row', width: wp('90%'), justifyContent: 'space-between' }}>
                    <TextInput
                        placeholderTextColor={color.palette.blue}
                        placeholder="First name"
                        style={{
                            width: wp('43%'),
                            fontSize: 15,
                            fontFamily: "Poppins-Regular",
                            color: color.primary,
                            paddingLeft: 20,
                            backgroundColor: color.primaryLighter,
                            height: 57,
                            borderRadius: 10,
                            marginVertical: 10
                        }}
                        onChangeText={(value) => setFirstName(value)}
                    />

                    <TextInput
                        placeholderTextColor={color.palette.blue}
                        placeholder="Last name"
                        onChangeText={(value) => setLastName(value)}
                        style={{
                            width: wp('43%'),
                            fontSize: 15,
                            fontFamily: "Poppins-Regular",
                            color: color.primary,
                            paddingLeft: 20,
                            backgroundColor: color.primaryLighter,
                            height: 57,
                            borderRadius: 10,
                            marginVertical: 10
                        }}
                    >

                    </TextInput>
                </View>

                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder={'phone number'}
                    keyboardType='number-pad'
                    style={styles.TextInputStyle}
                    onChangeText={(value) => setPhone(value)}
                />
                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder="Email"
                    keyboardType='email-address'
                    style={styles.TextInputStyle}
                    onChangeText={(value) => setEmail(value)}

                />
                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.TextInputStyle}
                    onChangeText={(value) => setPassword(value)}

                />
            </View>

            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => setData()}>
                    <Button text={"Submit"} />
                </TouchableOpacity>
                <Text style={styles.TextStyle}>Already Have Account: <Text onPress={() => { props.navigation.navigate("SignIn") }} style={styles.SubTextStyle}>Login</Text>.</Text>
                <Text style={styles.TextStyle}>By clicking an account you agree to <Text style={styles.SubTextStyle}>Terms Conditions</Text> and <Text style={styles.SubTextStyle}>Privacy Policy</Text>.</Text>
            </View>
        </ScrollView>
    )
};
export default SignUp;
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
    HeadingText: {
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        color: color.dim,
        width: wp("90%"),
        alignSelf: "center",
        paddingTop: 20
    },
    TextInputContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
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