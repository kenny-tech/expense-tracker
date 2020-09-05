import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const TransactionMonth = ({ month,year }) => {
    return (
        <View style={styles.transactionMonth}>
            <Text style={styles.transactionMonthText}>{month} {year}</Text>
        </View>
    )
}

export default TransactionMonth;