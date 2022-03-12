/**
 * essential imports
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView, ColorPropType, Switch, FlatList } from 'react-native';
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
import { connect } from 'react-redux';
import { getprice } from "../actions/product/productAction";
import Clothes from '../assets/clothes.svg';
/**
 * function jsx
 */
function CustomizeOrder(props) {
    /**
     * function expression and dynamic stats
     */

    const [isToggle, setToggle] = useState(false)
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isFlatList, setFlatList] = useState(false);
    const [isPriceList, setPriceList] = useState([])
    const [isPrice, setPrice] = useState(0)

    useEffect(() => {
        props.getprice({});
        let result = props.product.pricelisting.map(item => {
            return {
                ...item,
                quantity: 0
            }
        })
        setPriceList(result)
    }, [isToggle])

    const Quantity = (id, value) => {
        let price = isPriceList.find(item => item.pricing_id === id).pricing_amount;
        if (value == 'increment') {
            isPriceList.find(item => item.pricing_id === id).quantity += 1;
            setFlatList(!isFlatList)
            setPrice(isPrice + price)
        } else if (value === "decrement" && isPriceList.find(item => item.pricing_id === id).quantity > 0) {
            isPriceList.find(item => item.pricing_id === id).quantity -= 1;
            setFlatList(!isFlatList)
            setPrice(isPrice - price)
        }
    }
    const Scented = () => {
        setIsEnabled1(!isEnabled1)
        console.log(isEnabled1)
        if (isEnabled1 && isPrice > 0) {
            setPrice(isPrice - 2)
        } else if (isEnabled1 === false) {
            setPrice(isPrice + 2)
        }
    }
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
                        <TouchableOpacity onPress={() => { setToggle(!isToggle), setPrice(0), setIsEnabled1(false) }}
                            style={styles.AdrressViewStyle}>
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
                                onValueChange={(newValue) => setToggle(!isToggle)}
                            />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.AdrressTextStyle}>Wash & Fold</Text>
                        </TouchableOpacity>
                        {/* <View style={styles.ButtonContainer}>
                            <TouchableOpacity onPress={() => { effect() }}>
                                <Button text={"Continue"} />
                            </TouchableOpacity>
                        </View> */}
                    </>
                    :
                    <>
                        <View style={{
                            height: 80
                        }}>
                            <Text style={styles.HeadingTextToggle}>Customize Your Order</Text>
                            <Text style={styles.HeadingText}>What Are Our PRICING ?</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setToggle(!isToggle), setPrice(0) }}>
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
                        </TouchableOpacity>

                        <FlatList
                            data={isPriceList}
                            extraData={isFlatList}
                            keyExtractor={(item) => item.pricing_id}
                            ListFooterComponent={<View style={{ height: 10 }} />}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            paddingVertical: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            width: wp("88%"),
                                            alignSelf: "center"
                                        }}>
                                        <Clothes width={34} height={33} />
                                        <View style={{
                                            width: wp("34%"),
                                        }}>
                                            <Text
                                                style={{
                                                    color: '#000000',
                                                    fontFamily: 'Poppins-Medium',
                                                    fontSize: 17,
                                                }}>
                                                {item.pricing_title}
                                            </Text>
                                            <Text
                                                style={{
                                                    bottom: 5,
                                                    color: '#707070',
                                                    fontFamily: 'Poppins-Regular',
                                                    fontSize: 16,
                                                }}>
                                                {item.pricing_amount}$
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Quantity(item.pricing_id, "decrement")
                                                }}
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    borderRadius: 5,
                                                    backgroundColor: '#BBECFF',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#189BCF',
                                                        fontSize: 25,
                                                    }}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>

                                            <Text
                                                style={{
                                                    marginHorizontal: 5,
                                                    borderRadius: 5,
                                                    textAlign: 'center',
                                                    width: 35,
                                                    height: 35,
                                                    backgroundColor: '#BBECFF',
                                                    color: 'black',
                                                    fontSize: 20,
                                                    textAlignVertical: 'center',
                                                }}>
                                                {item.quantity}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    Quantity(item.pricing_id, "increment")
                                                }}
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    borderRadius: 5,
                                                    backgroundColor: '#BBECFF',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#189BCF',
                                                        fontSize: 25,
                                                    }}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                        <View
                            style={{
                                width: wp('88%'),
                                alignSelf: 'center',
                                marginBottom: 20
                            }}>
                            <View
                                style={{
                                    paddingVertical: 18,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    width: wp('88%'),
                                    alignSelf: 'center',
                                    backgroundColor: '#BBECFF',
                                    alignItems: "center"
                                }}>
                                <View style={{
                                    width: wp("16%"),
                                    alignItems: "center"
                                }}>
                                    <Clothes width={33} height={33} />
                                </View>
                                <View style={{
                                    width: wp("54%"),
                                }}>
                                    <Text
                                        style={{
                                            color: '#000000',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 17,
                                        }}>
                                        Total Bags Amount
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 19,
                                        color: 'black',
                                    }}>
                                    {isPrice}$
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 18,
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                }}>
                                {/* <Image source={require('../assets/bottle.png')}
                                        style={{
                                            left: 3
                                        }}
                                    /> */}

                                <View style={{}}>
                                    <Text
                                        style={{
                                            color: '#000000',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 17,
                                        }}>
                                        Scented Detergant
                                    </Text>
                                    <Text
                                        style={{
                                            bottom: 5,
                                            color: '#707070',
                                            fontFamily: 'Poppins-Regular',
                                            fontSize: 16,
                                        }}>
                                        2$
                                    </Text>
                                </View>

                                <SwitchToggle
                                    switchOn={isEnabled1}
                                    onPress={() => {
                                        Scented()
                                    }}
                                    circleColorOff="white"
                                    circleColorOn="white"
                                    backgroundColorOn={color.primary}
                                    backgroundColorOff="white"
                                    containerStyle={{
                                        width: 70,
                                        height: 37,
                                        borderRadius: 20,
                                        borderWidth: 2,
                                        borderWidthColor: 'white',
                                        backgroundColor: color.palette.white,
                                        color: color.palette.white,
                                    }}
                                    circleStyle={{
                                        width: 33,
                                        height: 33,
                                        borderRadius: 20,
                                        elevation: 2,
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('ScheduleOrder', { list: isPriceList });
                                }}>
                                <Button text={'Schedule Delivery'} />
                            </TouchableOpacity>
                        </View>

                        {/* <View style={styles.PriceContainer}>
                            {

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
                                            switchOn={isEnabled1}
                                            onPress={() => { setIsEnabled1(!isEnabled1) }}
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
                                        </View >

                                        <SwitchToggle
                                            switchOn={isEnabled2}
                                            onPress={() => { setIsEnabled2(!isEnabled2) }}
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
                                            switchOn={isEnabled3}
                                            onPress={() => { setIsEnabled3(!isEnabled3) }}
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
                                            switchOn={isEnabled4}
                                            onPress={() => { setIsEnabled4(!isEnabled4) }}
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
                                    <TouchableOpacity onPress={() => { props.navigation.navigate("ScheduleOrder") }}>
                                        <Button text={"Schedule Delivery"} />
                                    </TouchableOpacity>
                                </View>
                            }
                            <Text style={[styles.HeadingTextToggle, { paddingTop: 20 }]}>Cancel Order</Text>
                        </View> */}
                    </>
            }
        </View>
    )
};
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
    product: state.product,
    cartItem: state.cartItem,
});

const mapDispatchToProps = dispatch => ({
    getprice: (payload) => dispatch(getprice(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomizeOrder);
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