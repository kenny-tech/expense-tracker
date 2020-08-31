import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const ChartDescription = () => {
    return (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
            <View style={styles.incomeTextDescriptionBg}/>
            <Text style={{marginRight: 10}}> Income</Text>
            <View style={styles.expenseTextDescriptionBg}/>
            <Text> Expense</Text>                
        </View>
    )
}

export default ChartDescription;