"use client";
import { useState } from "react";
import Modal from "react-modal";
import DateList from "./dateList";
import axiosWithToken from "@/utils/fetchWithToken";

const RowModal = ({ isOpen, onRequestClose, item }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remarks, setRemarks] = useState(null);

  const dates = item?.proposed_dates;

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosWithToken.put(
        `/api/wellness-events/${item?.company.company_id}/status`,
        {
          status: "Approved",
          remarks,
          confirmed_date: selectedDate,
        },
      );
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error("Error approving", error);
      // Handle error response
    } finally {
      setIsSubmitting(false);
      onRequestClose();
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosWithToken.put(
        `/api/wellness-events/${item?.company.company_id}/status`,
        {
          status: "Rejected",
          remarks,
          confirmed_date: null,
        },
      );
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error("Error approving", error);
      // Handle error response
    } finally {
      setIsSubmitting(false);
      onRequestClose();
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Row Details"
    >
      <DateList dates={dates} onSelectDate={handleSelectDate} />
      <div>
        <label htmlFor="remarks">Remarks:</label>
        <input
          type="text"
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      {!selectedDate && (
        <button onClick={handleReject} disabled={isSubmitting}>
          Reject
        </button>
      )}
      {selectedDate && (
        <button onClick={handleApprove} disabled={isSubmitting}>
          Approve
        </button>
      )}
      <button onClick={handleCloseModal}>Close</button>
    </Modal>
  );
};

export default RowModal;
