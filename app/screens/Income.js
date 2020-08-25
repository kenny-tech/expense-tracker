import React from 'react';
import { View } from 'react-native';

import FormView from '../components/FormView'

const Income = () => {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <FormView label="Type"/>
            <FormView label="Amount"/>
            <FormView label="Category"/>
            <FormView label="Date & Time"/>
            <FormView label="Mode" />
            <FormView label="Note"/>
        </View>
    )
}

export default Income;