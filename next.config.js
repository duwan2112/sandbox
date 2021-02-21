require("dotenv").config();
const withImages = require("next-images");
module.exports = withImages({
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    SERVER_API_URL: process.env.SERVER_API_URL,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
});
