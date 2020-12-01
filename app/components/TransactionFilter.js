import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import styles from '../styles/style';
import { DB } from '../model/db';
import TransactionMonth from '../components/TransactionMonth';
import NoTransaction from '../components/NoTransaction';

const TransactionFilter = ({ filterBy }) => {
    
    const [transactions, setTransactions] = useState([]);
    const [currency, setCurrency] = useState('');
    const [editing, setEditing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    // check if screen is focused
    const isFocused = useIsFocused('');
        
    const navigation = useNavigation();

    useEffect(() => {
        getSetting();
    },[]);

    useEffect(() => {
        getTransactions();
    },[isFocused]);

    const convertDate = (date_str) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
    }

    const getTransactions = () => {
        if(filterBy == 'This Month') {
            let month = new Date().getMonth()+1;     
            let monthNumber = getMonthNumber(month);
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE strftime('%m', date) = ? ORDER BY rowid DESC`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    console.log('Transactions: ',temp);
                    setTransactions(temp);
                })
            });
        } else if(filterBy == 'Last Month') {
            let month = new Date().getMonth();     
            let monthNumber = getMonthNumber(month);
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE strftime('%m', date) = ? ORDER BY rowid DESC`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    console.log('Transactions: ',temp);
                    setTransactions(temp);
                })
            });
        } else {
            let filter_type = filterBy.split(" - ");
            let dateFrom = filter_type[0];
            let dateTo = filter_type[1];

            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE date BETWEEN ? AND ? ORDER BY rowid DESC`, [dateFrom, dateTo], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    console.log('Transactions for date range: ',temp);
                    setTransactions(temp);
                })
            });
        }
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getMonthNumber = (month) => {
        
        let monthNumber;

        if(month == 1) {
            monthNumber = '01';
        }
        if(month == 2) {
            monthNumber = '02';
        }
        if(month == 3) {
            monthNumber = '03';
        }
        if(month == 4) {
            monthNumber = '04';
        }
        if(month == 5) {
            monthNumber = '05';
        }
        if(month == 6) {
            monthNumber = '06';
        }
        if(month == 7) {
            monthNumber = '07';
        }
        if(month == 8) {
            monthNumber = '08';
        }
        if(month == 9) {
            monthNumber = '09';
        }
        if(month == 10) {
            monthNumber = '10';
        }
        if(month == 11) {
            monthNumber = '11';
        }
        if(month == 12) {
            monthNumber = '12';
        }

        return monthNumber;
    }

    const getSetting = () => {
        DB.transaction(tx => {
            tx.executeSql(`SELECT currency FROM settings`, [], (tx, results) => {
                let len = results.rows.length;
                // console.log('length_currency: ', results.rows.item(0).currency);
                if (len > 0) {
                    setCurrency(results.rows.item(0).currency);
                } else {
                    Alert.alert('Error:','No currency found');
                }
            })
        });
    }

    const editTransaction = (transaction_id) => {
        setEditing(true);
        setTransactionId(transaction_id);
        navigation.navigate('EditTransaction', {
            transaction_id: transaction_id,
        });
    }

    return (
        <View> 
            <TransactionMonth monthName={filterBy}/>
            {
                <View>
                    {
                        transactions.length != 0 ? (<FlatList

                            data={transactions}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => editTransaction(item.rowid)}>
                                    <View style={styles.formViewTransaction}>
                                        <View style={{width: '50%'}}>
                                            {
                                                item.type == 'Income' ? (<Text style={{color: '#006400', fontSize: 18, marginLeft: 10}}>{currency+numberWithCommas(item.amount)}</Text>) :  (<Text style={{color: '#C70039', fontSize: 18, marginLeft: 10}}>{currency+numberWithCommas(item.amount)}</Text>)
                                            }
                                            <Text style={{fontStyle: 'italic', marginLeft: 8}}>{convertDate(item.date)}</Text>
                                        </View>
                                        <View style={{width: '50%'}}>
                                            <Icon name="angle-right" size={40} color="#4b81bf" style={{marginLeft: 160}} /> 
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.rowid}
                        />) : (<View>
                                    <NoTransaction/>
                                </View>)
                    }
                </View>
            }
        </View>
    )
}

export default TransactionFilter;