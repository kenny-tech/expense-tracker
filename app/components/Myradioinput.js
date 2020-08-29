import React, { useState } from 'react';
import { View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const Myradioinput = ({ label1, label2, value1, value2 }) => {

    const [value, setValue] = useState('');

    let radio_props = [
        {label: label1, value: value1 },
        {label: label2, value: value2 }
    ];
    
    return (
        <View>
            <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                onPress={(value) => {setValue(value)}}
                style={{marginHorizontal: 10}}
            />
        </View>
    );
}

export default Myradioinput;