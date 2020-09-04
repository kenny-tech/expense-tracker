import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import styles from '../styles/style';

const Mybutton = ({ customClick,title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={customClick}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Mybutton;