import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import FormView from '../components/FormView';
import Myselectinput from '../components/Myselectinput';
import PieChart from '../components/PieChart';
import ChartDescription from '../components/ChartDescription';
import Transaction from '../components/Transaction';
import { DB } from '../model/db';

const Report = () => {
    const [filterTypes, setFilterTypes] = useState([]);

    useEffect(() => {
        getFilterTypes();
    }, []);    
    
    const getFilterTypes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM filter_types', [], (tx, results) => {
                let filters = [];
                console.log('Filter types from report screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    filters.push(results.rows.item(i));
                }
                setFilterTypes(filters);
            })
        });
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
           <FormView 
                label="Report by"
                inputType={<Myselectinput types={filterTypes}/>}
            />
            <PieChart month=""/>
            <ChartDescription/>
            <Transaction label="Income" amount="NGN200,000.00"/>
            <Transaction label="Expense" amount="NGN50,000.00"/>
        </View>
    )
}

export default Report;