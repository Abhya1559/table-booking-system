"use client";
import { deleteBooking } from "@/actions/savedata";
import { User } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function UserTable(props: { bookings: User[] }) {
  const headers = ["Name", "Phone Number", "Number of Guest", "Date", "Time"];

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  async function handleDeleteBooking(bookingId: number, name: string) {
    // Using NextJS Server Action
    const res = await deleteBooking(bookingId);

    // Using Express API
    // const response = await fetch("http://localhost:5000/delete-booking", {
    //   method: "POST",
    //   body: JSON.stringify({bookingId: bookingId}),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const res = await response.json();

    if (res) {
      setConfirmationMessage(`Removed Booking by: ${name}`);
      setConfirmationOpen(true);
    } else {
      setConfirmationMessage("Something went wrong");
      setConfirmationOpen(true);
    }
  }
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="overflow-x-auto w-full max-w-6xl border rounded">
        <table className="min-w-full bg-white shadow-md  overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th className="text-center py-3 px-6 text-sm font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {props.bookings.map((row, idx) => {
              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {row.name}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {row.phonenumber}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {row.numberofGuest}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {row.date}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {row.time}
                  </td>
                  <td className="py-3 px-6 flex justify-center items-center gap-4">
                    {/* <EditIcon size={18} className="cursor-pointer" /> */}
                    <Trash2Icon
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteBooking(row.id, row.name)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        title="Booking Status"
        description={confirmationMessage}
      />
    </div>
  );
}
