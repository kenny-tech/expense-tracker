import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const HomeLink = (props) => {
    return (
        <TouchableOpacity onPress={props.customClick}>
            <View style={[styles.homeLinkView, {backgroundColor: props.backgroundColor, flexDirection: 'row'}]}>
                <Icon name={props.icon} size={30} color={props.textColor} style={{marginTop: 20, marginLeft: 20}} />
                <Text style={[styles.homeLinkText, {color: props.textColor, marginTop: 25}]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeLink;