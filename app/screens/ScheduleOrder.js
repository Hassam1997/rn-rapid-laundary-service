/**
 * essential imports
 */
import React, { useState, useEffect } from 'react';
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
/**
 * function jsx
 */
function ScheduleOrder(props) {
    /**
     * function expression and dynamic stats
     */
    var arr2 = []
    const monthNames = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ];
    const minDate = new Date();
    const month = monthNames[minDate.getMonth()];
    const day = String(minDate.getDate()).padStart(2, '0');
    const year = minDate.getFullYear();
    const output = year + '-' + month + '-' + day;
    const [isToggle, setToggle] = useState(false)
    const [isSelectedEndDate, setSelectedEndDate] = useState(null)
    const [isSelectedStartDate, setSelectedStartDate] = useState(null)
    const [isArray, setArray] = useState([])
    const [Array, setarray] = useState([...props.route.params.list])
    const [isPrice, setPrice] = useState(props.route.params.totalPrice)
    const [isFullName, setFullName] = useState(props.auth.user.signup_firstname)
    const [isAddress, setAddress] = useState(props.auth.user.signup_address)
    const [isDetergent, setDetergent] = useState((props.route.params.detergent === true) ? 1 : 0)
    const [isPickUp, setPickUp] = useState("")
    const [isPick, setPick] = useState(output)

    useEffect(() => {
        if (props.route.params.list != 'undefined') {
            extract()
        }
        console.log(isSelectedStartDate)

    }, [])

    const extract = (id, price) => {
        for (var i = 0; i < Array.length; i++) {
            let arr = []
            arr['id'] = Array[i].pricing_id
            arr['qty'] = Array[i].quantity
            arr['price'] = Array[i].pricing_amount
            arr2.push(arr)
            setArray(arr2)
        }
    }

    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date)
        } else {
            setSelectedStartDate(date.toISOString().split('T')[0])
            setSelectedEndDate(null)
        }
        console.log(isSelectedStartDate)
        //console.log(Math.floor(new Date("2023.08.10 16:00:00").getTime() / 1000))
    }

    const customDayHeaderStylesCallback = ({ dayOfWeek, month, year, }) => {
        return {
            textStyle: {
                color: 'black',
                fontWeight: 'bold',
            }
        };
    }

    const updateUser = async () => {
        try {
            if (isPickUp != '') {
                let data = new FormData();
                const restInit = {
                    IS_LOADING: true,
                    RETURN: false,
                    IS_RETURN: false,
                    RETURN_MESSAGE: "Something wrong",
                }
                props.restAction(restInit);
                var keys;
                for (var i = 0; i < isArray.length; i++) {
                    keys = [];
                    for (var k in isArray[i]) {
                        keys.push(k);
                    }
                    for (var k = 0; k < keys.length; k++) {
                        data.append(`bag_data[${i}][${keys[k]}]`, isArray[i][keys[k]])
                    }
                }
                data.append("fullname", isFullName)
                data.append("address", isAddress)
                data.append("is_detergent", isDetergent)
                data.append("total", isPrice)
                data.append("pickup", isPickUp)
                console.log(data)
                const postsData = callAPI(API_CONTS.SAVEDELIVERY, "POST", data).then(res => {
                    console.log(res)
                    if (res.success === true) {
                        props.navigation.navigate('PickUp', {time: isPickUp})
                    }
                });
            } else {
                Alert.alert("Please select pickup options given below")
            }
        } catch (error) {
            console.log("error", error)
        }
    }



    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <CalendarPicker
                    width={wp("90%")}
                    dayLabelsWrapper={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                    }}
                    textStyle={{
                        color: "black"
                    }}
                    monthTitleStyle={{
                        fontWeight: 'bold',
                        color: "black",
                        fontSize: 18
                    }}
                    yearTitleStyle={{
                        fontWeight: 'bold',
                        color: "black",
                        fontSize: 18
                    }}
                    startFromMonday={true}
                    allowRangeSelection={false}
                    minDate={minDate}
                    todayBackgroundColor="gray"
                    restrictMonthNavigation={true}
                    dayShape='circle'
                    selectedDayColor="#05C3DD"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                    previousTitle={"Prev"}
                    // previousComponent={<PreviousArrow />}
                    // nextComponent={<NextArrow />}
                    customDayHeaderStyles={customDayHeaderStylesCallback}
                />
            </View>
            <View style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 24,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}>
                <View>
                    <TouchableOpacity onPress={() => { isSelectedStartDate != null ? setPickUp(`${isSelectedStartDate} 12PM - 03PM`) : setPickUp(`${isPick} 12PM - 03PM`) }}
                        style={styles.TimeViewStyle}>
                        <View>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    fontSize: 18, fontWeight: 'bold', color: 'white'
                                }}
                                format="MMMM DD">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    color: 'white'
                                }}
                                format="dddd">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                        </View>
                        <Text style={styles.TimeTextStyle}>12 Pm - 3 Pm</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { isSelectedStartDate != null ? setPickUp(`${isSelectedStartDate} 03PM - 06PM`) : setPickUp(`${isPick} 03PM - 06PM`) }}
                        style={styles.TimeViewStyle}>
                        <View>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    fontSize: 18, fontWeight: 'bold', color: 'white'
                                }}
                                format="MMMM DD">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    color: 'white'
                                }}
                                format="dddd">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                        </View>
                        <Text style={styles.TimeTextStyle}>3 Pm - 6 Pm</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { isSelectedStartDate != null ? setPickUp(`${isSelectedStartDate} 06PM - 09PM`) : setPickUp(`${isPick} 06PM - 09PM`) }}
                        style={styles.TimeViewStyle}>
                        <View>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    fontSize: 18, fontWeight: 'bold', color: 'white'
                                }}
                                format="MMMM DD">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                            <Moment
                                date={isSelectedStartDate ?? minDate}
                                element={Text}
                                style={{
                                    color: 'white'
                                }}
                                format="dddd">
                                {isSelectedStartDate ?? minDate}
                            </Moment>
                        </View>
                        <Text style={styles.TimeTextStyle}>6 Pm - 9 Pm</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { /* props.navigation.navigate('PickUp')*/ updateUser() }}>
                        <View style={{ width: wp('90%'), height: 60, backgroundColor: '#189BCF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
};
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
    authUser: payload => dispatch(authUser(payload)),
    restAction: payload => dispatch(restAction(payload)),
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleOrder)
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
        backgroundColor: color.primary,
        borderRadius: 10
    },
    TimeTextStyle: {
        fontSize: 15,
        color: "white",
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