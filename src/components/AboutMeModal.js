import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';

export default function AboutMeModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel="About Me Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">About Me</h2>
          <button className="modal-close" onClick={props.closeModal}>X</button>
        </div>
        <div className="modal-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl ne
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae nisl ne
          </p>
       </div>
      </div>
    </Modal>
  );
}