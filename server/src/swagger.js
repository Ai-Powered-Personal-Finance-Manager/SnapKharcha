import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "SnapKharcha API",
    description: "Smart Personal Finance Manager",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./swagger-output.json"; // auto generated file
const routes = ["./src/server.js",];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
