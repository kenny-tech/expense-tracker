import React from 'react';
import { View, Text } from 'react-native';

import FormView from '../components/FormView';
import Myselectinput from '../components/Myselectinput';
import Chart from '../components/Chart';
import ChartDescription from '../components/ChartDescription';
import Transaction from '../components/Transaction';

const Report = () => {

    const types = [
        { label: 'Type', value: 'Type' },
        { label: 'Category', value: 'Category' },
        { label: 'Mode', value: 'Mode' }
    ];

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
           <FormView 
                label="Report by"
                inputType={<Myselectinput types={types}/>}
            />
            <Chart/>
            <ChartDescription/>
            <Transaction label="Income" amount="NGN200,000.00"/>
            <Transaction label="Expense" amount="NGN50,000.00"/>
        </View>
    )
}

export default Report;