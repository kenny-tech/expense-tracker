import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const FormViewReport = ({ label,inputType }) => {

    return (
        <View style={styles.formViewReport}>
            <Text style={styles.formViewLabel}>{label}</Text>
            {inputType}
        </View>
    )
}

export default FormViewReport;