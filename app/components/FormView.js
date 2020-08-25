import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/style';

const FormView = (props) => {
    return (
        <View style={styles.formView}>
           <Text style={styles.formViewLabel}>{props.label}</Text>
        </View>
    )
}

export default FormView;