import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView} from 'react-native';

import FormView from '../components/FormView';
import Mytextinput from '../components/Mytextinput';

const Income = () => {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');


    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <FormView label="Type" />
                    <FormView 
                        label="Amount" 
                        inputType={<Mytextinput placeholder="Amount" keyboardType="numeric" onChangeText={amount => setAmount(amount)}/>}
                    />
                    <FormView label="Category"/>
                    <FormView label="Date & Time"/>
                    <FormView label="Mode"/>
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