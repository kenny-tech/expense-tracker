import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { useIsFocused } from '@react-navigation/native';

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

     // check if screen is focused
     const isFocused = useIsFocused('');

     // listen for isFocused, if useFocused changes 
     // call the function that you use to mount the component.
     useEffect(() => {
        getCategories();
     },[isFocused]);

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
                for (let i = 0; i < results.rows.length; ++i) {
                    allCategories.push(results.rows.item(i));
                }
                setCategories(allCategories);
            })
        });
    }

    const handleUpdateCategory = () => {
        DB.transaction(tx => {
            tx.executeSql('UPDATE categories SET name=? WHERE rowid=?', [categoryName, categoryId], (tx, results) => {
                if(results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Category successfully updated',
                        [
                            {
                                text: 'Ok',
                                onPress: () => setVisible(false),
                            },
                        ],
                        { cancelable: false}
                    );
                } else {
                    Alert.alert('Error', 'Failed to update category. Please try again')
                }
            })
        })
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