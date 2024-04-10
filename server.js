const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");

const port = process.env.PORT || 5000;
let server;

async function bootstrap() {
  try {
    await mongoose.connect(process.env.PRODUCTION_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🛢 Database is connected successfully`.red.bold);

    server = app.listen(port, () => {
      console.log(`Application  listening on port ${port}`.blue.bold);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
