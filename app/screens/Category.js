import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Text} from 'react-native';

import FormView from '../components/FormView';
import FormPanel from '../components/FormPanel';
import Myselectinput from '../components/Myselectinput';
import { DB } from '../model/db';

const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
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

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormPanel 
                        types={categories}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Category;