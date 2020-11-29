import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

import FormView from '../components/FormView';
import FormViewReport from '../components/FormViewReport';
import Myselectinput from '../components/Myselectinput';
import PieChart from '../components/PieChart';
import ChartDescription from '../components/ChartDescription';
import DateRange from '../components/DateRange';
import DateRangeButton from '../components/DateRangeButton';

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

    useEffect(() => {
        getFilterTypes();
        getTotalIncome(filterBy);
        getTotalExpense(filterBy);
        maximumDate();
        getCurrency();
    }, []);    

    const getFilterTypes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM filtertypes', [], (tx, results) => {
                let filters = [];
                console.log('Filter types from report screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    filters.push(results.rows.item(i));
                }
                setFilterTypes(filters);
            })
        });
    }

    const handleFilterBy = (filter_by) => { 
        if(filter_by == 'Date Range') {
            setShowDateRange(true);
        } else {
            getTotalIncome(filter_by);
            getTotalExpense(filter_by);
            setShowDateRange(false);
        }
        setFilterBy(filter_by);
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
                tx.executeSql(`SELECT amount FROM transactions WHERE date(date) BETWEEN ? AND ? AND type = ?`, [dateFrom, dateTo, 'Income'], (tx, results) => {
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

                    console.log('Expenses: ', expenses);
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

                    console.log('Expenses: ', expenses);
                    let total_expense = 0;
                    expenses.map(expense => {
                        total_expense = total_expense + parseInt(expense.amount);
                    });

                    setTotalExpense(total_expense);
                })
            });
        }else if(filter_by === 'Date Range') {
            DB.transaction(tx => {
                tx.executeSql(`SELECT amount FROM transactions WHERE date BETWEEN ? AND ? AND type = ?`, [dateFrom, dateTo, 'Expense'], (tx, results) => {
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
        }
    }

    const getCurrency = () => {
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

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
             <FormView 
                label="Filter by"
                inputType={<Myselectinput types={filterTypes} 
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
                        <DateRangeButton title="Go" customClick={() => handleSubmit()}/>
                    </View>
                ) : null
            }
            <PieChart income={totalIncome} expense={totalExpense} month={filterBy}/>
            {
                totalIncome !== 0 || totalExpense !== 0 ? <ChartDescription/> : null
            }
            <FormViewReport
                label="Report Summary" 
                inputType={
                    <View>
                        <Text style={{marginLeft: 10, paddingBottom: 5, fontSize:16}}>Total Income:          {currency+numberWithCommas(totalIncome)}</Text>
                        <Text style={{marginLeft: 10, paddingBottom: 5, fontSize:16}}>Total Expense:        {currency+numberWithCommas(totalExpense)}</Text>
                        <Text style={{marginLeft: 10, fontSize:16}}>Balance:                   {currency+numberWithCommas(totalIncome - totalExpense)}</Text>
                    </View>
                }
            />
        </View>
    )
}

export default Report;