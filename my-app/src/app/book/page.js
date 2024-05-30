'use client'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Page() {
  const [startDate, setStartDate] = useState(new Date());
  const [role, setRole] = useState('admin');
  const [eventName, setEventName] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventType, setEventType] = useState('')


  function DateSelected(date) {
    
    console.log(date.getMonth() + 1) // Month => 6,7,8
    console.log(date.getFullYear()) // Year => 2023,2024,2025
    console.log(date.getDate()) // Day of Month => 20,21,22,23
    setStartDate(date)
  }

  function EventSelected(event) {
    let eventText = event.el.innerText
    let eventDetails = eventText.split(' ')
    setEventName(eventDetails[0])
    setEventTime(eventDetails[1])
    setEventType(eventDetails[2])
    document.getElementById('my_modal_2').showModal()
  }

  return (
    <>
      <div className="flex justify-center pt-10">
        <DatePicker
          selected={startDate}
          onChange={(date) => DateSelected(date)}
          inline
          minDate={new Date()} // minimum date to select
          // excludeDates={[new Date()]} //dates can't be selected
          fixedHeight
        />
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventClick={(event) => EventSelected(event)}
        selectAllow={{startDate: new Date()}}
        events={[
          { title: 'jamal 15:00 hair', date: '2024-05-01' },
          { title: 'narmen', date: '2024-05-01' }
        ]}
      />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-4xl text-colors-evestGreen-600 text-center py-5">Name: {eventName}</h3>
          <p className="py-4 text-center text-xl">Time: {eventTime}</p>
          <p className="py-4 text-center text-xl">Event: {eventType}</p>
          <form method="dialog" className="flex justify-center text-xl py-2 ">
            <button className="bg-purple-500 px-10 rounded-lg py-2">close</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </>
  );
}