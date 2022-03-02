/**
 * essential imports
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * ui imports
 */
import HomeBg from '../assets/homeBg.svg';
import Entypo from 'react-native-vector-icons/Entypo';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
/**
 * function jsx
 */
function Explore(props) {
    const [isToggle, setToggle] = useState(false)
    const [place , setPlace] = useState('')

    const locationadd = async () => {
        
        const address = await AsyncStorage.getItem('@address')

        setPlace(address)
        
        // console.log('hsadjasjda')
    }
    /**
     * function expression and dynamic stats
     */
    

    useEffect(()=>{
        locationadd()
    })

    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
            </View>
            <Text style={styles.HeadingText}>Place A New Order</Text>
            <View style={styles.TextInputContainer}>
                <View style={styles.AdrressViewStyle}>
                    <Entypo name="location-pin" color={color.primary} size={25} />
                    <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={styles.AdrressTextStyle}>{place}</Text>
                </View>
                <HomeBg />
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity >
                    <View style={styles.TimeViewStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={styles.TimeTextStyle}>Today : 4Pm - 7Pm</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.TimeViewStyle}>
                    <Text onPress={() => { props.navigation.navigate("CustomizeOrder") }}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.TimeTextStyle}>Explore Other Times</Text>
                </View>
                <Text style={styles.TextStyle}>When Will My Order Be Ready</Text>
            </View>
        </View>
    )
};
export default Explore;
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
        flex: 1.5,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    AdrressViewStyle: {
        width: wp("90%"),
        height: 57,
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        backgroundColor: color.primaryLighter,
        borderRadius: 10
    },
    AdrressTextStyle: {
        fontSize: 15,
        color: color.primary,
        fontFamily: "Poppins-Regular",
        width: wp("80%"),
    },
    TimeViewStyle: {
        width: wp("90%"),
        height: 57,
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: color.primaryLighter,
        borderRadius: 10
    },
    TimeTextStyle: {
        fontSize: 15,
        color: color.primary,
        fontFamily: "Poppins-Regular",
        textAlign: "center"
    },
    ButtonContainer: {
        flex: 0.75,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    TextStyle: {
        color: "#7A8DA4",
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        textAlign: "center",
        marginVertical: 10
    },
});