import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const HomeLink = ({ customClick,backgroundColor,icon,textColor,text }) => {
    return (
        <TouchableOpacity onPress={customClick}>
            <View style={[styles.homeLinkView, {backgroundColor: backgroundColor, flexDirection: 'row'}]}>
                <Icon name={icon} size={25} color={textColor} style={{marginTop: 15, marginLeft: 20}} />
                <Text style={[styles.homeLinkText, {color: textColor, marginTop: 15}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeLink;