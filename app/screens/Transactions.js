import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TransactionMonth from '../components/TransactionMonth';
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

    useEffect(() => {
        currentMonthYear();
    }, []);    

    const [monthName, setMonthName] = useState('');
    const [year, setYear] = useState('');

    const currentMonthYear = () => {
        let today = new Date();
        let yyyy = today.getFullYear();

        let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

        let d = new Date();
        let currentMonth = months[d.getMonth()];

        setMonthName(currentMonth);
        setYear(yyyy);
    }

    return (
        <View>
            <TransactionMonth monthName={monthName} year={year} />
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