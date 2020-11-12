import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';
import Myradioinput from '../components/Myradioinput';
import Mydateinput from '../components/MyDateinput';
import Myselectinput from '../components/Myselectinput';
import Mybutton from '../components/Mybutton';
import { DB } from '../model/db';
import { useNavigation } from '@react-navigation/native';

const EditTransaction = ({ transId }) => {
    const navigation = useNavigation();

    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('');
    const [note, setNote] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [categories, setCategories] = useState([]);
    const [modes, setModes] = useState([]);

    useEffect(() => {
        getCategories();
        getModes();
        currentDate();
        getTransaction(transId);
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

    const getTransaction = (transId) => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, type, amount, category, date, mode FROM transactions WHERE rowid = ?', [transId], (tx, results) => {
                console.log(results.rows.item(0).amount);

                setType(results.rows.item(0).type);
                setAmount(results.rows.item(0).amount);
                setCategory(results.rows.item(0).category);
                setDate(results.rows.item(0).date);
                setMode(results.rows.item(0).mode);
                setNote(results.rows.item(0).note);

                setTransactionId(transId)
            })
        });
    }

    const handleSubmit = () => {
        if(amount.trim() != '') {
            DB.transaction(tx => {
                tx.executeSql('UPDATE transactions SET type=?, amount=?, category=?, date=?, mode=?, note=? WHERE rowid=?', [type, amount, category, date, mode, note, transactionId], (tx, results) => {
                    console.log('Results: ', results.rowsAffected);
                    if(results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Transaction successfully updated',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.goBack(),
                                },
                            ],
                            { cancelable: false}
                        );
                    } else {
                        Alert.alert('Error', 'Failed to update user. Please try again')
                    }
                })
            })
        } else {
            Alert.alert('Error', 'Please enter an amount')
        }
    }

    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormView 
                        label="Type" 
                        inputType={<Myradioinput label1="Income          " value1="Income" label2="Expense"  value2="Expense" defaultValue={type} onChangeType={type => setType(type)}/>}
                    />
                    <FormView 
                        label="Amount" 
                        inputType={<Mytextinput placeholder="Amount" keyboardType="numeric" onChangeText={amount => setAmount(amount)} defaultValue={amount}/>}
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
                        inputType={<Mytextinput placeholder="Note" onChangeText={note => setNote(note)} defaultValue={note}/>}
                    />
                    <Mybutton title="Submit" customClick={() => handleSubmit()}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default EditTransaction;