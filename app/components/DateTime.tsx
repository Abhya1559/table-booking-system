"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookedTimeSlots } from "@/actions/savedata";

interface TimeSlotProp {
  time: string;
  available: boolean;
}
interface Props {
  setDateTime: (date: string, time: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function DateTime({ setDateTime, open, setOpen }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<TimeSlotProp[] | []>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    string | undefined
  >();

  function handlePick() {
    if (date && selectedTimeSlot) {
      setDateTime(date.toLocaleDateString(), selectedTimeSlot);
      setOpen(false);
    } else {
      alert("Please pick time slot");
    }
  }

  const getTime = async () => {
    const timeList: TimeSlotProp[] = [];
    const bookedTimeSlotsResponse = await getBookedTimeSlots(
      date!.toLocaleDateString()
    );

    const bookedTimeSlots =
      bookedTimeSlotsResponse.data?.map((slot) => slot.time) ?? [];

    for (let i = 10; i <= 12; i++) {
      timeList.push(
        ...[
          {
            time: i + ":00 AM",
            available: bookedTimeSlots.indexOf(i + ":00 AM") === -1,
          },
          {
            time: i + ":30 AM",
            available: bookedTimeSlots.indexOf(i + ":30 AM") === -1,
          },
        ]
      );
    }
    for (let i = 1; i <= 9; i++) {
      timeList.push(
        ...[
          {
            time: i + ":00 PM",
            available: bookedTimeSlots.indexOf(i + ":00 PM") === -1,
          },
          {
            time: i + ":30 PM",
            available: bookedTimeSlots.indexOf(i + ":30 PM") === -1,
          },
        ]
      );
    }
    setTimeSlot(timeList);
  };

  const isPastDay = (day: Date) => {
    const today = new Date();
    if (
      today.getDate() == day.getDate() &&
      today.getMonth() == day.getMonth() &&
      today.getFullYear() == day.getFullYear()
    ) {
      const hasDatePassed = today.getHours() > 21;
      const tomorrow = new Date(day);
      tomorrow.setDate(day.getDate() + 1);
      return hasDatePassed;
    }
    return day < today;
  };

  useEffect(() => {
    if (date) {
      getTime();
    }
  }, [date?.getTime()]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>
        
      </DialogTrigger> */}
      <DialogContent className="z-[99] max-w-[90%] sm:max-w-lg lg:max-w-2xl overflow-auto max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Book The Table</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-baseline mt-5">
              {/* Calendar */}
              <div className="flex flex-col gap-3 items-baseline">
                <div className="flex items-center gap-2">
                  <CalendarDays className="text-black-400 h-5 w-5" />
                  Select Date
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={isPastDay}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              {/* timeslot */}
              <div className="mt-3 ">
                <h2 className="flex gap-2 items-center">
                  <Clock className="text-black-500 h-5 w-5 mb-2" />
                  Select Time
                </h2>
                {!timeSlot.length && (
                  <div>Choose date to get the available time slots</div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border rounded-lg p-3 text-sm">
                  {timeSlot.length &&
                    timeSlot.map((slot, i) =>
                      slot.available ? (
                        <button
                          key={i}
                          onClick={() =>
                            slot.available
                              ? setSelectedTimeSlot(slot.time)
                              : null
                          }
                          className={`p-2 border text-center cursor-pointer hover:bg-blue-500 rounded-full hover:text-white ${
                            slot.time == selectedTimeSlot
                              ? "bg-blue-500 text-white"
                              : ""
                          }`}
                        >
                          {slot.time}
                        </button>
                      ) : (
                        <button
                          key={i}
                          className={`p-2 border text-center rounded-full text-gray-400 border-gray-100 cursor-not-allowed`}
                        >
                          {slot.time}
                        </button>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end gap-3">
          <DialogClose asChild>
            <>
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 hover:text-red-500"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-indigo-500 border-blue-500 hover:text-indigo-500"
                disabled={!(date && selectedTimeSlot)}
                onClick={handlePick}
              >
                Picked
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
