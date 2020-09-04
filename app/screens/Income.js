import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';
import Myradioinput from '../components/Myradioinput';
import Mydateinput from '../components/MyDateinput';
import Myselectinput from '../components/Myselectinput';
import Mybutton from '../components/Mybutton';
import { DB } from '../model/db';

const Income = ({ navigation }) => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('');
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

    const handleSubmit = () => {
        Alert.alert('Income', 'Processing income...')
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
                        inputType={<Myradioinput label1="Income          " value1="Income" label2="Expense" value2="Expense" onChangeText={type => setType(type)}/>}
                    />
                    <FormView 
                        label="Amount" 
                        inputType={<Mytextinput placeholder="Amount" keyboardType="numeric" onChangeText={amount => setAmount(amount)}/>}
                    />
                    <FormView 
                        label="Category"
                        inputType={<Myselectinput types={categories} onChangeText={category => setCategory(category)}/>}
                    />
                    <FormView 
                        label="Date" 
                        inputType={<Mydateinput onChangeText={date => setDate(date)}/>}
                    />
                    <FormView 
                        label="Mode"
                        inputType={<Myselectinput types={modes} onChangeText={mode => setMode(mode)}/>}
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