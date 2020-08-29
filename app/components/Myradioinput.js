import React, { useState } from 'react';
import { View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const Myradioinput = (props) => {

    const [value, setValue] = useState('');

    let radio_props = [
        {label: props.label1, value: props.value1 },
        {label: props.label2, value: props.value2 }
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