import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeLink from '../components/HomeLink';
import HomeText from '../components/HomeText';
import PieChart from '../components/PieChart';
import styles from '../styles/style';
import { DB } from '../model/db';

const Home = ({ navigation }) => {

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [currency, setCurrency] = useState('');

    // check if screen is focused
    const isFocused = useIsFocused('');

    // listen for isFocused, if useFocused changes 
    // call the function that you use to mount the component.
    useEffect(() => {
        getIncomes();
        getExpenses();
        getSetting();
    },[isFocused]);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Icon name="gear" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);


    useEffect(() => {
        createCategories();
        createModes();
        createFilterTypes();
        createCurrencies();
        createSetting();
    }, []);    

    let today = new Date();
    let year = today.getFullYear();

    let months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
    let monthName = months[today.getMonth()];

    let month = new Date().getMonth()+1;     
    let monthNumber

    let type = monthName + ' ' + year;
    
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

    const createCategories = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS categories');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (name)');
            }, function (error) {
                // console.log('Transaction error: ' + error.message);
            }, function () {
                // console.log('Successfully created categories table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM categories', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let category = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        category.push(results.rows.item(i));
                    }
                } else {
                    tx.executeSql(        
                        'INSERT INTO categories VALUES (?),(?),(?),(?),(?),(?)',
                        ['Business','Clothing','Drinks','Education','Food','Salary'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            // console.log('Insert success');              
                          } else {
                            Alert.alert('Error','Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createModes = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS modes');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS modes (name)');
            }, function (error) {
                // console.log('Transaction error: ' + error.message);
            }, function () {
                // console.log('Successfully created modes table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM modes', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let mode = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        mode.push(results.rows.item(i));
                    }
                } else {
                    tx.executeSql(        
                        'INSERT INTO modes VALUES (?),(?),(?),(?),(?)',
                        ['Cash','Credit Card','Debit Card','Bank','Cheque'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            // console.log('Insert success');              
                          } else {
                            // console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createFilterTypes = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS filtertypes');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS filtertypes (name)');
            }, function (error) {
                // console.log('Transaction error: ' + error.message);
            }, function () {
                // console.log('Successfully created filtertypes table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM filtertypes', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let filterTypes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        filterTypes.push(results.rows.item(i));
                    }
                } else {
                    tx.executeSql(        
                        'INSERT INTO filtertypes VALUES (?),(?),(?),(?)',
                        ['All', 'This Month', 'Last Month', 'Date Range'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            // console.log('Insert success');              
                          } else {
                            // console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const getIncomes = () => {
        DB.transaction(tx => {
            // tx.executeSql('SELECT amount FROM transactions WHERE type = ?', ['Income'], (tx, results) => {
            tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Income'], (tx, results) => {
                let incomes = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    incomes.push(results.rows.item(i));
                }

                let total_income = 0;
                incomes.map(income => {
                    total_income = total_income + parseInt(income.amount);
                    setTotalIncome(total_income);
                })
            })
        });
    }

    const getExpenses = () => {
        DB.transaction(tx => {
            // tx.executeSql('SELECT amount FROM transactions WHERE type = ?', ['Expense'], (tx, results) => {
            tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Expense'], (tx, results) => {
                let expenses = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    expenses.push(results.rows.item(i));
                }

                let total_expense = 0;
                expenses.map(expense => {
                    total_expense = total_expense + parseInt(expense.amount);
                    setTotalExpense(total_expense);
                })
            })
        });
    }

    const createCurrencies = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS currency');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS currency (name, symbol)');
            }, function (error) {
                // console.log('Transaction error: ' + error.message);
            }, function () {
                // console.log('Successfully created currencies table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM currency', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let currencies = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        currencies.push(results.rows.item(i));
                    }
                } else {
                    tx.executeSql(        
                        'INSERT INTO currency (name, symbol) VALUES (?,?)',
                        ['₦','₦'], ['$', '$'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            // console.log('Insert success');              
                          } else {
                            // console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createSetting = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS settings');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS settings (currency)');
            }, function (error) {
                // console.log('Transaction error: ' + error.message);
            }, function () {
                // console.log('Successfully created settings table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT currency FROM settings', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let settings = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        settings.push(results.rows.item(i));
                    }
                } else {
                    tx.executeSql(        
                        'INSERT INTO settings VALUES (?)',
                        ['₦'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            // console.log('Insert success');              
                          } else {
                            // console.log('Insert failed');
                          }
                        }
                    );
                }
            })
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

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <View style={{marginTop: 10}}>
            <View style={styles.homeChartView}>
                <Text style={{fontSize: 18, paddingTop: 5, marginLeft: 10, fontWeight: 'bold', textAlign:'center'}}>Overview - {monthName}</Text>
                <PieChart month={monthName} year={year} income={totalIncome} expense={totalExpense}/>
                <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 30, marginTop: 10}}>
                    <HomeText title="Income" amount={currency+numberWithCommas(totalIncome)} color="#006400"/>
                    <HomeText title="Expense" amount={currency+numberWithCommas(totalExpense)} color="#C70039"/>
                    <HomeText title="Balance" amount={currency+numberWithCommas(totalIncome - totalExpense)} color="#0198E1"/>
                </View>
            </View>
            <View style={styles.homeLinksView}>
                <View style={{marginTop: 10}}>
                    <HomeLink text="ADD INCOME" backgroundColor="#f0f0f0" textColor="#006400" icon="money" customClick={() => navigation.navigate('Income')}/>
                    <HomeLink text="ADD EXPENSE" backgroundColor="#f0f0f0" textColor="#C70039" icon="credit-card" customClick={() => navigation.navigate('Expense')}/>
                    <HomeLink text="TRANSACTIONS" backgroundColor="#f0f0f0" textColor="#6495ED" icon="pie-chart" customClick={() => navigation.navigate('Transactions')}/>
                    <HomeLink text="REPORTS" backgroundColor="#f0f0f0" textColor="#4E78A0" icon="bar-chart" customClick={() => navigation.navigate('Reports')}/>
                </View>
            </View>
        </View>
    )
}

export default Home;