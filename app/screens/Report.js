import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import FormView from '../components/FormView';
import Myselectinput from '../components/Myselectinput';
import PieChart from '../components/PieChart';
import ChartDescription from '../components/ChartDescription';
import Transaction from '../components/Transaction';
import DateRange from '../components/DateRange';
import { DB } from '../model/db';

const Report = () => {
    const [filterTypes, setFilterTypes] = useState([]);
    const [filterBy, setFilterBy] = useState('This Month');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(() => {
        getFilterTypes();
        getTotalIncome(filterBy);
        getTotalExpense(filterBy);
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
                        <DateRange defaultDate={dateFrom} onDateChange={(dateFrom) => {setDateFrom(dateFrom)}} label="From"/>
                        <DateRange defaultDate={dateTo} onDateChange={(dateTo) => {setDateTo(dateTo)}} label="To"/>
                    </View>
                ) : null
            }
            <PieChart income={totalIncome} expense={totalExpense}/>
            <ChartDescription/>
            <Transaction label="Total Income " amount={"NGN"+numberWithCommas(totalIncome)}/>
            <Transaction label="Total Expense" amount={"NGN"+numberWithCommas(totalExpense)}/>
            <Transaction label="Balance          " amount={"NGN"+numberWithCommas(totalIncome - totalExpense)}/>
        </View>
    )
}

export default Report;