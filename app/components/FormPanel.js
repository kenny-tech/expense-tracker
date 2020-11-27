import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/style';

const FormPanel = ({ types, customPress }) => {
    return (
        <View>
            {
                types.map(type => {
                    return (
                        <TouchableOpacity onPress={() => customPress(type.rowid)}>
                            <View style={styles.formViewPanel} key={type.rowid}>
                                <View style={{width: '80%'}}>
                                    <Text style={{fontSize: 18, margin: 15}}>{type.name}</Text>
                                </View>
                                <View style={{width: '20%'}}>
                                    <Icon name="pencil" size={30} color="#4b81bf" style={{marginTop: 10, marginLeft: 20}} /> 
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default FormPanel;