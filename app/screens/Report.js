import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';

import FormView from '../components/FormView';
import FormViewReport from '../components/FormViewReport';
import Myselectinput from '../components/Myselectinput';
import PieChart from '../components/PieChart';
import ChartDescription from '../components/ChartDescription';
import DateRange from '../components/DateRange';
import DateRangeButton from '../components/DateRangeButton';
import styles from '../styles/style';
import { DB } from '../model/db';

const Report = () => {
    const [filterTypes, setFilterTypes] = useState([]);
    const [filterBy, setFilterBy] = useState('This Month');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [currency, setCurrency] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getFilterTypes();
        getTotalIncome(filterBy);
        getTotalExpense(filterBy);
        maximumDate();
        getCurrency();
        getTransactionsByCategories(filterBy);
    }, []);    

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

    const handleFilterBy = (filter_by) => { 
        if(filter_by === 'Date Range') {
            setShowDateRange(true);
        } else {
            getTotalIncome(filter_by);
            getTotalExpense(filter_by);
            setShowDateRange(false);
        }
        setFilterBy(filter_by);
        getTransactionsByCategories(filter_by);
    }

    const getTotalIncome = (filter_by) => {
        if(filter_by === 'This Month') {
            let month = new Date().getMonth()+1;     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Income'], (tx, results) => {
                    let incomes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        incomes.push(results.rows.item(i));
                    }
    
                    let total_income = 0;
                    incomes.map(income => {
                        total_income = total_income + parseInt(income.amount);
                    })
                  
                    setTotalIncome(total_income);
                })
            });
        }else if(filter_by === 'Last Month') {
            let month = new Date().getMonth();     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Income'], (tx, results) => {
                    let incomes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        incomes.push(results.rows.item(i));
                    }
    
                    let total_income = 0;
                    incomes.map(income => {
                        total_income = total_income + parseInt(income.amount);
                    })
                 
                    setTotalIncome(total_income);
                })
            });
        } else if(filter_by === 'Date Range') {
            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE type = ? AND date BETWEEN ? AND ?`, ['Income', dateFrom, dateTo], (tx, results) => {
                    let incomes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        incomes.push(results.rows.item(i));
                    }
    
                    let total_income = 0;
                    incomes.map(income => {
                        total_income = total_income + parseInt(income.amount);
                    })                 
                    setTotalIncome(total_income);
                })
            });
        } else if(filter_by === 'All') {

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE type = ?`, ['Income'], (tx, results) => {
                    let incomes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        incomes.push(results.rows.item(i));
                    }
    
                    let total_income = 0;
                    incomes.map(income => {
                        total_income = total_income + parseInt(income.amount);
                    })                 
                    setTotalIncome(total_income);
                })
            });
        }
    }

    const getTotalExpense = (filter_by) => {
        if(filter_by === 'This Month') {
            let month = new Date().getMonth()+1;     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Expense'], (tx, results) => {
                    let expenses = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        expenses.push(results.rows.item(i));
                    }

                    let total_expense = 0;
                    expenses.map(expense => {
                        total_expense = total_expense + parseInt(expense.amount);
                    });
                  
                    setTotalExpense(total_expense);
                })
            });
        }else if(filter_by === 'Last Month') {
            let month = new Date().getMonth();     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE strftime('%m', date) = ? AND type = ?`, [monthNumber, 'Expense'], (tx, results) => {
                    let expenses = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        expenses.push(results.rows.item(i));
                    }

                    let total_expense = 0;
                    expenses.map(expense => {
                        total_expense = total_expense + parseInt(expense.amount);
                    });

                    setTotalExpense(total_expense);
                })
            });
        }else if(filter_by === 'Date Range') {

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE type = ? AND date BETWEEN ? AND ?`, ['Expense', dateFrom, dateTo], (tx, results) => {
                    let expenses = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        expenses.push(results.rows.item(i));
                    }
    
                    let total_expense = 0;
                    expenses.map(expense => {
                        total_expense = total_expense + parseInt(expense.amount);
                    })
                 
                    setTotalExpense(total_expense);
                })
            });
        } else if(filter_by === 'All') {

            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE type = ?`, ['Expense'], (tx, results) => {
                    let expenses = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        expenses.push(results.rows.item(i));
                    }
    
                    let total_expense = 0;
                    expenses.map(expense => {
                        total_expense = total_expense + parseInt(expense.amount);
                    })
                 
                    setTotalExpense(total_expense);
                })
            });
        }
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

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const maximumDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        setMaxDate(today);
    }

    const handleSubmit = () => {
        if(dateFrom.trim()==='') {
            Alert.alert('Error', 'Please select Date From');
        } else if(dateTo.trim()==='') {
            Alert.alert('Error', 'Please select Date To');
        } else if(dateFrom > dateTo) {
            Alert.alert('Error', 'Date From cannot be greater than Date To');
        } else {
            let filter_by = 'Date Range';
            getTotalIncome(filter_by);
            getTotalExpense(filter_by);
            getTransactionsByCategories(filter_by);
        }
    }

    const getCurrency = () => {
        DB.transaction(tx => {
            tx.executeSql(`SELECT currency FROM settings`, [], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    setCurrency(results.rows.item(0).currency);
                } else {
                    Alert.alert('Error:','No currency found');
                }
            })
        });
    }

    const getTransactionsByCategories = (filter_by) => {
        if(filter_by === 'This Month') {
            let month = new Date().getMonth()+1;     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, category, SUM(amount) AS total_amount FROM transactions WHERE strftime('%m', date) = ? GROUP BY category`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        }else if(filter_by === 'Last Month') {
            let month = new Date().getMonth();     
            let monthNumber = getMonthNumber(month);

            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, category, SUM(amount) AS total_amount FROM transactions WHERE strftime('%m', date) = ? GROUP BY category`, [monthNumber], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        } else if(filter_by === 'Date Range') {
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, category, SUM(amount) AS total_amount FROM transactions WHERE date BETWEEN ? AND ?GROUP BY category`, [dateFrom, dateTo], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        } else if(filter_by === 'All') {
            DB.transaction(tx => {
                tx.executeSql(`SELECT rowid, category, SUM(amount) AS total_amount FROM transactions GROUP BY category`, [], (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setTransactions(temp);
                })
            });
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <FormView 
                label="Filter by"
                inputType={<Myselectinput types={filterTypes} 
                defaultValue={filterBy}
                onValueChange={(filter_by) => handleFilterBy(filter_by)}/>}
            />
            <ScrollView keyboardShouldPersistTaps='handled'>
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
                            <DateRangeButton title="Go" customClick={() => handleSubmit()}/>
                        </View>
                    ) : null
                }
                <PieChart income={totalIncome} expense={totalExpense} month={filterBy}/>
                {
                    totalIncome !== 0 || totalExpense !== 0 ? (<ChartDescription/>) : null
                }
                <FormViewReport
                    label="Report By Transaction Type" 
                    inputType={
                        <View>
                            <View style={{flexDirection: 'row', marginRight: 10}}>
                                <View style={{width: '50%'}}>
                                    <Text style={styles.reportText}>Total Income:</Text>
                                </View>
                                <View style={{width: '50%'}}>
                                    <Text style={{fontWeight: 'bold'}}>{currency+numberWithCommas(totalIncome)}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginRight: 10}}>
                                <View style={{width: '50%'}}>
                                    <Text style={styles.reportText}>Total Expense:</Text>
                                </View>
                                <View style={{width: '50%'}}>
                                    <Text style={{fontWeight: 'bold'}}>{currency+numberWithCommas(totalExpense)}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginRight: 10}}>
                                <View style={{width: '50%'}}>
                                    <Text style={styles.reportText}>Balance:</Text>
                                </View>
                                <View style={{width: '50%'}}>
                                    <Text style={{fontWeight: 'bold'}}>{currency+numberWithCommas(totalIncome - totalExpense)}</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
                {
                    transactions.length !== 0 ? (<View style={styles.formViewReportCategory}>
                        <Text style={styles.formViewLabel}>Report By Category</Text>
                            {
                                transactions.map(transaction => (
                                    <View style={{flexDirection: 'row', marginRight: 10}} key={transaction.rowid}>
                                        <View style={{width: '50%'}}>
                                            <Text style={styles.reportText}>{transaction.category}</Text>
                                        </View>
                                        <View style={{width: '50%'}}>
                                            <Text style={{fontWeight: 'bold'}}>{currency+numberWithCommas(transaction.total_amount)}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                    </View>) : null
                }
            </ScrollView>
        </View>
    )
}

export default Report;