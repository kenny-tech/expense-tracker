import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';
import { DB } from '../model/db';

const TransactionText = () => {

    let today = new Date();
    let currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    
    const [transactions, setTransactions] = useState([]);

    const getTransactions = () => {
        DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM transactions WHERE strftime('%m', date) = ?`, [currentMonth], (tx, results) => {
                let temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                console.log(temp);
                setTransactions(temp);
            })
        });
    }

    useEffect(() => {
        getTransactions()
    }, []);

    return (
        <View> 
            {
                transactions.map(trans => {
                    return (
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="calendar" size={30} color="#4b81bf" style={{marginTop: 20, marginHorizontal: 20}} />
                            <View style={styles.transactionViewText}>
                                <Text style={styles.transactionText}>{trans.amount}</Text>
                                <Text>{trans.category}</Text>
                                <View style={{borderBottomWidth: 1, width: 280, padding: 5, borderColor: '#d3d3d3'}}></View>
                            </View>  
                            <Icon name="angle-right" size={30} color="#4b81bf" style={{marginTop: 20, marginLeft: 5}} /> 
                        </View>
                    )
                })
            }
        </View>
    )
}

export default TransactionText;