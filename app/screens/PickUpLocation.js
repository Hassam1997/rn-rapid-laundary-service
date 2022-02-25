/**
 * essential imports
 */
import React, { useState } from 'react';
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
/**
 * function jsx
 */




const postUser = async () => {

    try {
        let val = {
            name: await AsyncStorage.getItem('@firstName'),
            lastName: await AsyncStorage.getItem('@lastName'),
            phone: await AsyncStorage.getItem('@phone'),
            email: await AsyncStorage.getItem('@email'),
            password: await AsyncStorage.getItem('@password'),
            address: await AsyncStorage.getItem('@address')
        }

        const formData = new FormData();



        formData.append('username', val.email)
        formData.append("password", val.password)
        formData.append("firstname", val.name)
        formData.append("lastname", val.lastName)
        formData.append("city", 'New York')
        formData.append("country", 'United State')
        formData.append("address", val.address)
        formData.append("mobile", val.phone)

        // formData.append('username', 'davidpurpl2@gmail.com')
        // formData.append("password", 'udsanudsa')
        // formData.append("firstname", 'david')
        // formData.append("lastname", 'purple22')
        // formData.append("city", 'karachi')
        // formData.append("country", 'united state')
        // formData.append("address", 'street 72 pinkavenue')
        // formData.append("mobile", '021 231 2314')

        console.log(formData)


        fetch('https://custom-demo.net/rapid_laundry_dev/v1/signup', {
            method: 'post',
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then(response => response.json())
            .then(async (response) => {

                console.log(response)


                await AsyncStorage.setItem('Token', response.accessToken)


            })





            .catch(err => {
                console.log(err)
            })



        // const headers = {
        //     Accept: 'multipart/form-data',
        //     'Content-Type': 'multipart/form-data',
        // }
        // axios({
        //     method: "post",
        //     url: "https://custom-demo.net/rapid_laundry_dev/v1/signup",
        //     data: formData,
        //     headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}`},
        //   })
        //     .then(function (response) {
        //       //handle successconsole.log(response);
        //       console.log(response)
        //     })
        //     .catch(function (error) {
        //       //handle errorconsole.log(response);
        //       console.log(error)
        //     });
        // axios.post(`https://custom-demo.net/rapid_laundry_dev/v1/signup`, formData, {
        //     headers: headers
        // }).then(res => {
        //     console.log(res);
        // })
        // const response = await axios({
        //     method: "post",
        //     url: "https://custom-demo.net/rapid_laundry_dev/v1/signup",
        //     data: formData,
        //     headers: { "Content-Type": 'multipart/form-data'},
        //   })
        //     .then(response=> {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });

    } catch (error) {
        console.log(error)
    }


}





function PickUpLocation({ navigation, route }) {
    /**
     * function expression and dynamic stats
     */
    const [isToggle, setToggle] = useState(false)
    const { UserAdress, latitude, longitude } = route.params;


    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Logo />
            </View>
            <Text style={styles.HeadingText}>Woohoo!</Text>
            <Text style={styles.HeadingText}>Moving Right Along!</Text>
            <View style={styles.TextInputContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Map', { currentlocation: UserAdress, latitude: latitude, longitude: longitude }) }}>
                    <View style={styles.TextInputStyle}>
                        <Image source={require('../assets/location.png')} />
                        <Text style={{ paddingHorizontal: 10 }}>{UserAdress}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => postUser()}>
                    <Button text={"Add An Address"} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default PickUpLocation;
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