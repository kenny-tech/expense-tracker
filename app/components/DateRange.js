import React from 'react';
import DatePicker from 'react-native-datepicker'
import { View, Text } from 'react-native';

const DateRange = ({ defaultDate,onDateChange,label }) => {

    return (  
        <View>
            <Text style={{color: '#4b81bf', fontWeight: 'bold', marginHorizontal: 10}}>{label}</Text>
            <DatePicker
                style={{width: 200}}
                date={defaultDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                    },
                    dateInput: {
                    marginLeft: 36
                    }
                }}
                onDateChange={onDateChange}
                style={{marginHorizontal: 10}}
            />
        </View> 
    )
  
}

export default DateRange;