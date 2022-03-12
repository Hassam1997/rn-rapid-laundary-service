/**
 * essential imports
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, PermissionsAndroid } from 'react-native';
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
import Geolocation from 'react-native-geolocation-service';
/**
 * function jsx
 */
function CurrentLocation(props) {

    const [isLat, setLat] = useState(null)
    const [isLng, setLng] = useState(null)
    const [isToggle, setToggle] = useState(true)

    const UserLocation = async (toggle) => {
        console.log(toggle)
        setToggle(toggle)
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        console.log(granted)
        if (granted != 'denied') {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    setLat(position.coords.latitude)
                    setLng(position.coords.longitude)
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            setToggle(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            <Text style={styles.HeadingText}>Welcome to Rapid!</Text>
            <Text style={styles.TextStyle}>Lets check to see if we service in your area.</Text>
            <Text style={styles.SubTextStyle}>Should we use your current location?</Text>
            <View style={styles.TextInputContainer}>
                <TouchableOpacity onPress={(text) => { UserLocation(false) }}
                    style={{
                        width: wp("40%"),
                        height: 57,
                        backgroundColor: (isToggle === false) ? color.primary : color.palette.lightgray,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 15,
                        color: (isToggle === false) ? color.palette.white : color.dim
                    }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setToggle(true)}
                    style={{
                        width: wp("40%"),
                        height: 57,
                        backgroundColor: (isToggle == true) ? color.primary : color.palette.lightgray,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                    }}><Text style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 15,
                        color: (isToggle == true) ? color.palette.white : color.dim
                    }}>No</Text></TouchableOpacity>

            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => { (isToggle == false) ? props.navigation.navigate("PickUpLocation", {latitude: isLat, longitude: isLng}) : props.navigation.navigate("Map") }}>
                    <Button text={"Continue"} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default CurrentLocation;
/**
 * style sheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
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
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'space-evenly',
    },
    ButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    TextStyle: {
        color: color.dim,
        fontFamily: "Poppins-Light",
        fontSize: 16,
        width: 280,
        left: 20,
        marginVertical: 10
    },
    SubTextStyle: {
        color: color.dim,
        textAlign: "center",
        fontFamily: "Poppins-Light",
        fontSize: 14,
        marginVertical: 10
    }
});