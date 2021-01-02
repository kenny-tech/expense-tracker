import React from 'react';
import { TextInput } from 'react-native';

const Mytextinput = ({ placeholder,keyboardType,onChangeText,returnKeyType,numberOfLines,multiline,onSubmitEditing,defaultValue }) => {
    return (
        <TextInput
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            placeholderTextColor="gray"
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            style={{ height: 40, marginHorizontal: 10}}
            blurOnSubmit={false}
            defaultValue={defaultValue}
        />
    )
}

export default Mytextinput;