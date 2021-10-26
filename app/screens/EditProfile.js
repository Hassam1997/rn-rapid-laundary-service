import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, TextInput, ImageBackground, StatusBar, ScrollView, FlatList, SectionList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';
import { authUser, logout } from "../actions/authAction";
import { getData } from '../actions/constant';
import { connect } from "react-redux";
import RestDialogBox from "../components/RestDialogBox";
import { callAPI } from "../api";
import { restAction, API_CONTS, storeData, removeData } from "../actions/constant";

let pic = ''
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            artistArr: [],
            item: '',
            isImage: "",
            firstName: '',
            lastName: '',
            baseImage: '',
            item: ''
        }
    }

    imagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image.data);
            this.setState({
                isImage: image.path,
                baseImage: image.data
            })
            this.RBSheet.close()
        });
    }

    cameraPicker = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image.data);
            this.setState({
                isImage: image.path,
                baseImage: image.data
            })
            this.RBSheet.close()
        });
    }

    componentDidMount = async () => {
        this.setState({
            firstName: this.props.auth.user.signup_firstname,
            lastName: this.props.auth.user.signup_lastname,
            isImage: 'https://feliksinvestigationsgroupfl.com/assets/uploads/user/' + this.props.auth.user.signup_logo_image
        })
        pic = await getData("pic")
    }

    updateUser = async () => {
        try {
            if (this.state.baseImage != '') {
                let data = new FormData();
                const restInit = {
                    IS_LOADING: true,
                    RETURN: false,
                    IS_RETURN: false,
                    RETURN_MESSAGE: "Something wrong",
                }
                this.props.restAction(restInit);
                data.append("firstname", this.state.firstName)
                data.append("lastname", this.state.lastName)
                data.append("image", this.state.baseImage)
                const postsData = callAPI(API_CONTS.UPDATEUSER, "post", data).then(res => {
                    restInit.IS_LOADING = false;
                    restInit.RETURN_MESSAGE = res.responseDescription;
                    restInit.IS_RETURN = true;
                    restInit.RETURN = res.success;
                    this.props.restAction(restInit);
                    if (res.success === true) {
                        const authUserInit = {
                            userType: res.user.signup_user,
                            userAuthenticates: true,
                            id: res.user.signup_id,
                            user: res.user,
                            pic: this.state.baseImage
                        }
                        this.setUserData(authUserInit);
                        this.props.authUser(authUserInit)
                        if (this.props.restAction(restInit.IS_RETURN === false)) {
                            this.props.navigation.navigate("Profile")
                        }
                    }
                });
            } else {
                pic = await getData("pic")
                let data = new FormData();
                const restInit = {
                    IS_LOADING: true,
                    RETURN: false,
                    IS_RETURN: false,
                    RETURN_MESSAGE: "Something wrong",
                }
                this.props.restAction(restInit);
                data.append("firstname", this.state.firstName)
                data.append("lastname", this.state.lastName)
                data.append("image", pic)
                const postsData = callAPI(API_CONTS.UPDATEUSER, "post", data).then(res => {
                    restInit.IS_LOADING = false;
                    restInit.RETURN_MESSAGE = res.responseDescription;
                    restInit.IS_RETURN = true;
                    restInit.RETURN = res.success;
                    this.props.restAction(restInit);
                    if (res.success === true) {
                        const authUserInit = {
                            userType: res.user.signup_user,
                            userAuthenticates: true,
                            id: res.user.signup_id,
                            user: res.user,
                            pic: pic
                        }
                        this.setUserData(authUserInit);
                        this.props.authUser(authUserInit)
                    }
                    if (this.props.restAction(restInit.IS_RETURN === false)) {
                        this.props.navigation.navigate("Profile")
                    }
                });
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    setUserData = async (authUserInit) => {
        await storeData("userAuthenticates", authUserInit.userAuthenticates);
        await storeData("userType", authUserInit.userType);
        await storeData("id", authUserInit.id);
        await storeData("user", JSON.stringify(authUserInit.user));
        await storeData("pic", authUserInit.pic)
    }

    render() {
        const styles = StyleSheet.create({
            container: { flex: 1, backgroundColor: "#ECF5FD" },
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

                        <View style={{
                            width: wp("100%"),
                        }}>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: wp("86%"),
                                alignSelf: "center",
                                paddingVertical: (Platform.OS === 'ios') ? 0 : 0,
                                paddingBottom: (Platform.OS === 'ios') ? 15 : 15
                            }}>
                                <TouchableOpacity onPress={() => { this.RBSheet.open() }}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 50,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Image
                                        source={(this.state.isImage === '') ? { uri: 'https://feliksinvestigationsgroupfl.com/assets/uploads/user/' + this.props.auth.user.signup_logo_image } : { uri: this.state.isImage }}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 50,
                                        }} />
                                    <View style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0
                                    }}>
                                        <FontAwesome5 name="edit" color='#030171' size={25} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            width: wp("100%"),
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flex: 1,
                            top: 20
                        }}>
                            <View style={{
                                flexDirection: "column",
                                paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "#030171",
                                    paddingVertical: 5
                                }}>First Name</Text>

                                <TextInput
                                    placeholderTextColor='#707070'
                                    placeholder="Sarah"
                                    placeholderTextColor="#c0c0c0"
                                    autoCapitalize='words'
                                    maxLength={20}
                                    onChangeText={(text) =>
                                        this.setState({ firstName: text })}
                                    value={this.state.firstName}
                                    style={{
                                        width: wp('40%'),
                                        fontSize: 12,
                                        fontFamily: "Poppins-Regular",
                                        color: "#000000",
                                        borderColor: "#030171",
                                        borderWidth: 1,
                                        alignSelf: "center",
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        height: 50,
                                        backgroundColor: "white"
                                    }}
                                />
                            </View>
                            <View style={{
                                flexDirection: "column",
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "#030171",
                                    paddingVertical: 5
                                }}>Last Name</Text>

                                <TextInput
                                    placeholderTextColor='#707070'
                                    placeholder="Johnson"
                                    placeholderTextColor="#c0c0c0"
                                    autoCapitalize='words'
                                    maxLength={20}
                                    onChangeText={(text) =>
                                        this.setState({ lastName: text })}
                                    value={this.state.lastName}
                                    style={{
                                        width: wp('40%'),
                                        fontSize: 12,
                                        fontFamily: "Poppins-Regular",
                                        color: "#000000",
                                        borderColor: "#030171",
                                        borderWidth: 1,
                                        alignSelf: "center",
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        height: 50,
                                        backgroundColor: "white"
                                    }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.updateUser() }}
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
                            }}>Save</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        closeOnDragDown={false}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent",
                            },
                            draggableIcon: {
                                backgroundColor: "#707070",
                            },
                        }}
                    >
                        <View style={{
                            width: "100%",
                            borderTopRightRadius: 25,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 25,
                            height: 300,
                            overflow: "hidden"
                        }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    padding: 10,
                                    width: "100%",
                                }}
                            >
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.RBSheet.close()}
                                        style={{ padding: 10, }}
                                    >
                                        <Entypo name="circle-with-cross" color='#030171' size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.cameraPicker()
                                }}
                                style={{
                                    width: 230,
                                    height: 55,
                                    borderRadius: 40,
                                    alignSelf: "center",
                                    backgroundColor: "#030171",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                }}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.imagePicker()
                                }}
                                style={{
                                    width: 230,
                                    height: 55,
                                    borderRadius: 40,
                                    alignSelf: "center",
                                    backgroundColor: "#030171",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                }}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                    <View style={{
                        height: (Platform.OS === 'ios') ? 80 : 60,
                    }}>
                    </View>
                    <RestDialogBox />
                </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
    authUser: payload => dispatch(authUser(payload)),
    restAction: payload => dispatch(restAction(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile)