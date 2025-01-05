"use server";
import { CreateBookingProp } from "@/app/interfaces";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: CreateBookingProp) {
  try {
    const existingBooking = await prisma.user.findFirst({
      where: {
        date: formData.date,
        time: formData.time,
      },
    });
    if (existingBooking) {
      return {
        success: false,
        isDuplicate: true,
        message: "Duplicate booking",
      };
    }
    await prisma.user.create({
      data: {
        name: formData.name,
        phonenumber: formData.contact,
        date: formData.date,
        time: formData.time,
        numberofGuest: formData.guest,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getAllBooking() {
  try {
    const result = await prisma.user.findMany();
    return { success: true, data: result };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function getBookedTimeSlots(date: string) {
  try {
    const result = await prisma.user.findMany({
      where: { date: date },
      select: { time: true },
    });
    return { success: true, data: result };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function deleteBooking(bookingId: number) {
  try {
    await prisma.user.delete({
      where: {
        id: bookingId,
      },
    });
    revalidatePath("/");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
