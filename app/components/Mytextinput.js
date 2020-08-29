import React from 'react';
import { TextInput } from 'react-native';

const Mytextinput = (props) => {
    return (
        <TextInput
            underlineColorAndroid="transparent"
            placeholder={props.placeholder}
            placeholderTextColor="gray"
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}
            multiline={props.multiline}
            onSubmitEditing={props.onSubmitEditing}
            style={{ height: 35, borderColor: "gray", borderBottomWidth: 1, marginHorizontal: 10}}
            blurOnSubmit={false}
            value={props.value}
        />
    )
}

export default Mytextinput;