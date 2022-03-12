import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView, FlatList, ImageBackground, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Location from '../assets/location-city.svg';

function Recs(props) {
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
                color: "black"
            }}>David Bella's Top Cities</Text>
        </View>
        <View style={{
            alignSelf: "center"
        }}>
            <FlatList
                data={isData}
                numColumns={2}
                ListFooterComponent={<View style={{ height: 10 }} />}
                renderItem={(itm) => {
                    return (
                        <>
                            <View
                                style={{
                                    alignItems: "center",
                                    width: wp("44%"),
                                    paddingVertical: 10,
                                }}>
                                <View style={{
                                    width: wp("42%"),
                                    height: 200,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    backgroundColor: "white",
                                    borderRadius: 30,
                                }}>
                                    <ImageBackground
                                        source={require('../assets/profile_bg.png')}
                                        resizeMode="cover"
                                        style={{
                                            width: wp('42%'),
                                            height: 124,
                                            borderTopLeftRadius: 30,
                                            borderTopRightRadius: 30,
                                            overflow: "hidden",
                                        }}>
                                    </ImageBackground>
                                    <View style={{
                                        paddingHorizontal: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: "Poppins-Medium",
                                            color: "black"
                                        }}>Title Here</Text>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                            style={{
                                                fontSize: 10,
                                                fontFamily: "Poppins-Regular",
                                                color: "black"
                                            }}>Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry.</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )
                }}
            />
        </View>
    </View>


    );
}

export default Recs;
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
