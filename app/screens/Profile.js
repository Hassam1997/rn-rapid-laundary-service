import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, TextInput, ImageBackground, StatusBar, ScrollView, FlatList, SectionList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from '../assets/logo.svg';
import { authUser, logout } from "../actions/authAction";
import { connect } from "react-redux";
import { restAction, API_CONTS } from "../actions/constant";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            artistArr: [],
            item: '',
            image: ''
        }
    }

    logoutClick = () => {
        this.props.logout();
    }

    render() {
        const styles = StyleSheet.create({
            container: { flex: 1, backgroundColor: "#ECF5FD" },
            LogoContainer: {
                height: hp('30%'),
                alignItems: "center",
                justifyContent: "center",
                bottom: 15
            },
        });
        return (
            <SafeAreaView
                style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "space-between"
                    }}
                    style={{
                        backgroundColor: "#ECF5FD",
                    }}>

                    <ImageBackground
                        source={require('../assets/LoginBackground.png')}
                        style={{
                            width: 480,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            height: hp('30%')
                        }}>
                        <View style={styles.LogoContainer}>
                            <Logo />
                        </View>
                    </ImageBackground>

                    <View style={{
                        width: wp("100%"),
                    }}>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: wp("86%"),
                            alignSelf: "center",
                        }}>
                            <TouchableOpacity onPress={() => { }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bottom: 30,
                                }}>
                                <Image
                                    source={{ uri: 'https://feliksinvestigationsgroupfl.com/assets/uploads/user/' + this.props.auth.user.signup_logo_image }}
                                    resizeMode='cover'
                                    style={{
                                        height: 120,
                                        width: 120,
                                        borderRadius: 80,
                                        borderColor: "#030171",
                                        borderWidth: 2
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        width: wp("100%"),
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flex: 1,
                    }}>
                        <View style={{
                            width: wp("100%"),
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: "Poppins-SemiBold",
                                color: "#030171",
                            }}>{this.props.auth.user.signup_firstname} {this.props.auth.user.signup_lastname}</Text>
                        </View>

                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("EditProfile") }}
                        style={{
                            width: wp("86%"),
                            backgroundColor: "#030171",
                            borderRadius: 10,
                            height: 50,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            flexDirection: "row",
                            borderColor: "#030171",
                            borderWidth: 1,
                            bottom: 0
                        }}>
                        <Text style={{
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Poppins-Medium",
                        }}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.logoutClick() }}
                        style={{
                            width: wp("86%"),
                            backgroundColor: "#030171",
                            borderRadius: 10,
                            height: 50,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            flexDirection: "row",
                            borderColor: "#030171",
                            borderWidth: 1,
                            bottom: 0
                        }}>
                        <Text style={{
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Poppins-Medium",
                        }}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={{
                    height: (Platform.OS === 'ios') ? 80 : 60,
                }}>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
    restAction: payload => dispatch(restAction(payload)),
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

