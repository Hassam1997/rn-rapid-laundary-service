import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Data = [
    {
        id: '1',
        name: 'user Name 1',
        Noti: 'loram jsabd bab dawbdh bakdbksabdui wbakdbsakj budasbk',
    },
    {
        id: '2',
        name: 'user Name 2',
        Noti: 'loram jsabd bab dawbdh bakdbksabdui wbakdbsakj budasbk',
    },
    {
        id: '3',
        name: 'user Name 3',
        Noti: 'loram jsabd bab dawbdh bakdbksabdui wbakdbsakj budasbk',
    },
    {
        id: '4',
        name: 'user Name 4',
        Noti: 'loram jsabd bab dawbdh bakdbksabdui wbakdbsakj budasbk',
    },
    {
        id: '5',
        name: 'user Name 5',
        Noti: 'loram jsabd bab dawbdh bakdbksabdui wbakdbsakj budasbk dsad wa dawsad dsad wad sawa daw  ',
    },
    
    
]

const Notification = () => {

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList

                data={Data}
                renderItem={({ item }) => {

                    return (
                        <View>
                            <View style={{ height: hp('13%'),  alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
                                <View style={{ height: 80, backgroundColor: '#F1ECEC', width: wp('90%'), borderRadius: 10 }}>
                                    <View style={{height:30, }}>
                                        <Text style={{color:'black', fontWeight:'bold', fontSize:20, paddingHorizontal:15}}>{item.name}</Text>
                                    </View>
                                    <View style={{height:50, }}>
                                        <Text ellipsizeMode='tail' numberOfLines={2} style={{color:'black', fontSize:15, paddingHorizontal:15}}>{item.Noti}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Notification