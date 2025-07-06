export const DB_NAME = "UpClass";

export const CORS_ORIGIN_DEV = [
  "http://localhost:5173",
  "http://localhost:8000",
];

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "PROD",
};
