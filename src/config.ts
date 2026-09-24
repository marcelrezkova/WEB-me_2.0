export const links = {
  calendar: 'https://calendar.app.google/QfV5shFu5VgQiV3s7',
  /** Stripe Payment Link; empty string means "not configured yet" — UI falls back to calendar. */
  stripe: '',
  email: 'marcelarezkova98@icloud.com',
  linkedin: 'https://www.linkedin.com/in/marcelrezkova/',
  github: 'https://github.com/marcelrezkova',
  cv: '/MarcelaRezkova_CV_EN.pdf',
} as const;

export const bookingUrl = () => links.stripe || links.calendar;
