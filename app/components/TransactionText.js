import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const TransactionText = () => {
    return (
        <View style={{flexDirection: 'row' }}>
            <Icon name="calendar" size={30} color="#4b81bf" style={{marginTop: 20, marginLeft: 20}} />
            <View style={styles.transactionViewText}>
                <Text style={styles.transactionText}>N5,000</Text>
                <Text>Business</Text>
                <View style={{borderBottomWidth: 1, width: 280, padding: 5, borderColor: '#d3d3d3'}}></View>
            </View>  
            <Icon name="angle-right" size={30} color="#4b81bf" style={{marginTop: 20, marginLeft: 5}} /> 
        </View>
    )
}

export default TransactionText;