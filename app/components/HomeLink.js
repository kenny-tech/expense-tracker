import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const HomeLink = ({ customClick,backgroundColor,icon,textColor,text }) => {
    return (
        <TouchableOpacity onPress={customClick}>
            <View style={[styles.homeLinkView, {backgroundColor: backgroundColor, flexDirection: 'row', elevation: 2, borderWidth:0.5, borderColor:'grey'}]}>
                <Icon name={icon} size={20} color={textColor} style={{marginTop: 12, marginLeft: 20}} />
                <Text style={[styles.homeLinkText, {color: textColor, marginTop: 12}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeLink;