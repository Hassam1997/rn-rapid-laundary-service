import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, ImageBackground, StatusBar, ScrollView, FlatList, SectionList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getservicebyid, getservice } from '../actions/investigationActions';
import { connect } from 'react-redux';
import { restAction } from "../actions/constant";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


class MyCases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            artistArr: [],
            item: '',
            isUpdatesShow: true,
            isOngoingShow: false,
            isResolvedShow: false,
        }
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.getservicebyid({})
        })
        // for (var i = 0; i < this.props.servicebyid.length; i++) {
        //     console.log("w", this.props.servicebyid[i].service_detail_attachment);
        // }
    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    onChangeValue = (value) => {
        this.setState(prev => ({
            isUpdatesShow: false,
            isOngoingShow: false,
            isResolvedShow: false,
            ...{ [value]: true }
        }))
        if (value === "isUpdatesShow") {
            this.setState({
                isUpdatesShow: true
            })
        }
        if (value === "isOngoingShow") {
            this.setState({
                isOngoingShow: true
            })
        }
        if (value === "isResolvedShow") {
            this.setState({
                isResolvedShow: true
            })
        }
    }
    render() {
        const styles = StyleSheet.create({
            container: { flex: 1, backgroundColor: "#ECF5FD" },
        });
        return (
            <SafeAreaView
                style={styles.container}>

                <View style={{
                    width: wp("100%"),
                    height: 80,
                    justifyContent: "flex-end"
                }}>

                    <View style={{
                        height: 40,
                        alignSelf: "center",
                        width: wp("100%"),
                        paddingHorizontal: 25,
                    }}>
                        <Text style={{
                            fontSize: 23,
                            fontFamily: "Poppins-SemiBold",
                            color: "black",
                        }}>My Cases</Text>
                    </View>
                </View>
                {
                    this.props.servicebyid.length > 0 ?
                        <>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.servicebyid}
                                keyExtractor={(item, index) => {
                                    return item.service_detail_id;
                                }}
                                ListFooterComponent={<View style={{ height: 80 }} />}
                                renderItem={(itm) => {
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Services", { name: itm.item }) }}
                                                style={{
                                                    backgroundColor: "#ECF5FD",
                                                    alignItems: "center",
                                                    justifyContent: "space-evenly",
                                                    width: wp("100%"),
                                                    marginVertical: 10
                                                }}>
                                                <View style={{
                                                    width: wp("88%"),
                                                    backgroundColor: "white",
                                                    borderRadius: 10,
                                                    alignItems: "flex-start",
                                                    padding: 10,
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                }}>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}>
                                                        <View style={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            justifyContent: "flex-start",
                                                            width: wp("74%"),
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 11,
                                                                fontFamily: "Poppins-SemiBold",
                                                                color: "#030171",
                                                                paddingVertical: 3,
                                                                paddingLeft: 10
                                                            }}>{itm.item.service_detail_service_title}</Text>
                                                        </View>
                                                    </View>
                                                    <Text
                                                        style={{
                                                            width: wp("82%"),
                                                            fontSize: 9,
                                                            fontFamily: "Poppins-SemiBold",
                                                            color: "black",
                                                            paddingVertical: 5,
                                                            paddingLeft: 10
                                                        }}>{itm.item.service_detail_title}</Text>
                                                    <Text
                                                        style={{
                                                            paddingVertical: 5,
                                                            fontSize: 10,
                                                            fontFamily: "Poppins-Regular",
                                                            color: "#A5A5A5",
                                                            paddingLeft: 10
                                                        }}>{itm.item.service_detail_description}</Text>
                                                </View>
                                            </TouchableOpacity>
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
                            }}>No Submitted Query Yet!</Text>
                        </View>
                }
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
    servicebyid: state.service.servicesbyid
});

const mapDispatchToProps = dispatch => ({
    getservicebyid: (payload) => dispatch(getservicebyid(payload)),
    restAction: payload => dispatch(restAction(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCases)

