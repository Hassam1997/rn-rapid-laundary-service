import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import SignUp from './SignUp';


const Data = [
    {
        id: '1',
        image:require('../assets/person.png'),
        type: 'Individual',
        time: '5-10Lbs/Week',
        price: 'Est.$10-19/Week',
    },
    {
        id: '2',
        image:require('../assets/couple.png'),
        type: 'Couple',
        time: '10-20Lbs/Week',
        price: 'Est.$19-39/Week',
    }
]

const header = () => {
    return (
        <ScrollView>
            <View style={{ height: 100, justifyContent: 'flex-end', alignItems: 'center' }}>

                <View style={{ height: 60, width: wp('90%'), flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pricing For:</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/locationb.png')} />
                        </View>

                        <View style={{ width: wp('17%'), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, }}>Home</Text>
                        </View>
                    </View>

                </View>

            </View>


            <View style={{ height: 200, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Image source={require('../assets/shirt.png')} />

            </View>

            <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#189BCF' }}>Wash & Fold</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#189BCF' }}>$1.94/Lb</Text>
            </View>

            <View style={{ height: 80,  alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>What Is A Typical Order Size?</Text>
            </View>
        </ScrollView>
    )
}

const Pricing = () => {
    return (


        <FlatList
            ListHeaderComponent={header}
            data={Data}
            renderItem={({ item }) => {
                return (
                
                        <View style={{flexDirection: 'row' }}>
                            <View style={{ width: wp('30%'), alignItems:'center', justifyContent:'center', height:150 }}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>{item.type}</Text>
                            </View>

                            <View style={{width:wp('22%'),  alignItems:'center', justifyContent:'center'}}>
                                <View style={{height:70, width:70, backgroundColor:'#189BCF', borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                                    <Image source={item.image}/>
                                </View>
                            </View>

                            <View style={{alignItems:'center', justifyContent:'center',}}>
                                <Text style={{fontSize:20, color:'#189BCF', fontWeight:'bold'}}>{item.time}</Text>
                                <Text style={{fontSize:17}}>{item.price}</Text>
                            </View>
                        </View>

                )
            }}

        />



    )
}

export default Pricing