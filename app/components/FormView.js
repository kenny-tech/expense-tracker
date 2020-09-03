import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const FormView = ({ label,inputType }) => {

    return (
        <View style={styles.formView}>
            <Text style={styles.formViewLabel}>{label}</Text>
            {inputType}
        </View>
    )
}

export default FormView;