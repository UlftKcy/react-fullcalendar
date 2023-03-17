import Modal from "../Modal";
import Form from "../Form";

interface ModalUpdateProps {
  mode: string
  onToggle: () => void
}

const ModalUpdateEvent = ({ onToggle, mode }: ModalUpdateProps) => {
  return (
    <Modal headerText="Update Event" onToggle={onToggle}>
      <Form mode={mode} onToggle={onToggle} />
    </Modal>
  );
};

export default ModalUpdateEvent;
