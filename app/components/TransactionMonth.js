import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const TransactionMonth = () => {
    return (
        <View style={styles.transactionMonth}>
            <Text style={styles.transactionMonthText}>August 2020</Text>
        </View>
    )
}

export default TransactionMonth;