export type CreateBookingProp = {
  name: string;
  contact: string;
  guest: number;
  date: string;
  time: string;
};

export type FormError = Partial<Record<keyof CreateBookingProp, string>>;
