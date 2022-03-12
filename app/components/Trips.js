import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView, FlatList, ImageBackground, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Location from '../assets/location-city.svg';

function Trips(props) {
    const [isData, setData] = useState([
        {
            title: "Main dishes",
            horizontal: true,
            data: ["Pizza", "Burger", "Risotto"]
        },
        {
            title: "Main dishes",
            data: ["Pizza", "Burger", "Risotto"]
        },
        {
            title: "Main dishes",
            data: ["Pizza", "Burger", "Risotto"]
        },
    ])
    return (
        <View>
            <View style={{
                width: wp("90%"),
                alignSelf: "center",
                marginVertical: 10
            }}>
                <Text style={{
                    fontSize: 26,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                }}>Jane Smith Wishlist</Text>
            </View>
            <FlatList
                data={isData}
                ListFooterComponent={<View style={{ height: 10 }} />}
                renderItem={(itm) => {
                    return (
                        <View
                            style={{
                                height: 100,
                                flexDirection: "row",
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: wp("100%"),
                            }}>
                            <View style={{
                                width: wp("90%"),
                                height: 80,
                                alignItems: "center",
                                flexDirection: "row",
                            }}>
                                <Image
                                    source={require('../assets/profile_bg.png')}
                                    style={{
                                        width: 79,
                                        height: 75,
                                        borderRadius: 5,
                                        overflow: "hidden",
                                        marginHorizontal: 10
                                    }} />
                                <View style={{
                                    flexDirection: "column"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: "Poppins-Regular",
                                        color: "black",
                                    }}>Charkeston Favorites</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: "center"
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        }}>
                                            <Entypo name="location-pin" color={'#A8A9A2'} size={25} />
                                            <Text style={{
                                                fontSize: 13,
                                                fontFamily: "Poppins-SemiBold",
                                                color: "#A8A9A2",
                                                top:3

                                            }}>18 Places</Text>
                                        </View>
                                        <View style={{
                                            width: 100,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                            marginLeft: 10
                                        }}>
                                            <Location height={25} width={20} />
                                            <Text style={{
                                                fontSize: 13,
                                                fontFamily: "Poppins-SemiBold",
                                                color: "#A8A9A2",
                                                top:3
                                            }}>18 Places</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>

    );
}

export default Trips;
// const mapStateToProps = state => ({
//     auth: state.auth,
//     rest: state.rest,
// });

// const mapDispatchToProps = dispatch => ({
//     getservicedetailscommentsrefresh: (payload) => dispatch(getservicedetailscommentsrefresh(payload)),
//     restAction: payload => dispatch(restAction(payload))
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(FileModal)