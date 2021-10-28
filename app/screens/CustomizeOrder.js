/**
 * essential imports
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, ColorPropType } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../theme/color';
/**
 * ui imports
 */
import CheckBox from '@react-native-community/checkbox';
import SwitchToggle from "react-native-switch-toggle";
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
/**
 * function jsx
 */
function CustomizeOrder(props) {
    /**
     * function expression and dynamic stats
     */
    const [isToggle, setToggle] = useState(false)

    return (
        <View style={styles.container}>
            {
                isToggle === false ?
                    <>
                        <View style={{
                            height: 80,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={styles.HeadingText}>Customize Your Order</Text>
                        </View>
                        <View style={styles.AdrressViewStyle}>
                            <CheckBox
                                tintColors={{
                                    true: '#62D587',
                                    false: "#1B1852"
                                }}
                                style={{
                                    height: 18,
                                    width: 18,
                                }}
                                disabled={false}
                                lineWidth={1}
                                onCheckColor={'#1B1852'}
                                onFillColor={'#1B1852'}
                                onTintColor={'#1B1852'}
                                value={isToggle}
                                onValueChange={(newValue) => setToggle(newValue)}
                            />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.AdrressTextStyle}>Wash & Fold</Text>
                        </View>
                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity>
                                <Button text={"Continue"} />
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={{
                            height: 80
                        }}>
                            <Text style={styles.HeadingTextToggle}>Customize Your Order</Text>
                            <Text style={styles.HeadingText}>What Are Our PRICING ?</Text>
                        </View>
                        <View style={styles.AdrressViewStyle}>
                            <CheckBox
                                tintColors={{
                                    true: '#62D587',
                                    false: "#1B1852"
                                }}
                                style={{
                                    height: 18,
                                    width: 18,
                                }}
                                disabled={false}
                                lineWidth={1}
                                onCheckColor={'#1B1852'}
                                onFillColor={'#1B1852'}
                                onTintColor={'#1B1852'}
                                value={isToggle}
                                onValueChange={(newValue) => setToggle(newValue)}
                            />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.AdrressTextStyle}>Wash & Fold</Text>
                        </View>
                        <View style={styles.PriceContainer}>
                            <View style={styles.PriceView}>
                                <View style={styles.PriceTagView}>
                                    <View style={{
                                        flexDirection: "column"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 14,
                                            color: color.dim,
                                        }}>Wash & Fold</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 0-30 Pounds = $45</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 31-40 Pounds = $55</Text>
                                    </View>
                                    <SwitchToggle
                                        circleColorOff='white'
                                        circleColorOn='white'
                                        backgroundColorOn={color.primary}
                                        backgroundColorOff='white'
                                        containerStyle={{
                                            width: 70,
                                            height: 37,
                                            borderRadius: 20,
                                            borderWidth: 2,
                                            borderWidthColor: "white",
                                            backgroundColor: color.palette.white,
                                            color: color.palette.white
                                        }}
                                        circleStyle={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: 20,
                                            elevation: 2
                                        }}
                                    />
                                </View>
                                <View style={styles.PriceTagView}>
                                    <View style={{
                                        flexDirection: "column"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 14,
                                            color: color.dim,
                                        }}>Wash & Fold</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 0-30 Pounds = $45</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 31-40 Pounds = $55</Text>
                                    </View>
                                    <SwitchToggle
                                        circleColorOff='white'
                                        circleColorOn='white'
                                        backgroundColorOn={color.primary}
                                        backgroundColorOff='white'
                                        containerStyle={{
                                            width: 70,
                                            height: 37,
                                            borderRadius: 20,
                                            borderWidth: 2,
                                            borderWidthColor: "white",
                                            backgroundColor: color.palette.white,
                                            color: color.palette.white
                                        }}
                                        circleStyle={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: 20,
                                            elevation: 2
                                        }}
                                    />
                                </View>
                                <View style={styles.PriceTagView}>
                                    <View style={{
                                        flexDirection: "column"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 14,
                                            color: color.dim,
                                        }}>Wash & Fold</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 0-30 Pounds = $45</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 31-40 Pounds = $55</Text>
                                    </View>
                                    <SwitchToggle
                                        circleColorOff='white'
                                        circleColorOn='white'
                                        backgroundColorOn={color.primary}
                                        backgroundColorOff='white'
                                        containerStyle={{
                                            width: 70,
                                            height: 37,
                                            borderRadius: 20,
                                            borderWidth: 2,
                                            borderWidthColor: "white",
                                            backgroundColor: color.palette.white,
                                            color: color.palette.white
                                        }}
                                        circleStyle={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: 20,
                                            elevation: 2
                                        }}
                                    />
                                </View>
                                <View style={styles.PriceTagView}>
                                    <View style={{
                                        flexDirection: "column"
                                    }}>
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            fontSize: 14,
                                            color: color.dim,
                                        }}>Wash & Fold</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 0-30 Pounds = $45</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            color: color.palette.lightgray
                                        }}>- 31-40 Pounds = $55</Text>
                                    </View>
                                    <SwitchToggle
                                        switchOn={true}
                                        circleColorOff='white'
                                        circleColorOn='white'
                                        backgroundColorOn={color.primary}
                                        backgroundColorOff='white'
                                        containerStyle={{
                                            width: 70,
                                            height: 37,
                                            borderRadius: 20,
                                            borderWidth: 2,
                                            padding: 4,
                                            borderWidthColor: "white",
                                            backgroundColor: color.palette.white,
                                            color: color.palette.white
                                        }}
                                        circleStyle={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: 20,
                                            elevation: 2
                                        }}
                                    />
                                </View>
                                <TouchableOpacity>
                                    <Button text={"Schedule Delivery"} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.HeadingTextToggle, { paddingTop: 20 }]}>Cancel Order</Text>
                        </View>
                    </>
            }
        </View>
    )
};
export default CustomizeOrder;
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
        paddingVertical: 20,
        backgroundColor: "red"
    },
    HeadingText: {
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        color: color.dim,
        textAlign: "center",
    },
    HeadingTextToggle: {
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        color: color.dim,
        textAlign: "center"
    },
    AdrressViewStyle: {
        width: wp("90%"),
        height: 66,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        backgroundColor: color.primaryLighter,
        borderRadius: 10,
        alignSelf: "center"
    },
    AdrressTextStyle: {
        fontSize: 16,
        color: color.dim,
        fontFamily: "Poppins-Medium",
        width: wp("80%"),
        left: 20
    },
    ButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        bottom: 20
    },
    PriceContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20
    },
    PriceView: {
        width: wp("90%"),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: color.palette.white,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 15,
        borderRadius: 15
    },
    PriceTagView: {
        flexDirection: "row",
        width: wp("80%"),
        height: 80,
        alignItems: "center",
        justifyContent: "space-between",
    }
});