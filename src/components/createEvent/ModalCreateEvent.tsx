import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvents } from "../../features/events/eventSlice";
import { useAppSelector } from "../../hooks/redux-helper";
import Button from "../Button/Button";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import { v4 as uuid } from 'uuid';

const ModalCreateEvent = ({ onToggle }: { onToggle: any}) => {
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
            Save
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
};

export default ModalCreateEvent;
