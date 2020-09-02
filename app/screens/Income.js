import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';
import Myradioinput from '../components/Myradioinput';
import Mydateinput from '../components/MyDateinput';
import Myselectinput from '../components/Myselectinput';
import styles from '../styles/style';
import { DB } from '../model/db';

const Income = ({ navigation }) => {
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert('Income', 'Processing income...')}>
                <Icon name="check" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormView 
                        label="Type" 
                        inputType={<Myradioinput label1="Income          " value1="Income" label2="Expense" value2="Expense"/>}
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
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Income;