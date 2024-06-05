"use client";
import React, { useState } from "react";

const DateList = ({ dates, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div>
      <h3>Select a Date</h3>
      <ul>
        {dates?.map((date, index) => (
          <li key={index} onClick={() => handleDateClick(date)}>
            {date}
          </li>
        ))}
      </ul>
      {selectedDate && <p>Selected Date: {selectedDate}</p>}
    </div>
  );
};

export default DateList;
