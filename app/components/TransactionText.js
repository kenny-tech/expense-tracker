import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';
import { DB } from '../model/db';
import TransactionMonth from '../components/TransactionMonth';

const TransactionText = () => {
    
    const [transactions, setTransactions] = useState([]);
    const [monthName, setMonthName] = useState('All');
   
    let month = new Date().getMonth()+1;     
    let monthNumber
    
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

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const convertDate = (date_str) => {
        let temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
    }

    const getTransactions = () => {
        DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM transactions WHERE strftime('%m', date) = ?`, [monthNumber], (tx, results) => {
            // tx.executeSql(`SELECT * FROM transactions ORDER BY rowid DESC`, [], (tx, results) => {
                let temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                console.log(temp);
                setTransactions(temp);
            })
        });
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        getTransactions()
    }, []);

    return (
        <View> 
            {
                monthName == 'All' ? null : (<TransactionMonth monthName={monthName} year={year} />)
            }    
            {
                transactions.map(trans => {
                    return (
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="money" size={30} color="#4b81bf" style={{marginTop: 20, marginHorizontal: 20}} />
                                <View style={styles.transactionViewText}>
                                    {
                                        trans.type == 'Income' ? (<Text style={{color: '#006400', fontSize: 18}}>{numberWithCommas(trans.amount)}</Text>) :  (<Text style={{color: '#C70039', fontSize: 18}}>{numberWithCommas(trans.amount)}</Text>)
                                    }
                                    <Text style={{fontStyle: 'italic'}}>{convertDate(trans.date)}</Text>
                                </View>  
                                <Icon name="angle-right" size={30} color="#4b81bf" style={{marginTop: 20, marginLeft: 200}} /> 
                            </View>
                            <View style={{borderBottomWidth: 1, marginHorizontal: 20, width: 350, padding: 5, borderColor: '#d3d3d3'}}></View>
                        </View>
                    )
                })
            }
             {
                monthName == 'All' ? null : (<View style={styles.bottomView}>
                    <Text style={styles.bottomViewText}>Balance for September: NGN20,000.00 </Text>
                </View>)
            }    
        </View>
    )
}

export default TransactionText;