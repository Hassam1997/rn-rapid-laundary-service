/**
 * essential imports
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Geocoder from 'react-native-geocoder';
Geocoder.fallbackToGoogle('AIzaSyBaw7psjNT6a7Zo91LpAgoiTZqYddZUnb4');
import { connect } from 'react-redux';
import RestDialogBox from '../components/RestDialogBox';
import { getsignup } from '../actions/auth/authAction';
import { getData } from '../actions/auth/constants';
/**
 * function jsx
 */
function PickUpLocation(props) {
    /**
     * function expression and dynamic stats
     */
    const [isToggle, setToggle] = useState(false)
    const [isAddress, setAddress] = useState("")
    const [isLat, setLat] = useState(props.route.params.latitude ?? "")
    const [isLng, setLng] = useState(props.route.params.longitude ?? "")
    const { address } = props.route.params ?? ""

    useEffect(() => {
        if (props.route.params.address) {
            setAddress(address)
        } else {
            userAddress(isLat, isLng)
        }
    }, [address])

    const userAddress = async (lat, lng) => {
        let res = await Geocoder.geocodePosition({ lat, lng })
        let add = (res[0].formattedAddress)
        console.log(add)
        setAddress(add)
    }

    const SignUpClick = async () => {
        const firstName = await getData("@firstName")
        const lastName = await getData("@lastName");
        const phone = await getData("@phone");
        const email = await getData("@email");
        const password = await getData("@password");
        let userDetails = {
            username: email,
            number: phone,
            password: password,
            firstname: firstName,
            lastname: lastName,
            address: isAddress
        }
        props.getsignup(userDetails)
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
            <View>
                <View style={styles.LogoContainer}>
                    <Logo />
                </View>
                <Text style={styles.HeadingText}>Where are we picking up your order?</Text>
                <View style={styles.TextInputContainer}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Map') }}>
                        <View style={styles.TextInputStyle}>
                            <Image source={require('../assets/location.png')} />
                            <Text style={{ paddingHorizontal: 10 }}>{isAddress ?? "Add Address"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        placeholderTextColor={color.palette.blue}
                        placeholder="Enter Apt, Floor, Etc. (Optional)"
                        style={styles.TextInputStyle}
                    />
                </View>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => SignUpClick()}>
                    <Button text={"Continue"} />
                </TouchableOpacity>
            </View>
            <RestDialogBox />
        </ScrollView>
    )
};
const mapStateToProps = state => ({
    auth: state.auth,
    // rest: state.rest,
    // service: state.service.services
});

const mapDispatchToProps = dispatch => ({
    getsignup: (payload) => dispatch(getsignup(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PickUpLocation)
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
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ButtonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 30
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