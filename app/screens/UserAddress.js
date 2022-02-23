/**
 * essential imports
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
/**
 * ui imports
 */
import Logo from '../assets/logo.svg';
import Entypo from 'react-native-vector-icons/Entypo';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
/**
 * function jsx
 */

import CurrentLocation from './CurrentLocation';


import AsyncStorage from '@react-native-async-storage/async-storage';




function UserAddress({ route, navigation }) {
    /**
     * function expression and dynamic stats
     */
    const [isToggle, setToggle] = useState(false)
    const { otherParam, latitude,longitude } = route.params;


    
    // useEffect(()=>{
    //     var lat = latitude;
    //     var lng = longitude;

    //    let ret = await Geocoder.geocodePosition({ lat, lng })
    //     console.log(ret[0].formattedAddress)
    // })

    const setLocation = async () => {
        try {
            await AsyncStorage.setItem('@address', otherParam);


            navigation.navigate("PickUpLocation", { UserAdress: otherParam, latitude:latitude, longitude:longitude })

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            <Text style={styles.HeadingText}>Woohoo!</Text>
            <Text style={styles.HeadingText}>Moving Right Along!</Text>
            <View style={styles.TextInputContainer}>
                <View style={styles.AdrressViewStyle}>
                    <Entypo name="location-pin" color={color.dim} size={20} />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.AdrressTextStyle}>{otherParam}</Text>
                </View>
                <TextInput
                    placeholderTextColor={color.palette.blue}
                    placeholder="Enter Apt, Floor, Etc. (Optional)"
                    style={styles.TextInputStyle}
                />
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => setLocation()}>
                    <Button text={"Continue"} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default UserAddress;
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
        paddingVertical: 20
    },
    HeadingText: {
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        color: color.dim,
        width: wp("90%"),
        alignSelf: "center",
    },
    TextInputContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    AdrressViewStyle: {
        width: wp("90%"),
        height: 57,
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        backgroundColor: color.palette.lightgray,
        borderRadius: 10
    },
    AdrressTextStyle: {
        fontSize: 12,
        color: color.dim,
        fontFamily: "Poppins-Regular",
        width: wp("80%"),
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
    },
});