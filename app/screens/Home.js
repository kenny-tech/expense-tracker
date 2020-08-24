import React from 'react';
import { View } from 'react-native';

import HomeLink from '../components/HomeLink';
import Chart from '../components/Chart';

const Home = () => {
    return (
        <View>
            <Chart/>
            <HomeLink text="ADD INCOME" backgroundColor="#daf5ff" textColor="#639eb8" icon="money"/>
            <HomeLink text="ADD EXPENSES" backgroundColor="#d4e8ff" textColor="#4b81bf" icon="credit-card"/>
            <HomeLink text="ALL TRANSACTION" backgroundColor="#ffecdd" textColor="#e79b5f" icon="pie-chart"/>
            <HomeLink text="REPORTS" backgroundColor="#fedada" textColor="#ff7175" icon="bar-chart"/>
        </View>
    )
}

export default Home;