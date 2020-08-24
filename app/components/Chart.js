import React from 'react';
import { View } from 'react-native';
import Pie from 'react-native-pie'

import styles from '../styles/style';

const Chart = () => {
    return (
        <View style={styles.pieChartView}>
            <Pie
              radius={80}
              sections={[
                {
                  percentage: 60,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              strokeCap={'butt'}
            />
        </View>
    )
}

export default Chart;