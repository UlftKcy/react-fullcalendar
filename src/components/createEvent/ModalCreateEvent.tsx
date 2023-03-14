import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvents } from "../../features/events/eventSlice";
import { useAppSelector } from "../../hooks/redux-helper";
import Button from "../Button/Button";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import { v4 as uuid } from 'uuid';

const ModalCreateEvent = ({ onToggle }: { onToggle: any }) => {
  const selectedDay = useAppSelector((state) => state.eventReducer.selectDay);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDay) {
      setStartDate(selectedDay);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newEvent = { id: uuid(), title: title, start: startDate, end: endDate };
    dispatch(addEvents(newEvent));
    onToggle();
  };

  return (
    <Modal headerText="Create New Event" onToggle={onToggle}>
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <TextInput
            label="Title"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            label="Start Date"
            type="datetime-local"
            name="startDate"
            id="startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextInput
            label="End Date"
            type="datetime-local"
            name="endDate"
            id="endDate"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label htmlFor="allDay">
            <input type="checkbox" name="allDay" id="allDay" className="w-4 h-4 mr-2 accent-indigo-600 border-indigo-300 rounded focus:ring-indigo-500 focus:ring-2" />
            All Day
          </label>
        </div>
        <div className="py-3 px-8 flex justify-end">
          <Button
            type="submit"
            className="px-3 py-1 bg-sky-500 text-white font-normal hover:bg-sky-600 border-0 focus:outline-none tracking-wide mr-2"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
};

export default ModalCreateEvent;
