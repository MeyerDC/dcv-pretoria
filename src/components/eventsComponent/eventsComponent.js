import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import "./eventsComponent.css";
import dcv2025 from "../../assets/images/dcv2025.jpeg";
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

  const handleBuyTickets = (event) => {}
  
  return {
    showModal,
    setShowModal,
    handleCloseModal,
    handleImageClick,
    handleBuyTickets,
    selectedImage,
  };
};

const EventsComponent = () => {
  const { showModal, handleCloseModal, handleImageClick, handleBuyTickets, selectedImage } =
    useHandleImageClick();
  const { language, translations } = useLanguage();
  const { date1, date2, date3, title1, title2, title3, ticketLinks } = translations[language].events;

  return (
    <div className="event-body">
      <img
        className="event-image"
        src={dcv2025}
        alt="DCV Karneval - Event"
        onClick={() => handleImageClick(dcv2025)}
      />
      <div className="event-row">
        <h2 className="event-date">{date1}</h2>
        <h2 className="event-title">{title1}</h2>
        <Button variant="outline-warning" href={ticketLinks.event1} target="_blank">
          Buy Tickets
        </Button>
      </div>
      <div className="event-row">
        <h2 className="event-date">{date2}</h2>
        <h2 className="event-title">{title2}</h2>
        <Button variant="outline-warning" href={ticketLinks.event2} target="_blank">
          Buy Tickets
        </Button>
      </div>
      <div className="event-row">
        <h2 className="event-date">{date3}</h2>
        <h2 className="event-title">{title3}</h2>
        <Button variant="outline-warning" href={ticketLinks.event3} target="_blank">
          Buy Tickets
        </Button>
      </div>


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
