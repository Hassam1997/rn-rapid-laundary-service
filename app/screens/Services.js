import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Image, StatusBar, ScrollView, FlatList, SectionList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from '../assets/logo.svg';
import { getservicedetailscomments } from '../actions/investigationActions';
import { connect } from 'react-redux';
import RestDialogBox from "../components/RestDialogBox";
import { restAction } from "../actions/constant";
import Moment from 'react-moment';
import Modal from '../components/ServicesModal';

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            artistArr: [],
            item: {},
            description: '',
            service_detail_attachment: ["the", "yyy"],
            tata: [],
            ismodalshow: false,
            service_detail_id: 0
        }
    }

    componentDidMount() {
        this.setState({
            users: []
        })
        if (typeof this.props.route.params.name !== 'undefined') {
            this.setState({
                item: this.props.route.params.name,
                description: this.props.route.params.name.service_detail_description,
                service_detail_id: this.props.route.params.name.service_detail_id,
            })
            this.setState((prevState) => ({
                users: [...prevState.users, this.props.route.params.name]
            }));
        }
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.getservicedetailscomments(this.props.route.params)
        })
    }

    onRegionChange = (region) => {
        this.setState({
            region: region
        });
    }

    closeModal = () => {
        this.setState({
            ismodalshow: false,
        })
    }
    showModal = () => {
        this.setState({
            ismodalshow: true,
        })
    }
    setCoordinates = () => {
        this.props.getservicedetailscomments(this.props.route.params)
    }

    render() {
        const styles = StyleSheet.create({
            container: { flex: 1, backgroundColor: "#ECF5FD" },
        });
        return (
            <View
                style={styles.container}>
                {
                    this.props.comments.length > 0 ?
                        <>
                            <View style={{
                                width: wp("100%"),
                            }}>
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: wp("86%"),
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    paddingVertical: (Platform.OS === 'ios') ? 20 : 10
                                }}>
                                    <View
                                        style={{
                                            height: 76,
                                            width: 76,
                                            borderRadius: 40,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                        <Image
                                            source={{ uri: 'https://feliksinvestigationsgroupfl.com/assets/uploads/user/' + this.props.auth.user.signup_logo_image }}
                                            resizeMode='cover'
                                            style={{
                                                height: 76,
                                                width: 76,
                                                borderRadius: 40,
                                            }} />
                                    </View>
                                    <View style={{
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "center",
                                        width: wp("64%"),
                                    }}>
                                        <View style={{
                                            flexDirection: "row",
                                            width: wp("64%"),
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                fontFamily: "Poppins-Medium",
                                                color: "#030171",
                                            }}>
                                                {this.props.auth.user.signup_firstname} {this.props.auth.user.signup_lastname}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => { this.showModal() }}
                                                style={{
                                                    backgroundColor: "#030171",
                                                    height: 25,
                                                    width: 74,
                                                    borderRadius: 40,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                <Text style={{
                                                    fontSize: 13,
                                                    fontFamily: "Poppins-Medium",
                                                    color: "white",
                                                }}>
                                                    Reply
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Moment
                                            date={this.props.auth.user.signup_createdon}
                                            element={Text} style={{
                                                fontSize: 10,
                                                fontFamily: "Poppins-Regular",
                                                color: "gray",
                                                bottom: 10
                                            }} format="hh:mm A | DD MMM">{this.props.auth.user.signup_createdon ?? ""}</Moment>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.comments}
                                keyExtractor={(item, index) => (item.service_detail_comment_id)}
                                ListHeaderComponent={
                                    <>
                                        <View style={{
                                            width: wp("100%"),
                                        }}>
                                            <View style={{
                                                alignSelf: "center",
                                                width: wp("84%"),
                                            }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontFamily: "Poppins-Regular",
                                                    color: "gray",
                                                    paddingVertical: 10
                                                }}>{this.state.description}</Text>
                                            </View>
                                        </View>
                                        {
                                            this.state.users.length > 0 && this.state.item.service_detail_attachment != "Array" ?
                                                <>
                                                    <ScrollView
                                                        horizontal={true}
                                                        showsHorizontalScrollIndicator={false}
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
                                                                this.state.users.map((item) => {
                                                                    return (
                                                                        item.service_detail_attachment.map((itm, index) => {
                                                                            return (
                                                                                <View
                                                                                    key={index}
                                                                                    style={{
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        flexDirection: "row",
                                                                                        backgroundColor: "black",
                                                                                        borderRadius: 20,
                                                                                        paddingHorizontal: 5,
                                                                                        margin: 4
                                                                                    }}>
                                                                                    <Text
                                                                                        style={{
                                                                                            fontSize: 10,
                                                                                            fontFamily: "Poppins-Italic",
                                                                                            color: "white",
                                                                                            textDecorationLine: "underline",
                                                                                            padding: 8,
                                                                                            flexDirection: "row",
                                                                                        }}>{itm}</Text>

                                                                                </View>

                                                                            )
                                                                        })
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </ScrollView>


                                                </>
                                                :
                                                null
                                        }

                                    </>
                                }
                                ListFooterComponent={<View style={{ height: (Platform.OS === 'ios') ? 100 : 80 }} />}
                                renderItem={(itm) => {
                                    return (
                                        <>
                                            {
                                                itm.item.service_detail_comment_isadmin == 1 ?
                                                    <>
                                                        <View style={{
                                                            height: 50,
                                                            width: 5,
                                                            backgroundColor: "black",
                                                            alignSelf: "center",
                                                            marginVertical: 10
                                                        }}>
                                                        </View>

                                                        <View style={{
                                                            backgroundColor: "#030171",
                                                            width: wp("90%"),
                                                            alignSelf: "center",
                                                            borderRadius: 25,
                                                        }}>
                                                            <View style={{
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                                width: wp("86%"),
                                                                alignSelf: "center",
                                                                flexDirection: "row",
                                                                padding: 10
                                                            }}>
                                                                <TouchableOpacity onPress={() => { }}
                                                                    style={{
                                                                        height: 49,
                                                                        width: 49,
                                                                        borderRadius: 40,
                                                                        backgroundColor: "white",
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }}>
                                                                    <Logo height={39} width={39} />
                                                                </TouchableOpacity>
                                                                <View style={{
                                                                    flexDirection: "column",
                                                                    alignItems: "flex-start",
                                                                    justifyContent: "space-between",
                                                                    width: wp("64%"),
                                                                }}>
                                                                    <View style={{
                                                                        flexDirection: "row",
                                                                        width: wp("64%"),
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            fontFamily: "Poppins-Medium",
                                                                            color: "white",
                                                                        }}>
                                                                            Feliksinvestigation Group
                                                                        </Text>

                                                                    </View>
                                                                    <Moment
                                                                        date={itm.item.service_detail_comment_createdon}
                                                                        element={Text} style={{
                                                                            fontSize: 10,
                                                                            fontFamily: "Poppins-Regular",
                                                                            color: "white",
                                                                        }} format="hh:mm A | DD MMM">{itm.item.service_detail_comment_createdon ?? ""}</Moment>
                                                                </View>
                                                            </View>
                                                            <View style={{
                                                                alignSelf: "center",
                                                                width: wp("82%"),
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 10,
                                                                    fontFamily: "Poppins-Regular",
                                                                    color: "#D6D6D6",
                                                                    paddingVertical: 10
                                                                }}>{itm.item.service_detail_comment_text}</Text>
                                                            </View>
                                                            {
                                                                itm.item.service_detail_comment_attachment.length > 0 ?

                                                                    <>
                                                                        {
                                                                            itm.item.service_detail_comment_attachment.map(item => {
                                                                                return (
                                                                                    <View style={{
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        flexDirection: "row",
                                                                                        backgroundColor: "black",
                                                                                        borderRadius: 20,
                                                                                        paddingHorizontal: 4,
                                                                                        margin: 4,
                                                                                        marginBottom: 6,
                                                                                        marginHorizontal: 15
                                                                                    }}>
                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 10,
                                                                                                fontFamily: "Poppins-Italic",
                                                                                                color: "white",
                                                                                                textDecorationLine: "underline",
                                                                                                padding: 6,
                                                                                                paddingHorizontal: 15,
                                                                                                flexDirection: "row"
                                                                                            }}>{item}</Text>
                                                                                    </View>
                                                                                )
                                                                            })
                                                                        }

                                                                    </>
                                                                    :
                                                                    null
                                                            }

                                                        </View>
                                                    </>
                                                    :
                                                    null
                                            }

                                            {
                                                itm.item.service_detail_comment_isadmin == 0 ?
                                                    <>
                                                        <View style={{
                                                            height: 50,
                                                            width: 100,
                                                            marginVertical: 10,
                                                            position: "absolute",
                                                            left: 40,
                                                            borderLeftColor: "black",
                                                            borderBottomColor: "black",
                                                            borderBottomWidth: 5,
                                                            borderLeftWidth: 5,
                                                        }}>
                                                        </View>
                                                        <View style={{
                                                            backgroundColor: "white",
                                                            width: wp("74%"),
                                                            alignSelf: "center",
                                                            borderRadius: 25,
                                                            marginLeft: 50,
                                                            borderWidth: 1,
                                                            marginTop: 10
                                                        }}>

                                                            <View style={{
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                                width: wp("70%"),
                                                                alignSelf: "center",
                                                                flexDirection: "row",
                                                                paddingHorizontal: 10,
                                                                paddingTop: 10,
                                                                elevation: 4
                                                            }}>
                                                                <View
                                                                    style={{
                                                                        height: 49,
                                                                        width: 49,
                                                                        borderRadius: 40,
                                                                        backgroundColor: "white",
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }}>
                                                                    <Image
                                                                        source={{ uri: 'https://feliksinvestigationsgroupfl.com/' + this.props.auth.user.signup_logo_image_path + this.props.auth.user.signup_logo_image }}
                                                                        resizeMode='cover'
                                                                        style={{
                                                                            height: 46,
                                                                            width: 46,
                                                                            borderRadius: 40,
                                                                        }} />
                                                                </View>
                                                                <View style={{
                                                                    flexDirection: "column",
                                                                    alignItems: "flex-start",
                                                                    justifyContent: "center",
                                                                    width: wp("48%"),
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 12,
                                                                        fontFamily: "Poppins-Medium",
                                                                        color: "#030171",
                                                                    }}>
                                                                        {this.props.auth.user.signup_firstname} {this.props.auth.user.signup_lastname}
                                                                    </Text>
                                                                    <Moment
                                                                        date={itm.item.service_detail_comment_createdon}
                                                                        element={Text} style={{
                                                                            fontSize: 10,
                                                                            fontFamily: "Poppins-Regular",
                                                                            color: "gray",
                                                                        }} format="hh:mm A | DD MMM">{itm.item.service_detail_comment_createdon ?? ""}</Moment>
                                                                </View>
                                                            </View>
                                                            <View style={{
                                                                alignSelf: "center",
                                                                width: wp("62%"),
                                                            }}>
                                                                <Text
                                                                    numberOfLines={3}
                                                                    ellipsizeMode='tail'
                                                                    style={{
                                                                        fontSize: 10,
                                                                        fontFamily: "Poppins-Regular",
                                                                        color: "gray",
                                                                        paddingVertical: 10
                                                                    }}>{itm.item.service_detail_comment_text}</Text>
                                                            </View>
                                                            {
                                                                itm.item.service_detail_comment_attachment.length > 0 ?

                                                                    <>
                                                                        {
                                                                            itm.item.service_detail_comment_attachment.map(item => {
                                                                                return (
                                                                                    <View style={{
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        flexDirection: "row",
                                                                                        backgroundColor: "black",
                                                                                        borderRadius: 20,
                                                                                        paddingHorizontal: 4,
                                                                                        margin: 4,
                                                                                        marginBottom: 6,
                                                                                        marginHorizontal: 15
                                                                                    }}>
                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 10,
                                                                                                fontFamily: "Poppins-Italic",
                                                                                                color: "white",
                                                                                                textDecorationLine: "underline",
                                                                                                padding: 6,
                                                                                                paddingHorizontal: 15,
                                                                                                flexDirection: "row"
                                                                                            }}>{item}</Text>
                                                                                    </View>
                                                                                )
                                                                            })
                                                                        }

                                                                    </>
                                                                    :
                                                                    null
                                                            }
                                                        </View>
                                                    </>
                                                    :
                                                    null
                                            }

                                        </>
                                    )
                                }}
                            />
                        </>
                        :
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                paddingVertical: 25,
                                fontSize: 15,
                                fontFamily: "Poppins-Regular",
                                color: "#A5A5A5",
                            }}>Waiting for Admin Response!</Text>
                        </View>
                }
                <RestDialogBox />
                {
                    this.state.ismodalshow === true ?
                        <Modal ismodalshow={this.state.ismodalshow}
                            closemodal={this.closeModal} CallBack={this.props.route.params}
                            onRegion={this.state.service_detail_id}
                        />
                        :
                        null
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
    comments: state.service.comments
});

const mapDispatchToProps = dispatch => ({
    getservicedetailscomments: (payload) => dispatch(getservicedetailscomments(payload)),
    restAction: payload => dispatch(restAction(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services)
