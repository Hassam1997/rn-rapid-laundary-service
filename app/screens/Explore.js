import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, ImageBackground, StatusBar, ScrollView, FlatList, SectionList, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/logo.svg';
import { getservice } from '../actions/investigationActions'

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            artistArr: [],
        }
    }

    componentDidMount() {
        this.props.getservice({});
    }

    render() {
        const styles = StyleSheet.create({
            container: { flex: 1, backgroundColor: "#ECF5FD" },
        });
        return (
            <SafeAreaView
                style={styles.container}>
                <View style={{
                    flex: 1,
                    backgroundColor: "#ECF5FD",
                }}>
                    {
                        this.props.service.length > 0 ?
                            <>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.props.service}
                                    keyExtractor={(item, index) => {
                                        return item.service_id;
                                    }}
                                    ListHeaderComponent={
                                        <>
                                            <View style={{
                                                alignSelf: "center",
                                                marginVertical: 20
                                            }}>
                                                <Logo height={66} width={90} />
                                            </View>

                                            <View style={{
                                                width: wp("100%"),
                                            }}>
                                                <View style={{
                                                    height: 70,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    alignSelf: "center",
                                                    justifyContent: "space-between",
                                                    width: wp("100%"),
                                                    paddingHorizontal: 25,
                                                    marginBottom: 20
                                                }}>
                                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("MyCases") }}>
                                                        <Text style={{
                                                            fontSize: 23,
                                                            fontFamily: "Poppins-SemiBold",
                                                            color: "black",
                                                            width: 300
                                                        }}>Our Comprehensive Investigation Services</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    }
                                    ListFooterComponent={<View style={{ height: 80 }} />}
                                    renderItem={(itm, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => { this.props.navigation.navigate("SubmitRequest", { data: itm.item }) }}
                                                    style={{
                                                        padding: 10,
                                                        alignItems: "center",
                                                        justifyContent: "space-evenly",
                                                        width: wp("100%"),
                                                    }}>
                                                    <View style={{
                                                        width: wp("88%"),
                                                        backgroundColor: "white",
                                                        borderRadius: 10,
                                                        alignItems: "flex-start",
                                                        padding: 10,
                                                        borderWidth: 1,
                                                        borderColor: "#EBEBEB"
                                                    }}>
                                                        <Image
                                                            source={{ uri: 'https://feliksinvestigationsgroupfl.com/' + itm.item.service_image_path + itm.item.service_image }}
                                                            style={{
                                                                height: 20,
                                                                width: 20,
                                                            }} />
                                                        <View style={{
                                                            flexDirection: "column"
                                                        }}>
                                                            <View style={{
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 11,
                                                                    fontFamily: "Poppins-SemiBold",
                                                                    color: "#030171",
                                                                    paddingVertical: 3
                                                                }}>{itm.item.service_title}</Text>
                                                            </View>
                                                            <Text
                                                                style={{
                                                                    width: wp("82%"),
                                                                    fontSize: 11,
                                                                    fontFamily: "Poppins-Italic",
                                                                    color: "#A5A5A5",
                                                                }}>{itm.item.service_description}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }}
                                />
                            </>
                            :
                            null
                    }
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
    service: state.service.services
});

const mapDispatchToProps = dispatch => ({
    getservice: (payload) => dispatch(getservice(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore)


