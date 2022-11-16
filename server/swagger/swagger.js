const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger/output.json";
const endpointsFiles = [
  "./routes/api/area.js",
  "./routes/auth.js",
  "./routes/api/discord.js",
  "./routes/api/google.js",
  "./routes/api/facebook.js",
  "./routes/api/microsoft.js",
  "./routes/api/twitter.js",
  "./routes/private.js",
];

swaggerAutogen(outputFile, endpointsFiles);
