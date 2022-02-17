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
import CalendarPicker from 'react-native-calendar-picker';
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
    const minDate = new Date();
    const [isToggle, setToggle] = useState(false)
    const [isSelectedEndDate, setSelectedEndDate] = useState(null)
    const [isSelectedStartDate, setSelectedStartDate] = useState(null)

    const onDateChange = (date, type) => {

        if (type === 'END_DATE') {
            setSelectedEndDate(date)
        } else {
            setSelectedStartDate(date)
            setSelectedEndDate(null)
        }
        console.log("!", isSelectedEndDate)
    }

    const customDayHeaderStylesCallback = ({ dayOfWeek, month, year,  }) => {
        return {
            textStyle: {
                color: 'black',
                fontWeight: 'bold',
            }
        };
    }

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                paddingTop: 50
            }}>
                <CalendarPicker
                    height={hp("60%")}
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
                        color: "black"
                    }}
                    yearTitleStyle={{
                        fontWeight: 'bold'
                    }}
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    todayBackgroundColor="#05C3DD"
                    dayShape="square"
                    selectedDayColor="#05C3DD"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                    previousTitle={""}
                    // previousComponent={<PreviousArrow />}
                    // nextComponent={<NextArrow />}
                    customDayHeaderStyles={customDayHeaderStylesCallback}
                />
            </View>
            <View style={{
                flex: 1,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 32,
                },
                shadowOpacity: 1,
                shadowRadius: 16.00,
                elevation: 30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                zIndex: 999
            }}>
                <View>
                    <View style={styles.TimeViewStyle}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>October 22</Text>
                            <Text style={{ color: 'white' }}>Today</Text>
                        </View>
                        <Text style={styles.TimeTextStyle}>4Pm - 7Pm</Text>

                    </View>

                    <View style={styles.TimeViewStyle}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>October 23</Text>
                            <Text style={{ color: 'white' }}>Tomorrow</Text>
                        </View>
                        <Text style={styles.TimeTextStyle}>4Pm - 7Pm</Text>
                    </View>

                    <View style={styles.TimeViewStyle}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>October 24</Text>
                            <Text style={{ color: 'white' }}>Sunday</Text>
                        </View>
                        <Text style={styles.TimeTextStyle}>4Pm - 7Pm</Text>
                    </View>
                </View>

                <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('PickUp')}}>
                        <View style={{ width: wp('90%'), height: 60, backgroundColor: '#189BCF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
};
export default ScheduleOrder;
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