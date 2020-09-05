import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const TransactionMonth = ({ monthName,year }) => {
    return (
        <View style={styles.transactionMonth}>
            <Text style={styles.transactionMonthText}>{monthName} {year}</Text>
        </View>
    )
}

export default TransactionMonth;