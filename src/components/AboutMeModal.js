import Modal from 'react-modal';
import { ABOUT_ME, ABOUT_WEBSITE, ABOUT_LINKS } from '../const/About';
export default function AboutMeModal(props) {
  Modal.setAppElement('body');

  return (
    <Modal
      contentLabel="About Me Modal"
      className="modal"
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      overlayClassName="overlay"
    >
      <div className={"modalClose"}>
        <p onClick={props.onClose}>X</p>
      </div>
      <div className={"modalAboutInfo"}>
        {ABOUT_ME}
        {ABOUT_WEBSITE}
        {ABOUT_LINKS}
      </div>
      <div className={"modalAboutLinks"}>
        <div className={"modalAboutLink"}>
          <a href={"/documents/resume.pdf"}>Resume</a>
        </div>
        <div className={"modalAboutLink"}>
          <a href={"https://www.linkedin.com/in/turner-strayhorn/"}>LinkedIn</a>
        </div>
        <div className={"modalAboutLink"}>
          <a href={"https://www.github.com/renrut"}>Github</a>
        </div>
      </div>
    </Modal>
  );
}