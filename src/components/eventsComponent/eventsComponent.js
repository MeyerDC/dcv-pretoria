import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal"; // Add this import
import "./eventsComponent.css";
import comingSoon from "../../assets/images/coming-soon.jpg";
import { useLanguage } from "../language-context/language-contextComponent";

const useHandleImageClick = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  
  
  return {
    showModal,
    setShowModal,
    handleCloseModal,
    handleImageClick,
    selectedImage,
  };
};

const EventsComponent = () => {
  const { showModal, handleCloseModal, handleImageClick, selectedImage } =
  useHandleImageClick();
  const { language, translations } = useLanguage();
  const { date1, date2, title1, title2 } = translations[language].events;
  
  return (
    <div className="event-body">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h2 className="event-date">{date1}</h2>
            <h2 className="event-title">{title1}</h2>
          </Accordion.Header>
          <Accordion.Body>
            <img
              className="accordian-image"
              src={comingSoon}
              alt="DCV Karneval - German Night"
              onClick={() => handleImageClick(comingSoon)}
            />
            <p className="event-description"></p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h2 className="event-date">{date2}</h2>
            <h2 className="event-title">
              {title2}
            </h2>
          </Accordion.Header>
          <Accordion.Body>
            <img
              className="accordian-image"
              src={comingSoon}
              alt="DCV Karneval - International Evening"
              onClick={() => handleImageClick(comingSoon)}
            />
            <p className="event-description"></p>
          </Accordion.Body>
        </Accordion.Item>
        {/* Rest of the accordion items */}
      </Accordion>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          {/* Render the zoomed in image here */}
          {selectedImage && (
            <img
              className="modal-image"
              src={selectedImage}
              alt="Zoomed In Image"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventsComponent;
