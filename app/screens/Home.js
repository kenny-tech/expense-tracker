import React from 'react';
import { View } from 'react-native';

import HomeLink from '../components/HomeLink';
import HomeText from '../components/HomeText';
import Chart from '../components/Chart';

const Home = ({navigation}) => {
    return (
        <View>
            <Chart/>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 30}}>
                <HomeText title="Income" amount="NGN50,000" color="#006400"/>
                <HomeText title="Expense" amount="NGN30,000" color="#C70039"/>
                <HomeText title="Balance" amount="NGN20,000" color="#4169e1"/>
            </View>
            <View style={{marginTop: 10}}>
                <HomeLink text="ADD INCOME" backgroundColor="#daf5ff" textColor="#639eb8" icon="money" customClick={() => navigation.navigate('Income')}/>
                <HomeLink text="ADD EXPENSES" backgroundColor="#d4e8ff" textColor="#4b81bf" icon="credit-card" customClick={() => navigation.navigate('Expense')}/>
                <HomeLink text="ALL TRANSACTION" backgroundColor="#ffecdd" textColor="#e79b5f" icon="pie-chart"/>
                <HomeLink text="REPORTS" backgroundColor="#fedada" textColor="#ff7175" icon="bar-chart"/>
            </View>
        </View>
    )
}

export default Home;