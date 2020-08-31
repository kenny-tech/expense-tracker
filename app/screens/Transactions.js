import React from 'react';
import { View } from 'react-native';

import TransactionMonth from '../components/TransactionMonth';
import TransactionText from '../components/TransactionText';
import styles from '../styles/style';

const Transactions = () => {
    return (
        <View>
            <TransactionMonth />
            <View style={styles.transactionView}>
                <TransactionText />
            </View>
        </View>
    )
}

export default Transactions;