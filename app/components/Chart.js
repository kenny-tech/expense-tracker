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
                  percentage: 40,
                  color: '#C70039',
                },
                {
                  percentage: 60,
                  color: '#44CD40',
                },
              ]}
              strokeCap={'butt'}
            />
        </View>
    )
}

export default Chart;