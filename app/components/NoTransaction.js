import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NoTransaction = ({ text }) => {
    return (
        <View style={{alignItems: 'center', marginBottom: 15}}>
            <Icon name="credit-card" size={100} color="#4b81bf" style={{marginTop: 20}} />
            <Text style={{fontSize: 16, color: '#4b81bf'}}>No Transaction found {text}</Text>
        </View>
    )
}

export default NoTransaction;