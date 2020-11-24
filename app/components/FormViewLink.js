import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const FormViewLink = ({ label,inputType }) => {

    return (
        <View style={styles.formViewLink}>
            <View>
                <Text style={styles.formViewLabel}>{label}</Text>
                {inputType}
            </View>
            <View style={{marginLeft: 130}}>
                <Icon name="angle-right" size={40} color="#4b81bf" style={{marginTop: 20, marginLeft: 50}} /> 
            </View>
        </View>
    )
}

export default FormViewLink;