import { View, Text, Image, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import RestDialogBox from '../components/RestDialogBox';
import { callAPI } from "../api";
import { restAction, restActionValue } from '../actions/rest/restAction';
import { logout, authUser } from '../actions/auth/authAction';
import { AUTH, API_CONTS, storeData, getData, removeData } from '../actions/auth/constants';
import Button from '../components/Buttons';

function EditProfile(props) {
    const [currentpassword, setCurrentPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [Newpassword, setNewPassword] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [selection, setSelection] = useState(Platform.OS === 'android' ? { start: 0 } : null)

    useEffect(() => {
        setFirstName(props.auth.user.signup_firstname)
        setMobile(props.auth.user.signup_phone)
        setAddress(props.auth.user.signup_address)
    }, [])

    const onFocus = () => {
        if (Platform.OS === 'android') {
            setSelection(null);
        }
    }

    const onBlur = () => {
        if (Platform.OS === 'android') {
            setSelection({ start: 0 });
        }
    }

    const updateUser = async () => {
        try {
            let data = new FormData();
            const restInit = {
                IS_LOADING: true,
                RETURN: false,
                IS_RETURN: false,
                RETURN_MESSAGE: "Something wrong",
            }
            // props.restAction(restInit);
            data.append("firstname", firstName)
            data.append("address", address)
            data.append("mobile", mobile)
            const postsData = callAPI(API_CONTS.UPDATEPROFILE, "POST", data).then(res => {
                console.log(res)
                restInit.IS_LOADING = false;
                restInit.RETURN_MESSAGE = res.responseDescription;
                restInit.IS_RETURN = true;
                restInit.RETURN = res.success;
                props.restAction(restInit);
                if (res.success === true) {
                    const authUserInit = {
                        userAuthenticates: true,
                        id: res.user.signup_id,
                        user: res.user,
                    }
                    setUserData(authUserInit);
                    props.authUser(authUserInit);
                }
            });
        } catch (e) {
            console.log("error", e)
        }
    }

    const setUserData = async (authUserInit) => {
        await storeData("userAuthenticates", authUserInit.userAuthenticates);
        await storeData("id", authUserInit.id);
        await storeData("user", JSON.stringify(authUserInit.user));
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 120, width: 120, backgroundColor: '#F1ECEC', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>HM</Text>

                    <TouchableOpacity style={{ position: 'absolute', height: 150, justifyContent: 'flex-end' }} onPress={() => { }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#189BCF', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/edit.png')} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{props.auth.user.signup_email}</Text>
            </View>





            <View style={{ height: 370, alignItems: 'center', justifyContent: 'center', justifyContent: 'space-evenly' }}>

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'Firstname'}
                        onChangeText={(value) => setFirstName(value)}
                        value={firstName}
                    />
                </View>

                {/* <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'Current Password'}
                        onChangeText={(value) => setCurrentPassword(value)}
                        value={currentpassword}
                    />
                </View> */}

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'New Password'}
                        onChangeText={(value) => setNewPassword(value)}
                        value={Newpassword}
                    />


                </View>


                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        selection={selection}
                        onFocus={() => onFocus()}
                        onBlur={() => onBlur()}
                        style={{ width: wp('80%'), height: 50 }}
                        onChangeText={(value) => setAddress(value)}
                        value={address}
                    />
                </View>


                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'Mobile'}
                        onChangeText={(value) => setMobile(value)}
                        value={mobile.toString()}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                    updateUser()
                }}>
                <Button text={'Save'} />
            </TouchableOpacity>
            <RestDialogBox />
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
)(EditProfile)