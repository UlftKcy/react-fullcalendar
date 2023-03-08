import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import TextInput from '../Input/TextInput';
import Modal from '../Modal'

const ModalUpdateEvent = ({ onToggle,calendarRef }: { onToggle: any ,calendarRef:any}) => {
    /* const selectedDay = useAppSelector((state) => state.eventReducer.selectDay); */
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const dispatch = useDispatch();
  
   /*  useEffect(() => {
      if (selectedDay) {
        setStartDate(selectedDay);
      }
    }, []); */
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
     /*  let newEvent = { id: id, title: title, start: startDate, end: endDate };
      let calendarApi = calendarRef.current.calendar
      if (title) {
        calendarApi.addEvent({ // will render immediately. will call handleEventAdd
          id:id,
          title:title,
          start: startDate,
          end: endDate,
        }, true) // temporary=true, will get overwritten when reducer gives new events
      }
      dispatch(addEvents(newEvent));
      onToggle(); */
    };
  return (
    <Modal headerText="Update Event" onToggle={onToggle}>
      <form onSubmit={handleSubmit}>
          <div className="py-4 px-8">
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="Event Title"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="Start Date"
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="End Date"
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="py-3 px-8 flex justify-end">
            <Button
              type="submit"
              className="px-3 py-1 bg-sky-500 text-white font-normal hover:bg-sky-600 border-0 focus:outline-none tracking-wide mr-2"
            >
              Update
            </Button>
            <Button className="px-3 py-1 bg-slate-400 text-white font-normal hover:bg-slate-500 border-0 focus:outline-none tracking-wide mr-2">
              Delete
            </Button>
            <Button
              onClick={onToggle}
              className="px-3 py-1 bg-slate-400 text-white font-normal hover:bg-slate-500 border-0 focus:outline-none tracking-wide"
            >
              Cancel
            </Button>
          </div>
        </form>
    </Modal>
  )
}

export default ModalUpdateEvent