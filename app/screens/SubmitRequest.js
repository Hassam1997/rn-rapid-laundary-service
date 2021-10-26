import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, ImageBackground, StatusBar, ScrollView, FlatList, SectionList, Image, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import { connect } from "react-redux";
import { authUser } from "../actions/authAction";
import RestDialogBox from "../components/RestDialogBox";
import { restAction, API_CONTS, storeData } from "../actions/constant";
import { callAPI, updateAPIConfig } from "../api";
import { getservicebyid, getservice } from '../actions/investigationActions';

let fileData = {}

class SubmitRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            filename: '',
            fileCopyUri: '',
            fileUri: '',
            fileType: '',
            fileSize: '',
            filePath: [],
            service_id: 0,
            title: '',
            description: '',
            attachment: ''
        }
    }

    componentDidMount() {
        if (typeof this.props.route.params.data !== 'undefined') {
            this.setState({
                item: this.props.route.params.data,
                service_id: this.props.route.params.data.service_id
            })
        }
    }

    submitClick = () => {
        try {
            if (this.state.title === '') {
                this.props.restAction({
                    IS_RETURN: true,
                    RETURN: false,
                    IS_LOADING: false,
                    RETURN_MESSAGE: "Please add your subject!"
                })
            } else if (this.state.description === '') {
                this.props.restAction({
                    IS_RETURN: true,
                    RETURN: false,
                    IS_LOADING: false,
                    RETURN_MESSAGE: "Please add your description!"
                })
            } else if (this.state.filePath.length <= 0) {
                this.props.restAction({
                    IS_RETURN: true,
                    RETURN: false,
                    IS_LOADING: false,
                    RETURN_MESSAGE: "Please Submit your file!"
                })
            }
            else {
                const restInit = {
                    IS_LOADING: true,
                    RETURN: false,
                    IS_RETURN: false,
                    RETURN_MESSAGE: "Something wrong",
                }
                this.props.restAction(restInit);
                let data = new FormData();
                data.append("service_id", this.state.service_id),
                    data.append("title", this.state.title),
                    data.append("description", this.state.description)
                for (let i = 0; i < this.state.filePath.length; i++) {
                    data.append(`attachment[${i}]`, this.state.filePath[i])
                }
                const postsData = (callAPI(API_CONTS.ADDSERVICE, "post", data).then(res => {
                    this.props.getservicebyid({})
                    restInit.IS_LOADING = false;
                    restInit.RETURN_MESSAGE = res.responseDescription;
                    restInit.IS_RETURN = true;
                    restInit.RETURN = res.success;
                    this.props.restAction(restInit);
                    if (res.success === true) {
                        this.setState({
                            title: "",
                            description: "",
                            filePath: []
                        })
                    }
                }));
            }

        } catch (error) {
            this.props.restAction(
                {
                    IS_LOADING: false,
                    IS_RETURN: true,
                    RETURN: false,
                    RETURN_MESSAGE: "Network request failed"
                });

        }
    }

    documentPicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            })
            for (const key of res) {
                fileData = {
                    fileCopyUri: key.fileCopyUri,
                    uri: key.uri,
                    type: key.type,
                    size: key.size,
                    name: key.name,
                }
                this.state.filePath.push(fileData)
                this.setState({
                    filename: fileData.name,
                    fileCopyUri: fileData.fileCopyUri,
                    fileUri: fileData.uri,
                    fileSize: fileData.size,
                    fileType: fileData.type
                })
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }

    documentName = (deleteIndex) => {
        this.setState({
            filePath: this.state.filePath.filter((value, index) => index != deleteIndex)
        })
    }

    render() {
        const styles = StyleSheet.create({
            container: { flex: 1 },
        });
        return (
            <View
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
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        height: 120
                    }}>
                        <View style={{
                            width: wp("100%"),
                        }}>
                            <View style={{
                                height: (Platform.OS === 'ios') ? 50 : 40,
                                alignSelf: "center",
                                width: wp("100%"),
                                justifyContent: "center",
                                paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 23,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "black",
                                }}>Submit Request</Text>
                            </View>
                        </View>
                        <View style={{
                            width: wp("100%"),
                        }}>
                            <View style={{
                                alignSelf: "center",
                                width: wp("100%"),
                                paddingHorizontal: 25,
                            }}>
                                <Image
                                    source={{ uri: 'https://feliksinvestigationsgroupfl.com/' + this.state.item.service_image_path + this.state.item.service_image }}
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }} />
                            </View>
                        </View>
                        <View style={{
                            width: wp("100%"),
                            marginVertical: 10
                        }}>
                            <View style={{
                                alignSelf: "center",
                                width: wp("100%"),
                                paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "#030171",
                                }}>{this.state.item.service_title}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        height: 220
                    }}>
                        <View style={{
                            width: wp("100%"),
                        }}>
                            <View style={{
                                alignSelf: "center",
                                width: wp("100%"),
                                paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "#030171",
                                }}>Subject</Text>
                            </View>
                        </View>
                        <TextInput
                            placeholderTextColor='#707070'
                            placeholder="Subject"
                            placeholderTextColor="#c0c0c0"
                            autoCapitalize='words'
                            maxLength={50}
                            onChangeText={(text) =>
                                this.setState({ title: text })}
                            value={this.state.title}
                            style={{
                                width: wp('86%'),
                                fontSize: 12,
                                fontFamily: "Poppins-Regular",
                                color: "#000000",
                                borderColor: "gray",
                                borderWidth: 1,
                                alignSelf: "center",
                                borderRadius: 10,
                                paddingLeft: 10,
                                height: 50,
                                backgroundColor: "white"
                            }}
                        />

                        <View style={{
                            width: wp("100%"),
                        }}>
                            <View style={{
                                alignSelf: "center",
                                width: wp("100%"),
                                paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: "Poppins-SemiBold",
                                    color: "#030171",
                                }}>Description</Text>
                            </View>
                        </View>
                        <TextInput
                            placeholderTextColor='#707070'
                            placeholder="Description"
                            placeholderTextColor="#c0c0c0"
                            multiline={true}
                            onChangeText={(text) =>
                                this.setState({ description: text })}
                            value={this.state.description}
                            style={{
                                width: wp('86%'),
                                fontSize: 12,
                                fontFamily: "Poppins-Regular",
                                color: "#000000",
                                borderColor: "gray",
                                borderWidth: 1,
                                alignSelf: "center",
                                borderRadius: 10,
                                marginTop: (Platform.OS === 'ios') ? 0 : 10,
                                textAlignVertical: "top",
                                padding: 10,
                                height: 114,
                                backgroundColor: "white"
                            }}
                        />
                    </View>
                    <View style={{
                        height: hp("18%"),
                    }}>


                        {
                            this.state.filename != '' && this.state.filePath.length > 0 ?
                                <>
                                    <ScrollView
                                        horizontal={true}
                                        style={{
                                            marginHorizontal: 25
                                        }}>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            alignSelf: "center",
                                        }}>
                                            {
                                                this.state.filePath.map((item, index) => {
                                                    return (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                flexDirection: "row",
                                                                backgroundColor: "black",
                                                                borderRadius: 20,
                                                                padding: 5,
                                                                margin: 4
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 10,
                                                                    fontFamily: "Poppins-Italic",
                                                                    color: "white",
                                                                    textDecorationLine: "underline",
                                                                    padding: 8,
                                                                    flexDirection: "row"
                                                                }}>{item.name}</Text>
                                                            <TouchableOpacity onPress={() => { this.documentName(index) }}>
                                                                <Entypo name="circle-with-cross" color="white" size={15} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </ScrollView>
                                </>
                                :
                                null
                        }

                        <TouchableOpacity onPress={() => { this.documentPicker() }}
                            style={{
                                width: wp("86%"),
                                backgroundColor: "white",
                                borderRadius: 10,
                                height: 44,
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 10,
                                flexDirection: "row",
                                borderColor: "#030171",
                                borderWidth: 1
                            }}>
                            <Text style={{
                                color: "#030171",
                                fontSize: 12,
                                fontFamily: "Poppins-Medium",
                            }}>Attach Files</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { this.submitClick() }}
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
                        }}>Submit Query</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{
                    height: (Platform.OS === 'ios') ? 100 : 80,
                    backgroundColor: "#ECF5FD"
                }}>
                </View>
                <RestDialogBox />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
    getservicebyid: (payload) => dispatch(getservicebyid(payload)),
    authUser: payload => dispatch(authUser(payload)),
    restAction: payload => dispatch(restAction(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitRequest);


