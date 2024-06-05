"use client";
import { useState } from "react";
import Modal from "./tableModal";

const table = ({ setPage, page, data }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  console.log({ data });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Vendor Name</th>
            <th>Confirmed Date</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>View Button</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.event.event_name}</td>
              <td>{item.company.company_name}</td>
              <td>
                {item.confirmed_date
                  ? item.confirmed_date
                  : item.proposed_dates.map((date) => date)}
              </td>
              <td>{item.status}</td>
              <td>{item.date_created}</td>
              <td>
                <button onClick={() => openModal(item)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span>{` Page ${page} of ${totalPages} `}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        item={selectedItem}
      />
    </div>
  );
};

export default table;
