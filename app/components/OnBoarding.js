import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Text, Image, FlatList, ImageBackground, useWindowDimensions, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/logo.svg';

const OnBoarding = (props) => {

    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const slideRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOnBoardData, setOnBoardData] = useState([
        {
            id: 1,
            heading: "American Most Trusted Agency",
            description: "We have highly trained staff available that implement security measures around any Retail, Commercial or Industrial Site.",
            image: require('../assets/onboard-1.png')
        },
        {
            id: 2,
            heading: "Investigation Services",
            description: "Your satisfaction is our priority. Our staff members undergo on-going training and certification every year. Call us today for a FREE 30 minute consultation.",
            image: require('../assets/onboard-2.png')
        },
        {
            id: 3,
            heading: "Personal Protection",
            description: "Are you worried about your personal safety? Turn to the professionals at Feliks Investigations Group LLC for reliableprotection services.",
            image: require('../assets/onboard-3.png')
        },
    ]);

    const viewableitemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <FlatList
                data={isOnBoardData}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                ref={slideRef}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                legacyImplementation={false}
                onViewableItemsChanged={viewableitemChanged}
                viewabilityConfig={viewConfig}
                renderItem={(itm, index) => {
                    return (
                        <ImageBackground
                            source={itm.item.image}
                            style={{
                                width: Dimensions.get("window").width,
                                height: Dimensions.get("window").height,
                            }}>
                            <View style={{
                                flex: 2.2,
                                alignItems: "center",
                                paddingTop: 50,
                                paddingBottom: 10,
                                justifyContent: "space-between"
                            }}>
                                <Logo />
                                <Text style={{
                                    color: "white",
                                    textAlign: 'center',
                                    width: wp("88%"),
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 28,
                                }}>{itm.item.heading}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}>
                                <Text style={{
                                    color: "white",
                                    textAlign: 'center',
                                    width: wp("90%"),
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                }}>{itm.item.description}</Text>
                            </View>
                        </ImageBackground>

                    )
                }}
            />
            <View style={{
                flexDirection: "row",
                height: 64,
                position: 'absolute',
                bottom: 70,
                alignSelf: "center"
            }}>
                {
                    isOnBoardData.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 20, 10],
                            extrapolate: 'clamp'
                        });
                        return (
                            <Animated.View
                                key={i.toString()}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bottom: 10
                                }}>
                                <Animated.View
                                    style={[styles.dot, { width: dotWidth, height: dotWidth }]}>
                                </Animated.View>
                            </Animated.View>
                        )
                    })
                }
            </View>
            <TouchableWithoutFeedback onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignIn' }],
                });
            }}>
                <View style={styles.LoginButton}>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                    }}>Get Started</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dot: {
        borderRadius: 10,
        backgroundColor: "white",
        marginHorizontal: 8
    },
    LoginButton: {
        width: wp("90%"),
        backgroundColor: "#00007D",
        borderRadius: 40,
        height: 60,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 20
    },
})

export default OnBoarding;