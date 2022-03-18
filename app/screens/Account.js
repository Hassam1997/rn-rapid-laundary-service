import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { logout, authUser } from '../actions/auth/authAction';

function Account(props) {

    const [place, setPlace] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')

    const locationadd = async () => {
        props.logout()
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>
            <View style={{ height: 60, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: wp('90%'), height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: wp('30%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Account</Text>
                    </View>

                    <View style={{ width: wp('30%'), alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Edit') }}>
                            <View style={{ width: 45, height: 45, backgroundColor: '#189BCF', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/edit.png')}
                                    style={{ alignSelf: "center" }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 120, width: 120, backgroundColor: '#F1ECEC', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>HM</Text>
                </View>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>{props.auth.user.signup_email}</Text>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{props.auth.user.signup_phone}</Text>
            </View>

            <View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('90%'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Account Credits : $0.00</Text>
                </View>
            </View>

            <View style={{ height: 450, alignItems: 'center', justifyContent: 'center', justifyContent: 'space-evenly' }}>
                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <TouchableOpacity>
                        <View>
                            <Image source={require('../assets/location.png')} />
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#189BCF', paddingHorizontal: 10 }}>{props.auth.user.signup_address}</Text>
                </View>

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <View>
                        <Image source={require('../assets/credit.png')} />
                    </View>
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Payment</Text>
                </View>

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <View>
                        <Image source={require('../assets/setting.png')} />
                    </View>
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Preferences</Text>
                </View>

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <View>
                        <Image source={require('../assets/bages.png')} />
                    </View>
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Free Laundry</Text>
                </View>

                <TouchableOpacity onPress={() => locationadd()}>
                    <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View>
                            <Image source={require('../assets/logout.png')} />
                        </View>
                        <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>



        </ScrollView>


    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
    authUser: payload => dispatch(authUser(payload)),
    restAction: payload => dispatch(restAction(payload)),
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);