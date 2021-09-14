import React, { Component,useState } from 'react'
import DatePicker from 'react-native-datepicker'

 export const MyDatePicker =()=> {

  // constructor(props){
  //   super(props)
  //   this.state = {date:"2016-05-15"}
  // }
  const [datepicker,setDatePicker] = useState("2016-05-15");
    return (
      <DatePicker
        style={{width: 200}}
        date={datepicker}
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDatePicker( date)}}
      />
    )

}

