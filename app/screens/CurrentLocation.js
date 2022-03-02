/**
 * essential imports
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { NavigationContainer } from '@react-navigation/native';





Geocoder.fallbackToGoogle('AIzaSyBaw7psjNT6a7Zo91LpAgoiTZqYddZUnb4');





function CurrentLocation({ props, navigation }) {

    const [isLat, setLat] = useState(null)
    const [isLng, setLng] = useState(null)


    const location = async () => {
        // var NY = {
        //     lat: 40.7809261,
        //     lng: -73.9637594
        // };


        let myLocation = Geolocation.getCurrentPosition(data => {
            // console.log(data.coords)
            setLat(data.coords.latitude)
            setLng(data.coords.longitude)
        })

        var lat = isLat;
        var lng = isLng;

        let ret = await Geocoder.geocodePosition({ lat, lng })
        //    navigation.navigate('UserAddress', {otherParam: ret})
        //   let ret = await Geocoder.geocodePosition({lat,lng})
        console.log(ret[0].formattedAddress)


            , navigation.navigate('UserAddress', { otherParam: ret[0].formattedAddress, latitude: lat, longitude: lng })



    }




    /**
     * function expression and dynamic stats
     */
    const [isToggle, setToggle] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>

            <Text style={styles.HeadingText}>Welcome to Rapid!</Text>
            <Text style={styles.TextStyle}>Lets check to see if we service in your area.</Text>
            <Text style={styles.SubTextStyle}>Should we use your current location?</Text>
            <View style={styles.TextInputContainer}>
                <TouchableOpacity onPress={() => setToggle(false)}
                    style={{
                        width: wp("40%"),
                        height: 57,
                        backgroundColor: (isToggle === false) ? color.primary : color.palette.lightgray,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                    }}><Text style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 15,
                        color: (isToggle === false) ? color.palette.white : color.dim
                    }}>Yes</Text></TouchableOpacity>
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
                <TouchableOpacity onPress={() => { location() }}>
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