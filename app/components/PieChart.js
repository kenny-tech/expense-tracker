import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

import styles from '../styles/style';

const graphicColor = ['#006400', '#C70039'];
const wantedGraphicData = [{ y: 50000, x: '60%' }, { y: 30000, x: '40%' }]; // Data that we want to display
const defaultGraphicData = [{ y: 0, x: '' }, { y: 0, x: '' }]; // Data used to make the animate prop work

const PieChart = () => {
    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }, []);

    return (
        <View style={styles.pieChartView}>
            <Text style={{
                position: 'absolute',
                top: 115,
                left:'40%',
                color: '#000000',
                fontSize: 18
                }}>September</Text>
            <VictoryPie 
                data={graphicData} 
                width={250} height={250} 
                colorScale={graphicColor} 
                innerRadius={50} 
                animate={{ easing: 'exp' }}
            />
        </View>
    );
}

export default PieChart;