import React from "react";
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView, Dimensions, Modal } from "react-native";
import PropTypes from 'prop-types';


export default class Loader extends React.Component {
    static propTypes = {
        animating: PropTypes.bool
    }
    render() {
        return (
            <Modal visible = {this.props.animating} transparent = {true}>
                <ActivityIndicator style = {{flex:1}} size = "large" color = "white" animating={this.props.animating} />
            </Modal>
        )
    }
}