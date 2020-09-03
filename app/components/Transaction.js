import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const Transaction = ({ label,amount }) => {
    return (
        <View style={styles.transaction}>
            <Text style={styles.transactionTextSize}>{label}</Text>
            <Text style={[styles.transactionTextSize, {fontWeight: 'bold'}]}>{amount}</Text>
        </View>
    )
}

export default Transaction;