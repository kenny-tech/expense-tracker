import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

import Mytextinput from '../components/Mytextinput';
import FormPanel from '../components/FormPanel';
import FormView from '../components/FormView';
import { DB } from '../model/db';

const Category = () => {

    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState('false');
    const [visible, setVisible] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        getCategories();
    }, []);    

    const handleEditCategory = (category_id) => {
        setEditCategory(true);
        setCategoryId(category_id);
        getCategory(category_id);
    }

    const getCategory = (category_id) => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM categories WHERE rowid = ?', [category_id], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    setCategoryName(results.rows.item(0).name);
                    setVisible(true);
                } else {
                    Alert.alert('Error:','Category ID not found');
                }
            })
        });
    }

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
                        customPress={(category_id) => handleEditCategory(category_id)}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
            <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Update Category" />}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    setVisible(false)
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => setVisible(false)}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => handleUpdateCategory()}
                      />
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <View>
                        <FormView 
                            label="Category" 
                            inputType={<Mytextinput placeholder="Category Name" defaultValue={categoryName} onChangeText={categoryName => setCategoryName(categoryName)}/>}
                        />
                    </View>
                </DialogContent>
            </Dialog>
        </View>

    )
}

export default Category;