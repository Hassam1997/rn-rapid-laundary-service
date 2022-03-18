/**
 * essential imports
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, ColorPropType, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
/**
 * ui imports
 */
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import SwitchToggle from "react-native-switch-toggle";
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'react-moment';
import RestDialogBox from '../components/RestDialogBox';
import { callAPI } from "../api";
import { restAction, restActionValue } from '../actions/rest/restAction';
import { logout, authUser } from '../actions/auth/authAction';
import { AUTH, API_CONTS, storeData, getData, removeData } from '../actions/auth/constants';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
import Icon from 'react-native-vector-icons/AntDesign';
import { Transition, Transitioning } from 'react-native-reanimated';
/**
 * function jsx
 */
// const transition = (
//     <Transition.Together>
//         <Transition.In type='fade' durationMs={200} />
//         <Transition.Change />
//         <Transition.Out type='fade' durationMs={200} />
//     </Transition.Together>
// )

export default function Help(props) {
    /**
     * function expression and dynamic stats
     */

    const [isState, setState] = useState([
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            Question: "Question Will Be Here",
            placeholder: "Place holder is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
    ])
    const [currentIndex, setCurrentIndex] = useState(null)
    const ref = useRef()
    const transition = <Transition.Change interpolation='easeInOut' />
    console.log(currentIndex)

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 24, fontFamily: 'Poppins-Medium', width: wp('60%'), textAlign: 'center' }}>Frequently Asked Questions</Text>
            </View>
            {
                isState.map((item, index) => {
                    return (
                        <View
                            key={index} style={{ marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => {
                                ref.current.animateNextTransition()
                                setCurrentIndex(index === currentIndex ? null : index)
                            }}
                                style={{ height: 60, width: wp('90%'), backgroundColor: '#189BCF', alignSelf: "center", borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', elevation: 20, top: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 10 }}>Question Will Be Here</Text>
                                <Icon name={(index === currentIndex) ? 'down' : 'up'}
                                    style={{ color: 'white', marginRight: 20 }}
                                />
                            </TouchableOpacity>
                            {
                                index === currentIndex ? (
                                    <View style={{ width: wp('90%'), backgroundColor: '#F1ECEC', alignSelf: 'center', borderRadius: 10, paddingTop: 10 }}>
                                        <Text style={{ fontSize: 14, padding: 10, color: 'black' }}>lorem dsjand sabdjs bajdbhsad sadjasbj dbsa asbdsha abddjsab sd  db sbadsbak dsdsa dasd wadsad sdasdsa dasdasdbsajkbd sbakbdksab jdbsakbdjk bsajbdjk bkbsajdbad bksabdjksabkdbsakb djsab k</Text>
                                    </View>
                                )
                                    :
                                    null
                            }
                        </View>
                    )
                })
            }
        </Transitioning.View>
    )
};
/**
 * style sheet
 */
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        paddingHorizontal: 20,
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
        height: 60,
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignSelf: "center",
        paddingHorizontal: 20,
        borderRadius: 10
    },
    TimeTextStyle: {
        fontSize: 15,
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