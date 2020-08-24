import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const HomeText = (props) => {
    return (
        <View style={{marginHorizontal: 40}}>
           <Text style={{color: props.color, textAlign: 'center'}}>{props.title}</Text>
           <Text style={{color: props.color, textAlign: 'center'}}>{props.amount}</Text>
        </View>
    )
}

export default HomeText;