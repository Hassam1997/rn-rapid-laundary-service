import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

const Order = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Orders</Text>
            </View>

            <View style={{ height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#189BCF' }}>You Have 1 Active Order</Text>
            </View>

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 60, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ color: '#189BCF' }}>
                        Place A New Order
                    </Text>
                </View>
            </View>

            <View style={{ height: 470, alignItems: 'center', justifyContent: 'center' }}>

                <View style={{
                    height: 410, backgroundColor: 'white', width: wp("90%"), borderRadius: 10, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,

                    elevation: 14,
                }}>
                    <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: wp('80%'), height: 60, backgroundColor: '#189BCF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}> Wash & Fold - #915480</Text>
                        </View>
                    </View>

                    <View style={{ height: 60, flexDirection: 'row', }}>

                        <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <View style={{ height: 60, backgroundColor: '#189BCF', width: 60, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/front.png')} />
                            </View>
                        </View>


                        <View style={{ width: wp('20%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 3 }}>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                        </View>

                        <View style={{ width: '17%', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <View style={{ height: 60, backgroundColor: '#888888', width: 60, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/front.png')} />
                            </View>
                        </View>

                        <View style={{ width: wp('20%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 3 }}>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                            <View style={{ height: 3, width: 9, backgroundColor: '#707070', borderRadius: 20 }}></View>

                        </View>

                        <View style={{ width: '17%', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <View style={{ height: 60, backgroundColor: '#888888', width: 60, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/front.png')} />
                            </View>
                        </View>

                    </View>

                    <View style={{ height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                            Current Status:
                        </Text>

                        <Text style={{ color: '#189BCF', marginLeft: 5, fontSize: 16, fontWeight: 'bold' }}>
                            Pickup Scheduled
                        </Text>

                    </View>

                    <View style={{ height: 140, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: wp('80%'), height: 130, backgroundColor: '#189BCF', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>
                                Schedule
                            </Text>

                            <Text style={{ color: 'white', fontSize: 17 }}>
                                Pickup : Oct 22, 5Pm - 7Pm
                            </Text>

                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Delivery : Oct 25, 7Pm - 8Pm
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: 74, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Plans')}}>
                            <View style={{ height: 60, width: wp('80%'), backgroundColor: '#189BCF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Reschedule</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={{ height: 50, alignItems: 'center' }}>
                <View style={{ width: wp('90%'), height: 50, }}>
                    <Text style={{ fontSize: 15, color: '#189BCF' }}>Get Free Laundry!</Text>
                </View>
            </View>

        </View>
    )
}

export default Order