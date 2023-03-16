import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvents } from "../../features/events/eventSlice";
import Button from "../Button/Button";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import { v4 as uuid } from "uuid";

const ModalCreateEvent = ({ onToggle }: { onToggle: any }) => {
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newEvent = {
      id: uuid(),
      title: title,
      start: isAllDay ? `${startDate.split("T")[0]}T00:00:00` : startDate,
      end: isAllDay ? `${endDate.split("T")[0]}T23:59:00` : endDate,
      allDay:isAllDay,
    };
    dispatch(addEvents(newEvent));
    onToggle();
  };

  return (
    <Modal headerText="Create New Event" onToggle={onToggle}>
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <TextInput
            className="pl-2"
            label="Title"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            className="pl-12"
            label="Start Date"
            type={isAllDay ? "date" : "datetime-local"}
            name="startDate"
            id="startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextInput
            className="pl-12"
            label="End Date"
            type={isAllDay ? "date" : "datetime-local"}
            name="endDate"
            id="endDate"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label htmlFor="allDay">
            <input
              className="w-4 h-4 mr-2 accent-indigo-600 border-indigo-300 rounded focus:ring-indigo-500 focus:ring-2"
              type="checkbox"
              name="allDay"
              id="allDay"
              checked={isAllDay}
              onChange={() => setIsAllDay(!isAllDay)}
            />
            All Day
          </label>
        </div>
        <div className="py-3 px-8 flex justify-end">
          <Button
            type="submit"
            className="px-3 py-1 bg-indigo-600 text-white font-normal hover:bg-indigo-500 border-0 focus:outline-none tracking-wide mr-2"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateEvent;
