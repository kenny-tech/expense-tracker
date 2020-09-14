import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';
import { DB } from '../model/db';

const TransactionText = () => {
    
    const [transactions, setTransactions] = useState([]);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const convertDate = (date_str) => {
        let temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + ", " + temp_date[0];
    }

    const getTransactions = () => {
        DB.transaction(tx => {
            // tx.executeSql(`SELECT * FROM transactions WHERE strftime('%m', date) = ?`, [currentMonth], (tx, results) => {
            tx.executeSql(`SELECT * FROM transactions ORDER BY date DESC`, [], (tx, results) => {
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
                        <View>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="money" size={30} color="#4b81bf" style={{marginTop: 20, marginHorizontal: 20}} />
                            <View style={styles.transactionViewText}>
                                <Text style={styles.transactionText}>{trans.amount}</Text>
                                <Text style={{fontStyle: 'italic'}}>{convertDate(trans.date)}</Text>
                            </View>  
                            <Icon name="angle-right" size={30} color="#4b81bf" style={{marginTop: 20, marginLeft: 210}} /> 
                        </View>
                        <View style={{borderBottomWidth: 1, marginHorizontal: 20, width: 350, padding: 5, borderColor: '#d3d3d3'}}></View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default TransactionText;