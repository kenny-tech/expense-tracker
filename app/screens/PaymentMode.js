import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mytextinput from '../components/Mytextinput';
import FormPanel from '../components/FormPanel';
import FormView from '../components/FormView';
import styles from '../styles/style';
import { DB } from '../model/db';

const PaymentMode = ({ navigation }) => {

    const [paymentModes, setpaymentModes] = useState([]);
    const [editPaymentMode, setEditPaymentMode] = useState('false');
    const [addPaymentMode, setAddPaymentMode] = useState('false');
    const [visible, setVisible] = useState(false);
    const [paymentModeId, setPaymentModeId] = useState('');
    const [paymentModeName, setPaymentModeName] = useState('');

    useEffect(() => {
        getpaymentModes();
    }, []);    

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => handleAddPaymentMode()}>
                <Icon name="plus" size={30} style={styles.check}/>
            </TouchableOpacity>            
          ),
        });
    }, [navigation]);


    const handleEditPaymentMode = (payment_mode_id) => {
        setEditPaymentMode(true);
        setPaymentModeId(payment_mode_id);
        getPaymentMode(payment_mode_id);
        setAddPaymentMode(false);
    }

    const handleAddPaymentMode = () => {
        setAddPaymentMode(true);
        setEditPaymentMode(false);
        setPaymentModeName("")
        setVisible(true);
    }

    const addNewPaymentMode = () => {
        if (paymentModeName.trim() != "") {
            DB.transaction(tx => {
                tx.executeSql(        
                    'INSERT INTO modes VALUES (?)',
                    [paymentModeName],
                    (tx, results) => {               
                      if (results.rowsAffected > 0 ) {
                        Alert.alert(
                            'Success',
                            'Payment Mode successfully added',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => getpaymentModes(),
                                },
                            ],
                            { cancelable: false}
                        );        
                      } else {
                        // console.log('Insert failed');
                      }
                    }
                );
            });
        } else {
            Alert.alert("Error","Payment Mode Name cannot be empty");
        }
    }

    const getPaymentMode = (PaymentMode_id) => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM modes WHERE rowid = ?', [PaymentMode_id], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    setPaymentModeName(results.rows.item(0).name);
                    setVisible(true);
                } else {
                    Alert.alert('Error:','Payment Mode ID not found');
                }
            })
        });
    }

    const getpaymentModes = () => {
        DB.transaction(tx => {
            tx.executeSql('SELECT rowid, name FROM modes', [], (tx, results) => {
                let allpaymentModes = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    allpaymentModes.push(results.rows.item(i));
                }
                setpaymentModes(allpaymentModes);
            })
        });
        setVisible(false);
    }

    const handleUpdatePaymentMode = () => {
        DB.transaction(tx => {
            tx.executeSql('UPDATE modes SET name=? WHERE rowid=?', [paymentModeName, paymentModeId], (tx, results) => {
                if(results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Payment mode successfully updated',
                        [
                            {
                                text: 'Ok',
                                onPress: () => getpaymentModes(),
                            },
                        ],
                        { cancelable: false}
                    );
                } else {
                    Alert.alert('Error', 'Failed to update payment mode. Please try again')
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
                        types={paymentModes}
                        customPress={(payment_mode_id) => handleEditPaymentMode(payment_mode_id)}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
            <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title={addPaymentMode ? "Add Payment Mode" : "Update Payment Mode"} />}
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
                          addPaymentMode ? (<DialogButton
                            text="OK"
                            onPress={() => addNewPaymentMode()}
                          />) : (<DialogButton
                            text="OK"
                            onPress={() => handleUpdatePaymentMode()}
                          />)
                      }
                      
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <View>
                        <FormView 
                            label="Payment Mode" 
                            inputType={<Mytextinput placeholder="Enter Payment Mode Name" defaultValue={paymentModeName} onChangeText={paymentModeName => setPaymentModeName(paymentModeName)}/>}
                        />
                    </View>
                </DialogContent>
            </Dialog>
        </View>

    )
}

export default PaymentMode;