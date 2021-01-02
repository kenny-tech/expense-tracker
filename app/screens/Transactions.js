import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { useIsFocused } from '@react-navigation/native';

import styles from '../styles/style';
import FormView from '../components/FormView';
import FilterSelect from '../components/Myselectinput';
import { DB } from '../model/db';
import DateRange from '../components/DateRange';
import NoTransaction from '../components/NoTransaction';
import TransactionMonth from '../components/TransactionMonth';

const Transactions = ({ navigation }) => {

    const [visible, setVisible] = useState(false);
    const [filterTypes, setFilterTypes] = useState([]);
    const [filterBy, setFilterBy] = useState('All');
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [filter, setFilter] = useState(false);
    const [filterType, setFilterType] = useState('All')

     // check if screen is focused
     const isFocused = useIsFocused('');
     
     const [transactions, setTransactions] = useState([]);
     const [monthName, setMonthName] = useState('All');
     const [editing, setEditing] = useState(false);
     const [transactionId, setTransactionId] = useState('');
     const [currency, setCurrency] = useState('');
 
     // listen for isFocused, if useFocused changes 
     // call the function that you use to mount the component.
     useEffect(() => {
         getTransactions();
     },[isFocused]);
 
     useEffect(() => {
        getSetting();
        getFilterTypes();
        maximumDate();
     }, []);    

     useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="filter" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);   
 
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
             // tx.executeSql(`SELECT rowid, type, amount, category, date FROM transactions WHERE strftime('%m', date) = ?`, [monthNumber], (tx, results) => {
             tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions ORDER BY rowid DESC`, [], (tx, results) => {
                 let temp = [];
                 for (let i = 0; i < results.rows.length; ++i) {
                     temp.push(results.rows.item(i));
                 }
                 setTransactions(temp);
             })
         });
     }
 
     const numberWithCommas = (x) => {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
 
     const editTransaction = (transaction_id) => {
         setEditing(true);
         setTransactionId(transaction_id);
         navigation.navigate('EditTransaction', {
             transaction_id: transaction_id,
         });
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

    const getFilterTypes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM filtertypes', [], (tx, results) => {
                let filters = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    filters.push(results.rows.item(i));
                }
                setFilterTypes(filters);
            })
        });
    }

    const maximumDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        setMaxDate(today);
    }

    const handleFilterBy = (filter_by) => { 
        setFilterBy(filter_by);
        if(filter_by === 'Date Range') {
            setShowDateRange(true);
        } else {
            setShowDateRange(false);
        }
    }

    const handleFilterTransaction = () => {
        if(filterBy === 'Date Range') {
            let filter_by = `${dateFrom} - ${dateTo}`;
            setFilterType(filter_by);
        } else {
            setFilterType(filterBy);
        }

        filterTransactions();
        setFilter(true);
        setShowDateRange(false);
    }

    const filterTransactions = () => {
        setFilter(false);
        setVisible(false);
        if(filterBy === 'This Month') {
            let month = new Date().getMonth()+1;     
            let monthNumber = getMonthNumber(month);
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE strftime('%m', date) = ? ORDER BY rowid DESC`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        } else if(filterBy === 'Last Month') {
            let month = new Date().getMonth();     
            let monthNumber = getMonthNumber(month);
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE strftime('%m', date) = ? ORDER BY rowid DESC`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        } else if(filterBy === 'All') {
            getTransactions();
        }else {
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, type, amount, category, date, mode FROM transactions WHERE date BETWEEN ? AND ? ORDER BY rowid DESC`, [dateFrom, dateTo], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        }
    }

    const getMonthNumber = (month) => {
        
        let monthNumber;

        if(month === 1) {
            monthNumber = '01';
        }
        if(month === 2) {
            monthNumber = '02';
        }
        if(month === 3) {
            monthNumber = '03';
        }
        if(month === 4) {
            monthNumber = '04';
        }
        if(month === 5) {
            monthNumber = '05';
        }
        if(month === 6) {
            monthNumber = '06';
        }
        if(month === 7) {
            monthNumber = '07';
        }
        if(month === 8) {
            monthNumber = '08';
        }
        if(month === 9) {
            monthNumber = '09';
        }
        if(month === 10) {
            monthNumber = '10';
        }
        if(month === 11) {
            monthNumber = '11';
        }
        if(month === 12) {
            monthNumber = '12';
        }
        if(month === 0) {
            monthNumber = '12';
        }

        return monthNumber;
    }

    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <TransactionMonth monthName={filterType}/>
                    {
                        transactions.length != 0 ? (<FlatList
                            data={transactions}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity onPress={() => editTransaction(item.rowid)}>
                                        <View style={styles.formViewTransaction}>
                                            <View style={{width: '12%'}}>
                                                <Icon name="money" size={25} color="#4b81bf" style={{marginTop: 5, marginLeft: 15}} />
                                            </View>
                                            <View style={{width: '38%'}}>
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
                                </View>
                            )}
                            keyExtractor={item => item.rowid.toString()}
                        />) : (<View style={{marginTop: 50}}>
                                    <NoTransaction/>
                                </View>)
                    }
                </View>    
            </ScrollView>
            <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Filter Transaction" />}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    setVisible(false)
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => setVisible(false)}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => handleFilterTransaction()}
                      />
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <View>
                        <FormView 
                            label="Filter by"
                            inputType={<FilterSelect types={filterTypes} 
                            defaultValue={filterBy}
                            onValueChange={(filter_by) => handleFilterBy(filter_by)}/>}
                        />
                        {
                            showDateRange ? (
                                <View 
                                    style={{flexDirection: 'row', justifyContent: 'flex-start', width: 380,
                                    height: 70,
                                    backgroundColor: '#ffffff',
                                    marginTop: 5,
                                    marginHorizontal: 10}}
                                >
                                    <DateRange defaultDate={dateFrom} onDateChange={(dateFrom) => {setDateFrom(dateFrom)}} label="From" maxDate={maxDate}/>
                                    <DateRange defaultDate={dateTo} onDateChange={(dateTo) => {setDateTo(dateTo)}} label="To" maxDate={maxDate}/>
                                </View>
                            ) : null
                        }
                    </View>
                </DialogContent>
            </Dialog>
        </View>
    )
}

export default Transactions;