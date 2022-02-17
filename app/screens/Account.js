import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

const Account = () => {
    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 80,  justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: wp('90%'), height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: wp('30%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Account</Text>
                    </View>

                    <View style={{ width: wp('30%'), alignItems: 'flex-end', justifyContent: 'center' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#189BCF', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/edit.png')} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 120, width: 120, backgroundColor: '#F1ECEC', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>HM</Text>
                </View>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>h@gmail.com</Text>
            </View>

            <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>(415) 555 - 2671</Text>
            </View>

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('80%'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Account Credits : $0.00</Text>
                </View>
            </View>

            <View style={{ height: 450, alignItems: 'center', justifyContent: 'center', justifyContent: 'space-evenly' }}>
                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <View>
                        <Image source={require('../assets/location.png')} />
                    </View>
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Address</Text>
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

                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                    <View>
                        <Image source={require('../assets/logout.png')} />
                    </View>
                    <Text style={{ color: '#189BCF', paddingHorizontal: 10 }}>Logout</Text>
                </View>
            </View>



        </ScrollView>


    )
}

export default Account