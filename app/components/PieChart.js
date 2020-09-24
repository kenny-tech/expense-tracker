import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

import styles from '../styles/style';

const PieChart = ({ month, year, income, expense }) => {
    let percentIncome = ((income / (income + expense)) * 100).toFixed(2);
    let percentExpense = ((expense / (income + expense)) * 100).toFixed(2);
    const graphicColor = ['#006400', '#C70039'];
    const graphicData = [{ y: income, x: percentIncome+'%' }, { y: expense, x: percentExpense+'%' }]; // Data that we want to display
    
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