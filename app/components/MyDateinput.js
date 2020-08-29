import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker'

const MyDateinput = () => {

    const [date, setDate] = useState('');

    return (
        <DatePicker
          style={{width: 200}}
          date={date}
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
          onDateChange={(date) => {setDate(date)}}
          style={{marginHorizontal: 10}}
        />
    )
  
}

export default MyDateinput;