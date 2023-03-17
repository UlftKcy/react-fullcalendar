import Modal from "../Modal";
import Form from "../Form";

interface ModalCreateProps {
  mode: string;
  onToggle: () => void
}

const ModalCreateEvent = ({ onToggle, mode }: ModalCreateProps) => {
  return (
    <Modal headerText="Create New Event" onToggle={onToggle}>
      <Form mode={mode} onToggle={onToggle} />
    </Modal>
  );
};

export default ModalCreateEvent;
