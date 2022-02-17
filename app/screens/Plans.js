import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Plans = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>


            <View style={{ flexDirection: 'row', height: 30, }}>

                <View style={{ width: wp('20%') }}></View>

                <View style={{ width: wp('100%'), justifyContent: 'flex-end', paddingHorizontal: 50 }}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Fold Services</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', height: 30, }}>

                <View style={{ width: wp('20%') }}></View>

                <View style={{ width: wp('100%'), justifyContent: 'flex-end', paddingHorizontal: 36 }}>
                    <Text style={{ fontSize: 17,  color:'#189BCF' }}>Your Title Will Be There</Text>
                </View>
            </View>

            <View style={{ height: 370, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 310, width: 310, backgroundColor: '#189BCF', borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/cloth.png')} />
                </View>
            </View>

            <View style={{ height: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: wp('90%'), height: 70, borderRadius: 15 }}>
                    <View style={{ width: wp('20%'), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 200, borderColor: '#707070' }}>

                        </View>
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <View >
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                Monthly Plan
                            </Text>
                            <Text>
                                $9.99/Month Billed Annually
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: wp('90%'), height: 70, borderWidth: 2, borderRadius: 15, borderColor: '#189BCF' }}>
                    <View style={{ width: wp('20%'), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#189BCF', borderRadius: 200, borderColor: '#707070', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/checksm.png')} />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <View >
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#189BCF' }}>
                                Weekly Plan
                            </Text>
                            <Text>
                                $9.99/Month Billed Annually
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: 90, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('ExploreNew') }}>
                    <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('90%'), borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Continue</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default Plans