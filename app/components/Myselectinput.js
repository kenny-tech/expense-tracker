import React, { useState } from 'react';
import { Picker } from 'react-native';

const Myselectinput = ({ types }) => {

    const [selectedValue, setSelectedValue] = useState("java");

    return (
        <Picker
            selectedValue={selectedValue}
            style={{ height: 40, width: 150, marginHorizontal: 5 }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
        > 
            {
                types.map(type => {
                    return (
                        <Picker.Item key={type.rowid} label={type.name} value={type.name} />
                    )
                })
            }
        </Picker>
    )
}

export default Myselectinput;