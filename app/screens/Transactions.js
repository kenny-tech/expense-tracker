import React from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TransactionText from '../components/TransactionText';
import styles from '../styles/style';

const Transactions = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert('Filter Transactions', 'Filtering transactions...')}>
                <Icon name="filter" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);

    return (
        <View>
            <View style={styles.transactionView}>
                <TransactionText/>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.bottomViewText}>Balance: NGN20,000.00 </Text>
            </View>
        </View>
    )
}

export default Transactions;