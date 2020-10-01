import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

import NoTransaction from '../components/NoTransaction';
import styles from '../styles/style';

const PieChart = ({ month, year, income, expense }) => {
    let percentIncome = ((income / (income + expense)) * 100).toFixed(1);
    let percentExpense = ((expense / (income + expense)) * 100).toFixed(1);
    const graphicColor = ['#006400', '#C70039'];
    const graphicData = [{ y: income, x: percentIncome+'%' }, { y: expense, x: percentExpense+'%' }]; // Data that we want to display

    return (
        <View>
            {
                income !== 0 && expense !== 0 ? 
                (
                    <View style={styles.pieChartView}>
                        <Text style={{
                            position: 'absolute',
                            top: 120,
                            left:'37%',
                            color: '#000000',
                            fontSize: 17,
                            fontWeight: 'bold',
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
                ) : 
                (
                    <View style={{alignItems: 'center', marginBottom: 15}}>
                        <NoTransaction text={"for "+ month}/>
                    </View>
                )
            }
        </View>
    );
}

export default PieChart;