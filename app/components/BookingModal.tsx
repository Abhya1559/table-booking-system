"use client";
import { useState } from "react";
import Modal from "./Modal";
import { createBooking } from "@/actions/savedata";
import { CreateBookingProp, FormError } from "../interfaces";
import ConfirmationModal from "./ConfirmationModal";
import DateTime from "./DateTime";
import { Button } from "@/components/ui/button";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);

  const [formData, setFormData] = useState<CreateBookingProp>({
    name: "",
    contact: "",
    guest: 0,
    date: "",
    time: "",
  });

  function setDateTime(date: string, time: string) {
    setFormData((p) => ({
      ...p,
      time: time,
      date: date,
    }));
    // alert(JSON.stringify(formData));
  }

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errors, setErrors] = useState<FormError>({});
  const validate = (): FormError => {
    const newErrors: FormError = {};
    const stringRegex = /^[a-zA-Z]+$/;
    const intRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.guest || formData.guest <= 0)
      newErrors.guest = "Number of guest must be greater than 0";
    if (!formData.name) newErrors.name = "name is required";
    if (!stringRegex.test(formData.name)) newErrors.name = "name is not valid";
    if (!formData.contact) newErrors.contact = "contact is required";
    if (!intRegex.test(formData.contact))
      newErrors.contact = "Mobile number is not valid";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Using Next.JS Server Action
      const res = await createBooking(formData);

      // Using Express API
      // const response = await fetch("http://localhost:5000/create-booking", {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const res = await response.json();

      if (res.success) {
        setConfirmationMessage("Table Booking Successful");
        setConfirmationOpen(true);
        setErrors({});
        setIsOpen(false);
        return;
      } else if (res.isDuplicate) {
        setConfirmationMessage(
          "The selected time slot is already booked. Please select other"
        );
        setConfirmationOpen(true);
        return;
      } else {
        setConfirmationMessage("Failed to book table");
        setConfirmationOpen(true);
        return;
      }
    }
  };

  function handleBookingSummary() {
    setFormData({
      name: "",
      contact: "",
      guest: 0,
      date: "",
      time: "",
    });
    setConfirmationOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create Booking"
        description="You can create booking here"
      >
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-[550px] bg-white relative">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="mb-3 text-base font-medium text-[#07074D]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="mb-5">
                <label
                  className="mb-3 text-base font-medium text-[#07074D]"
                  typeof="tel"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.contact && <p className="error">{errors.contact}</p>}
              </div>
              <div className="mb-5">
                <label className="mb-3 text-base font-medium text-black">
                  Number of Guest
                </label>
                <input
                  type="Number"
                  placeholder="Number of Guest"
                  name="number of guest"
                  id="number of guest"
                  value={formData.guest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guest: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.guest && <p className="error">{errors.guest}</p>}
              </div>
              <div className="z-[1000] mt-4 mb-4">
                {!formData.date && !formData.time && (
                  <Button
                    type="button"
                    onClick={() => setSlotModalOpen(true)}
                    className="!bg-transparent text-black border font-medium"
                  >
                    Choose Date and Time Slot
                  </Button>
                )}
                <DateTime
                  open={slotModalOpen}
                  setOpen={setSlotModalOpen}
                  setDateTime={setDateTime}
                />
                {formData.date && (
                  <div>
                    <ul>
                      <li>Selected Date: {formData.date}</li>
                      <li>Selected Time: {formData.time}</li>
                    </ul>
                    <Button
                      type="button"
                      onClick={() => {
                        setSlotModalOpen(true);
                        console.log("Change date time");
                      }}
                      className="!bg-transparent text-black border font-medium"
                    >
                      Change Date and Time Slot
                    </Button>
                  </div>
                )}
                {(errors.date || errors.time) && (
                  <p className="error">Please select date and time here</p>
                )}
              </div>
              <button className="hover:shadow-form w-full rounded-md bg-indigo-600 py-3 px-8 text-center text-base font-normal text-white outline-none transition-all duration-300 ease-in-out hover:bg-indigo-700 transform hover:scale-105">
                Reserve Table
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-semibold border-none rounded-full no-underline cursor-pointer transition-all duration-300 ease-in-out hover:bg-indigo-700 transform hover:scale-105"
      >
        Reserve Now
      </button>
      <ConfirmationModal
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        title="Booking Summary"
        description={confirmationMessage}
        onOkClick={handleBookingSummary}
      >
        <ul className="mt-4">
          <li>Name: {formData.name}</li>
          <li>Contact Number: {formData.contact}</li>
          <li>Number of guest: {formData.guest}</li>
          <li>Date: {formData.date}</li>
          <li>Time: {formData.time}</li>
        </ul>
      </ConfirmationModal>
    </>
  );
}
