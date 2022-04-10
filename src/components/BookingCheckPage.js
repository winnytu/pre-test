import React from 'react';
import RoomAllocation from './RoomAllocation'

// 展示RoomAllocation
const BookingCheckPage = (props) => {
    return (
        <RoomAllocation 
            guest={3} 
            room={3} 
            onChange={(result)=>console.log(result)}
        />
    )
}

export default BookingCheckPage