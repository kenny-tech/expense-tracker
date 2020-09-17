import React, { useEffect } from 'react';
import { View } from 'react-native';

import HomeLink from '../components/HomeLink';
import HomeText from '../components/HomeText';
import Chart from '../components/Chart';
import PieChart from '../components/PieChart';
import { DB } from '../model/db';

const Home = ({ navigation }) => {

    useEffect(() => {
        createCategories();
        createModes();
        createFilterTypes();
    }, []);    

    const createCategories = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS categories');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (name)');
            }, function (error) {
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created categories table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM categories', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let category = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        category.push(results.rows.item(i));
                    }
                    console.log('Categories: ',category);
                } else {
                    tx.executeSql(        
                        'INSERT INTO categories VALUES (?),(?),(?),(?),(?),(?)',
                        ['Business','Clothing','Drinks','Education','Food','Salary'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createModes = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS modes');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS modes (name)');
            }, function (error) {
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created modes table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM modes', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let mode = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        mode.push(results.rows.item(i));
                    }
                    console.log('Modes: ',mode);
                } else {
                    tx.executeSql(        
                        'INSERT INTO modes VALUES (?),(?),(?),(?),(?)',
                        ['Cash','Credit Card','Debit Card','Bank','Cheque'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });
    }

    const createFilterTypes = () => {
        DB.transaction(function (tx) {
            // tx.executeSql('DROP TABLE IF EXISTS categories');   
            tx.executeSql('CREATE TABLE IF NOT EXISTS filter_types (name)');
            }, function (error) {
                console.log('Transaction error: ' + error.message);
            }, function () {
                console.log('Successfully created filter_types table');
            }
        );

        DB.transaction(tx => {
            tx.executeSql('SELECT name FROM filter_types', [], (tx, results) => {
                let len = results.rows.length;

                if(len > 0) {
                    let filterTypes = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        filterTypes.push(results.rows.item(i));
                    }
                    console.log('Filter Types: ',filterTypes);
                } else {
                    tx.executeSql(        
                        'INSERT INTO filter_types VALUES (?),(?),(?)',
                        ['Type','Category','Mode'],
                        (tx, results) => {               
                          if (results.rowsAffected > 0 ) {
                            console.log('Insert success');              
                          } else {
                            console.log('Insert failed');
                          }
                        }
                    );
                }
            })
        });

    }


    return (
        <View>
            <PieChart/>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 30}}>
                <HomeText title="Income" amount="NGN50,000" color="#006400"/>
                <HomeText title="Expense" amount="NGN30,000" color="#C70039"/>
                <HomeText title="Balance" amount="NGN20,000" color="#4b81bf"/>
            </View>
            <View style={{marginTop: 10}}>
                <HomeLink text="ADD INCOME" backgroundColor="#daf5ff" textColor="#639eb8" icon="money" customClick={() => navigation.navigate('Income')}/>
                <HomeLink text="ADD EXPENSES" backgroundColor="#d4e8ff" textColor="#4b81bf" icon="credit-card" customClick={() => navigation.navigate('Expense')}/>
                <HomeLink text="ALL TRANSACTION" backgroundColor="#ffecdd" textColor="#e79b5f" icon="pie-chart" customClick={() => navigation.navigate('Transactions')}/>
                <HomeLink text="REPORTS" backgroundColor="#fedada" textColor="#ff7175" icon="bar-chart" customClick={() => navigation.navigate('Reports')}/>
            </View>
        </View>
    )
}

export default Home;