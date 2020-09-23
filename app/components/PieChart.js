import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

import styles from '../styles/style';

const PieChart = ({ month, year, income, expense }) => {
    console.log('income and expense here:  '+income, expense);
    let percentIncome = ((income / (income + expense)) * 100).toFixed(2);
    let percentExpense = ((expense / (income + expense)) * 100).toFixed(2);
    console.log('income and expense percents: '+percentIncome, percentExpense);
    const graphicColor = ['#006400', '#C70039'];
    const wantedGraphicData = [{ y: income, x: percentIncome+'%' }, { y: expense, x: percentExpense+'%' }]; // Data that we want to display
    const defaultGraphicData = [{ y: 0, x: '' }, { y: 0, x: '' }]; // Data used to make the animate prop work

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    });

    return (
        <View style={styles.pieChartView}>
            <Text style={{
                position: 'absolute',
                top: 120,
                left:'35%',
                color: '#000000',
                fontSize: 17,
                fontWeight: 'bold'
            }}>{month} {year}</Text>
            <VictoryPie 
                data={graphicData} 
                width={280} height={255} 
                colorScale={graphicColor} 
                innerRadius={128} labelRadius={80}
                style={{ labels: { fontSize: 15, fill: "white" } }}
                animate={{ easing: 'exp' }}
            />
        </View>
    );
}

export default PieChart;