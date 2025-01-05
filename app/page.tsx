import { getAllBooking } from "@/actions/savedata";
import BookingModal from "./components/BookingModal";
import UserTable from "./components/UsersTable";

export default async function BookTable() {
  const { data } = await getAllBooking();

  return (
    <>
      <div className="font-sans  text-gray-800">
        <header className="bg-[#4f46e5] px-10 py-16 text-center">
          <h1 className="text-5xl font-bold text-white leading-snug drop-shadow-md">
            Reserve Your Table
          </h1>
        </header>

        <main className="px-5 py-10 mx-auto max-w-5xl">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Effortless Reservations
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Secure your spot at the best restaurants with ease. Experience
              modern dining at its finest with just a few clicks.
            </p>
          </section>

          <div className="flex justify-center">
            <BookingModal />
          </div>
        </main>

        {data && (
          <section className="px-5 py-10 mx-auto max-w-5xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Your Reservations
            </h3>
            <UserTable bookings={data} />
          </section>
        )}
      </div>
    </>
  );
}
