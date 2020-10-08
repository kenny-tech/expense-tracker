import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from '../styles/style';

const DateRangeButton = ({ customClick,title }) => {
    return (
        <TouchableOpacity style={styles.dateRangeButton} onPress={customClick}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default DateRangeButton;