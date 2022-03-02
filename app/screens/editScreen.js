import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReducer } from 'react';

const editScreen = () => {
    const [currentpassword, setCurrentPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [Newpassword, setNewPassword] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    const submitApi = async () => {


        try {
            const token = await AsyncStorage.getItem('Token')


            const formData = new FormData();

            formData.append('password', currentpassword)
            formData.append('firstname', firstName)
            formData.append('password', Newpassword)
            formData.append('address', address)
            formData.append('mobile', mobile)

            console.log(formData)

            fetch('https://custom-demo.net/rapid_laundry_dev/v1/profile/update', {
                method: 'post',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + `${token}`
                },
                body: formData
            }).then(response => response.json())
                .then(async (response) => {
                    console.log(response)
                    try {
                        await AsyncStorage.getItem('Token')

                    } catch (e) {
                        console.log('error token', e)
                    }
                }).catch(err => {
                    console.log(err)
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 70, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: wp('90%'), height: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: wp('30%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Profile</Text>
                    </View>
                </View>
            </View>

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
                <Text style={{ fontSize: 20 }}>h@gmail.com</Text>
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

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'Current Password'}
                        onChangeText={(value) => setCurrentPassword(value)}
                        value={currentpassword}
                    />
                </View>

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
                        style={{ width: wp('100%') }}
                        placeholder={'Address'}
                        onChangeText={(value) => setAddress(value)}
                        value={address}
                    />
                </View>




                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>

                    <TextInput
                        style={{ width: wp('100%') }}
                        placeholder={'Mobile'}
                        onChangeText={(value) => setMobile(value)}
                        value={mobile}
                    />
                </View>



            </View>

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { submitApi() }}>
                    <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('80%'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>



        </ScrollView>
    )
}

export default editScreen