import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';
import Myradioinput from '../components/Myradioinput';
import Mydateinput from '../components/MyDateinput';
import Myselectinput from '../components/Myselectinput';
import Mybutton from '../components/Mybutton';
import { DB } from '../model/db';

const Expense = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [categories, setCategories] = useState([]);
    const [modes, setModes] = useState([]);

    useEffect(() => {
        getCategories();
        getModes();
    }, []);    

    const getCategories = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM categories', [], (tx, results) => {
                let allCategories = [];
                console.log('Categories from expense screen: ',results.rows);
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
                console.log('Modes from expense screen: ',results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    allModes.push(results.rows.item(i));
                }
                setModes(allModes);
            })
        });
    }

    const handleSubmit = () => {
        Alert.alert('Expense', 'Processing expense...')
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormView 
                        label="Type" 
                        inputType={<Myradioinput label1="Expense          " value1="Expense" label2="Income" value2="Income"/>}
                    />
                    <FormView 
                        label="Amount" 
                        inputType={<Mytextinput placeholder="Amount" keyboardType="numeric" onChangeText={amount => setAmount(amount)}/>}
                    />
                    <FormView 
                        label="Category"
                        inputType={<Myselectinput types={categories}/>}
                    />
                    <FormView 
                        label="Date" 
                        inputType={<Mydateinput/>}
                    />
                    <FormView 
                        label="Mode"
                        inputType={<Myselectinput types={modes}/>}
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

export default Expense;