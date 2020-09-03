import React from 'react';
import { View, Text } from 'react-native';

const HomeText = ({ color,title,amount }) => {
    return (
        <View style={{marginHorizontal: 40}}>
           <Text style={{color: color, textAlign: 'center'}}>{title}</Text>
           <Text style={{color: color, textAlign: 'center'}}>{amount}</Text>
        </View>
    )
}

export default HomeText;