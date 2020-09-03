import React from 'react';
import { TextInput } from 'react-native';

const Mytextinput = ({ placeholder,keyboardType,onChangeText,returnKeyType,numberOfLines,multiline,onSubmitEditing,value }) => {
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
            style={{ height: 35, borderColor: "gray", borderBottomWidth: 1, marginHorizontal: 10}}
            blurOnSubmit={false}
            value={value}
        />
    )
}

export default Mytextinput;