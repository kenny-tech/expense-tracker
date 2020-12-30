import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mytextinput from '../components/Mytextinput';
import FormPanel from '../components/FormPanel';
import FormView from '../components/FormView';
import styles from '../styles/style';
import { DB } from '../model/db';

const Category = ({ navigation }) => {

    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState('false');
    const [addCategory, setAddCategory] = useState('false');
    const [visible, setVisible] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        getCategories();
    }, []);    

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => handleAddCategory()}>
                <Icon name="plus" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);


    const handleEditCategory = (category_id) => {
        setEditCategory(true);
        setCategoryId(category_id);
        getCategory(category_id);
        setAddCategory(false);
    }

    const handleAddCategory = () => {
        setAddCategory(true);
        setEditCategory(false);
        setCategoryName("")
        setVisible(true);
    }

    const addNewCategory = () => {
        if (categoryName.trim() != "") {
            DB.transaction(tx => {
                tx.executeSql(        
                    'INSERT INTO categories VALUES (?)',
                    [categoryName],
                    (tx, results) => {               
                      if (results.rowsAffected > 0 ) {
                        Alert.alert(
                            'Success',
                            'Category successfully added',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => getCategories(),
                                },
                            ],
                            { cancelable: false}
                        );        
                      } else {
                        Alert.alert('Error','Insert failed');
                      }
                    }
                );
            });
        } else {
            Alert.alert('Error','Category Name cannot be empty');
        }
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
        setVisible(false);
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
                                onPress: () => getCategories(),
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
                dialogTitle={<DialogTitle title={addCategory ? "Add Category" : "Update Category"} />}
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
                      {
                          addCategory ? (<DialogButton
                            text="OK"
                            onPress={() => addNewCategory()}
                          />) : (<DialogButton
                            text="OK"
                            onPress={() => handleUpdateCategory()}
                          />)
                      }
                      
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <View>
                        <FormView 
                            label="Category" 
                            inputType={<Mytextinput placeholder="Enter Category Name" defaultValue={categoryName} onChangeText={categoryName => setCategoryName(categoryName)}/>}
                        />
                    </View>
                </DialogContent>
            </Dialog>
        </View>

    )
}

export default Category;