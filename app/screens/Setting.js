import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native';

import FormView from '../components/FormView';
import FormViewLink from '../components/FormViewLink';
import Myselectinput from '../components/Myselectinput';
import { DB } from '../model/db';

const Setting = ({ navigation }) => {

    const [currency, setCurrency] = useState('');
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        getCurrencies();
        getSetting();
    }, []);    

    const getCurrencies = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name, symbol FROM currency', [], (tx, results) => {
                let currencies = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    currencies.push(results.rows.item(i));
                }
                console.log('Currencies: ',currencies);
                setCurrencies(currencies);
            })
        });
    }

    const getSetting = () => {
        DB.transaction(tx => {
            tx.executeSql(`SELECT currency FROM settings`, [], (tx, results) => {
                let len = results.rows.length;
                // console.log('length_currency: ', results.rows.item(0).currency);
                if (len > 0) {
                    setCurrency(results.rows.item(0).currency);
                } else {
                    Alert.alert('Error:','No currency found');
                }
            })
        });
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormView 
                        label="Currency"
                        inputType={<Myselectinput types={currencies} 
                        defaultValue={currency}
                        onValueChange={(currency) => setCurrency(currency)}/>}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                        <FormViewLink 
                            label="Category" 
                            inputType={<Text style={{marginLeft: 10}}>Add/Edit Category           </Text>}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PaymentMode')}>
                        <FormViewLink 
                            label="Payment Mode" 
                            inputType={<Text style={{marginLeft: 10}}>Add/Edit payment mode</Text>}
                        />  
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Setting;