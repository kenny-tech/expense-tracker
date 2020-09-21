import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

import styles from '../styles/style';

const PieChart = ({ month, year, income, expense }) => {

    let percentIncome = ((income / (income + expense)) * 100).toFixed(2);
    let percentExpense = ((expense / (income + expense)) * 100).toFixed(2);
    console.log(percentIncome, percentExpense);
    const graphicColor = ['#006400', '#C70039'];
    const wantedGraphicData = [{ y: income, x: percentIncome+'%' }, { y: expense, x: percentExpense+'%' }]; // Data that we want to display
    const defaultGraphicData = [{ y: 0, x: '' }, { y: 0, x: '' }]; // Data used to make the animate prop work

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }, []);

    return (
        <View style={styles.pieChartView}>
            <Text style={{
                position: 'absolute',
                top: 100,
                left:'37%',
                color: '#000000',
                fontSize: 14,
                fontWeight: 'bold'
            }}>{month} {year}</Text>
            <VictoryPie 
                data={graphicData} 
                width={300} height={220} 
                colorScale={graphicColor} 
                innerRadius={80} 
                animate={{ easing: 'exp' }}
            />
        </View>
    );
}

export default PieChart;