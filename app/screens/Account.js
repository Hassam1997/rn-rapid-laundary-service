import { View, Text, Image, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RemoveData = async () => {


    await AsyncStorage.removeItem('Token')


}

const Account = ({ navigation }) => {

    const [place, setPlace] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')

    const locationadd = async () => {


        const address = await AsyncStorage.getItem('@address')
        const contact = await AsyncStorage.getItem('@phone')
        const email = await AsyncStorage.getItem('@email')

        setPlace(address)
        setContact(contact)
        setEmail(email)

        // console.log('hsadjasjda')
    }

    useEffect(()=>{
        locationadd()
    })



    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 80, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: wp('90%'), height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: wp('30%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Account</Text>
                    </View>

                    <View style={{ width: wp('30%'), alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Edit') }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#189BCF', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/edit.png')} />
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
                <Text style={{ fontSize: 20 }}>{email}</Text>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>(415) {contact}</Text>
            </View>

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('80%'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
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
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>{place}</Text>
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

                <TouchableOpacity onPress={() => RemoveData()}>
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

export default Account