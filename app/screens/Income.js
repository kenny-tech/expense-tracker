import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';
import Mydateinput from '../components/MyDateinput';
import Myselectinput from '../components/Myselectinput';
import Mybutton from '../components/Mybutton';
import { DB } from '../model/db';

const Income = ({ navigation }) => {
    const [type, setType] = useState('Income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Business');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('Cash');
    const [note, setNote] = useState('');

    const [categories, setCategories] = useState([]);
    const [modes, setModes] = useState([]);

    useEffect(() => {
        getCategories();
        getModes();
        currentDate();
    }, []);    

    const getCategories = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM categories', [], (tx, results) => {
                let allCategories = [];
                console.log('Categories from income screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    allCategories.push(results.rows.item(i));
                }
                setCategories(allCategories);
            })
        });
    }

    const getModes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM modes', [], (tx, results) => {
                let allModes = [];
                console.log('Modes from income screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    allModes.push(results.rows.item(i));
                }
                setModes(allModes);
            })
        });
    }

    const currentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        setDate(today);
    }

    const handleSubmit = () => {
        if(amount.trim() != '') {
            DB.transaction(function (tx) {
                // tx.executeSql('DROP TABLE IF EXISTS transactions');   
                tx.executeSql('CREATE TABLE IF NOT EXISTS transactions (type, amount, category, date, mode, note)');
            
                }, function (error) {
                    console.log('Transaction error: ' + error.message);
                }, function () {
                    console.log('Successfully loaded incomes table');
                });
            DB.transaction((tx) => {
                tx.executeSql('INSERT INTO transactions VALUES (?,?,?,?,?,?)', [type, amount, category, date, mode, note],
                    (tx, results) => {               
                        if (results.rowsAffected > 0 ) {
                            Alert.alert(
                                'Success',
                                'Income successfully recorded',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('Home'),
                                    },
                                ],
                                { cancelable: false}
                            );
                            console.log("Income successfully recorded");            
                        } else {
                            console.log('Insert failed');
                        }
                    }
                );
            }, function (tx, err) {
                console.log('Insert income error ' + err);
            });
        } else {
            Alert.alert('Error', 'Please enter an amount')
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    {/* <FormView 
                        label="Type" 
                        inputType={<Myradioinput label1="Income          " value1="Income" label2="Expense"  value2="Expense" defaultValue={type} onChangeType={type => setType(type)}/>}
                    /> */}
                    <FormView 
                        label="Amount" 
                        inputType={<Mytextinput placeholder="Amount" keyboardType="numeric" onChangeText={amount => setAmount(amount)}/>}
                    />
                    <FormView 
                        label="Category"
                        inputType={<Myselectinput types={categories} 
                        defaultValue={category}
                        onValueChange={(category) => setCategory(category)}/>}
                    />
                    <FormView 
                        label="Date" 
                        inputType={<Mydateinput defaultDate={date} onDateChange={(date) => {setDate(date)}}/>}
                    />
                     <FormView 
                        label="Mode"
                        inputType={<Myselectinput types={modes} 
                        defaultValue={mode}
                        onValueChange={(mode) => setMode(mode)}/>}
                    />
                    <FormView 
                        label="Note"
                        inputType={<Mytextinput placeholder="Note" onChangeText={note => setNote(note)}/>}
                    />
                    <Mybutton title="Submit" customClick={() => handleSubmit()}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Income;