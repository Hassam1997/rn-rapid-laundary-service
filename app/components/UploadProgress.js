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
import { getservicedetailscomments, getservicedetailscommentsrefresh } from '../actions/investigationActions';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';

function UploadProgress(props) {
    console.log("P",props.process)
    return (
        <View style={{
            height: 100,
            width: 100
        }}>
            <Progress.Bar progress={props.process} width={200} />
        </View>
    );
}

export default UploadProgress;
