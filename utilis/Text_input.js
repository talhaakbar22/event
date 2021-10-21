import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import { AppText } from "./AppText";
import DatePicker from "react-native-datepicker";

class FormInput extends Component {

    static propTypes = {
        error: PropTypes.any,
        iconName: PropTypes.string,
        containerStyle: PropTypes.any,
        icon_color: PropTypes.string,
        onPress_icon: PropTypes.func,
        ForgetPassword: PropTypes.func,
        forget: PropTypes.bool,
        iconName_s: PropTypes.string,
        text_input_container: PropTypes.any
    }

    render() {
        return (
            <View style={[this.props.containerStyle]} >
                <View style={this.props.text_input_container}>
                    {this.props.iconName_s !== undefined ?
                        <AntDesign color={this.props.icon_color} size={18} name={this.props.iconName_s} />
                        : null}
                    <TextInput
                        {...this.props}
                        autoCapitalize="none"
                    />

                    {this.props.iconName !== undefined ?
                        <Entypo color={this.props.icon_color} onPress={this.props.onPress_icon} size={18} name={this.props.iconName} />
                        : null}
                </View>
                {this.props.forget &&
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={this.props.ForgetPassword}>
                        <Text style={{ textAlign: 'right', marginTop: 10, color: 'grey' }}>Forget password?</Text>
                    </TouchableOpacity>
                }
                {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
            </View>
        );
    }
}

class Date_picker extends Component {

    static propTypes = {
        error: PropTypes.any,
        dob: PropTypes.any,
        maxDate: PropTypes.any,
        onDateChange: PropTypes.func,
        containerStyle:PropTypes.any
    }

    render() {
        return (
            <View style={[this.props.containerStyle,{borderRadius:20,height:45,justifyContent:"center"}]} >
              <DatePicker
                 style={{width: '100%',color:"#33a930",fontWeight:"bold" }}
                date={this.props.dob}
                value={this.props.dob}
                mode="date"
                placeholder="D/O/B"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                 maxDate = {this.props.maxDate}
                showIcon={false}
                customStyles={{
                  dateText: { fontSize: 14, color: "#33a930", textAlign: "left", },
                  dateInput: {  alignItems: "flex-start", borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,color: "#33a930",borderBottomWidth:0 }
                }}
                onDateChange={this.props.onDateChange}
              />
                {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
            </View>
        );
    }
}
export { FormInput, Date_picker }
