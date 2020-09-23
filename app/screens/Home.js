import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import HomeLink from '../components/HomeLink';
import HomeText from '../components/HomeText';
import PieChart from '../components/PieChart';
import { DB } from '../model/db';

const Home = ({ navigation }) => {

    useEffect(() => {
        createCategories();
        createModes();
        createFilterTypes();
        currentMonthYear();
        getIncomes();
        getExpenses();
    }, []);    

    const [month, setMonth] = useState('');
    const [monthName, setMonthName] = useState('');
    const [year, setYear] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const currentMonthYear = () => {
        let today = new Date();
        let month = new Date().getMonth()+1;     
        let yyyy = today.getFullYear();

        let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

        let d = new Date();
        let currentMonthName = months[d.getMonth()];

        setMonthName(currentMonthName);
        setMonth(month);
        setYear(yyyy);
        // console.log('Month: ', month);
    }

    const createCategories = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS categories');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (name)');
            }, function (error) {
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created categories table');
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
                    console.log('Categories: ',category);
                } else {
                    tx.executeSql(        
                        'INSERT INTO categories VALUES (?),(?),(?),(?),(?),(?)',
                        ['Business','Clothing','Drinks','Education','Food','Salary'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
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
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created modes table');
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
                    console.log('Modes: ',mode);
                } else {
                    tx.executeSql(        
                        'INSERT INTO modes VALUES (?),(?),(?),(?),(?)',
                        ['Cash','Credit Card','Debit Card','Bank','Cheque'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createFilterTypes = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS filter_types');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS filter_types (name)');
            }, function (error) {
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created filter_types table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM filter_types', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let filterTypes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        filterTypes.push(results.rows.item(i));
                    }
                    console.log('Filter Types: ',filterTypes);
                } else {
                    tx.executeSql(        
                        'INSERT INTO filter_types VALUES (?),(?),(?),(?)',
                        ['This Month','Last Month','This Week', 'Today'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const getIncomes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT amount FROM transactions WHERE type = ?', ['Income'], (tx, results) => {
            // tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [month, 'Income'], (tx, results) => {
                let incomes = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    incomes.push(results.rows.item(i));
                }

                console.log('Incomes: ', incomes);
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
            tx.executeSql('SELECT amount FROM transactions WHERE type = ?', ['Expense'], (tx, results) => {
            // tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [month, 'Expense'], (tx, results) => {
                let expenses = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    expenses.push(results.rows.item(i));
                }

                console.log('Expenses: ', expenses);
                let total_expense = 0;
                expenses.map(expense => {
                    total_expense = total_expense + parseInt(expense.amount);
                    setTotalExpense(total_expense);
                })
            })
        });
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <View style={{marginTop: 10}}>
            <PieChart month={monthName} year={year} income={totalIncome} expense={totalExpense}/>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 30, marginTop: 20}}>
                <HomeText title="Income" amount={"NGN"+numberWithCommas(totalIncome)} color="#006400"/>
                <HomeText title="Expense" amount={"NGN"+numberWithCommas(totalExpense)} color="#C70039"/>
                <HomeText title="Balance" amount={"NGN"+numberWithCommas(totalIncome - totalExpense)} color="#4b81bf"/>
            </View>
            <View style={{marginTop: 10}}>
                <HomeLink text="ADD INCOME" backgroundColor="#daf5ff" textColor="#639eb8" icon="money" customClick={() => navigation.navigate('Income')}/>
                <HomeLink text="ADD EXPENSES" backgroundColor="#d4e8ff" textColor="#4b81bf" icon="credit-card" customClick={() => navigation.navigate('Expense')}/>
                <HomeLink text="ALL TRANSACTION" backgroundColor="#ffecdd" textColor="#e79b5f" icon="pie-chart" customClick={() => navigation.navigate('Transactions')}/>
                <HomeLink text="REPORTS" backgroundColor="#fedada" textColor="#ff7175" icon="bar-chart" customClick={() => navigation.navigate('Reports')}/>
            </View>
        </View>
    )
}

export default Home;