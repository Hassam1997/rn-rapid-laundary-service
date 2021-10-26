import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CloseCircle from '../assets/close-circle.svg';
import DocumentPicker from 'react-native-document-picker';
import { connect } from "react-redux";
import { authUser } from "../actions/authAction";
import RestDialogBox from "../components/RestDialogBox";
import { restAction, API_CONTS, storeData } from "../actions/constant";
import { callAPI, updateAPIConfig } from "../api";
import { getservicedetailscomments } from '../actions/investigationActions';
import Entypo from 'react-native-vector-icons/Entypo';

let fileData = {}

function ServicesModal(props) {

  const [filePath, setFilePath] = useState([]);
  const [service_detail_id, setServiceDetailId] = useState(props.onRegion);
  const [getcomment, setGetComment] = useState(props.CallBack);
  const [comments, setComments] = useState('');


  // useEffect(() => {
  //   console.log("hey",);

  // }, [])

  const documentPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })
      for (const key of res) {
        const fileData = {
          fileCopyUri: key.fileCopyUri,
          uri: key.uri,
          type: key.type,
          size: key.size,
          name: key.name,
        }
        // Object.assign(res, {
        //   fileCopyUri: key.fileCopyUri,
        //   uri: key.uri,
        //   type: key.type,
        //   size: key.size,
        //   name: key.name,
        // })

        setFilePath(filePath => [...filePath, fileData])
        console.log("arr", filePath)
      }


    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  const submitClick = () => {
    try {
      const restInit = {
        IS_LOADING: true,
        RETURN: false,
        IS_RETURN: false,
        RETURN_MESSAGE: "Something wrong",
      }
      props.restAction(restInit);
      let data = new FormData();
      data.append("service_detail_id", service_detail_id),
        data.append("comment", comments)
      for (let i = 0; i < filePath.length; i++) {
        data.append(`attachment[${i}]`, filePath[i])
      }
      const postsData = (callAPI(API_CONTS.ADDSERVICEDETAILCOMMENT, "post", data).then(res => {
        props.closemodal(false);
        props.getservicedetailscomments(getcomment);
        
        if (res.success === true) {
          restInit.IS_LOADING = false;
          restInit.RETURN_MESSAGE = res.responseDescription;
          restInit.IS_RETURN = true;
          restInit.RETURN = res.success;
          setComments(''),
            setFilePath([]),
            props.restAction(restInit);
        }
      }));

    } catch (error) {
      props.restAction(
        {
          IS_LOADING: false,
          IS_RETURN: true,
          RETURN: false,
          RETURN_MESSAGE: "Network request failed"
        });
    }

  }

  const documentName = (deleteIndex) => {
    setFilePath(filePath.filter((value, index) => index != deleteIndex))
  }

  const comment = () => {
    props.closemodal()
    props.navigation()
  }
  return (
    <Modal
      propagateSwipe={true}
      isVisible={props.ismodalshow}
      animationOut='fadeInLeft'
      swipeDirection={'down'}
      onSwipeComplete={() => props.closemodal(false)}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
          <View style={{
            paddingVertical: 10, width: wp("90%"), alignSelf: "center",
          }}>
            <View style={{
              backgroundColor: "white",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <TouchableOpacity onPress={() => { props.closemodal(false) }}
                style={{
                  top: 10,
                  right: 20,
                  alignSelf: "flex-end"
                }}>
                <CloseCircle height={25} width={25} />
              </TouchableOpacity>
              <View style={{
                width: wp("80%"),
                alignSelf: "center",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 10
              }}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                  color: "black"
                }}>Add Reply</Text>
              </View>

              <View style={{
                width: wp("80%"),
                backgroundColor: "white",
                height: 50,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "gray",
                borderWidth: 1,
                margin: 10,
                flexDirection: "row",
                borderRadius: 25
              }}>
                <TextInput
                  placeholderTextColor='#707070'
                  placeholder="Reply...."
                  placeholderTextColor="#c0c0c0"
                  autoCapitalize='none'
                  onChangeText={(text) => setComments(text)}
                  value={comments}
                  style={{
                    width: wp('70%'),
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                    color: "#7A86A1",
                  }}
                />
              </View>
              <View style={{
                height: hp("18%"),
              }}>

                {
                  filePath.length > 0 ?
                    <>
                      <ScrollView
                        horizontal
                        style={{
                          marginHorizontal: 10
                        }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          alignSelf: "center",
                        }}>
                          {
                            filePath.map((item, index) => {
                              return (
                                <>
                                  <View
                                    key={index}
                                    style={{
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexDirection: "row",
                                      backgroundColor: "black",
                                      borderRadius: 20,
                                      padding: 5,
                                      margin: 4
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        fontFamily: "Poppins-Italic",
                                        color: "white",
                                        textDecorationLine: "underline",
                                        padding: 8,
                                        flexDirection: "row"
                                      }}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => { documentName(index) }}>
                                      <Entypo name="circle-with-cross" color="white" size={15} />
                                    </TouchableOpacity>
                                  </View>

                                </>
                              )
                            })
                          }
                        </View>
                      </ScrollView>
                    </>
                    :
                    null
                }

                <TouchableOpacity onPress={() => { documentPicker() }}
                  style={{
                    width: wp("80%"),
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 50,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                    flexDirection: "row",
                    borderColor: "#030171",
                    borderWidth: 1
                  }}>
                  <Text style={{
                    color: "#030171",
                    fontSize: 12,
                    fontFamily: "Poppins-Medium",
                  }}>Attach Files</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { submitClick() }}>
                <View style={{
                  width: wp("80%"),
                  backgroundColor: "#030171",
                  borderRadius: 10,
                  height: 50,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                  flexDirection: "row",
                  borderColor: "#030171",
                  borderWidth: 1
                }}>
                  <Text style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Poppins-Regular",
                  }}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <RestDialogBox  /> */}


    </Modal>


  );
}

// export default ServicesModal;
const mapStateToProps = state => ({
  auth: state.auth,
  rest: state.rest,
});

const mapDispatchToProps = dispatch => ({
  getservicedetailscomments: (payload) => dispatch(getservicedetailscomments(payload)),
  restAction: payload => dispatch(restAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesModal)
