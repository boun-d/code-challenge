import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";

import { context } from "./context";
import { GraphqlContext } from "./types";
import typedefs from "./typedefs";
import resolvers from "./resolvers";

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer<GraphqlContext>({
  typeDefs: typedefs,
  resolvers: resolvers,
});

// Start the server
const port = process.env.PORT;

async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: context,
    })
  );

  // Start HTTP server
  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => console.error("Error starting server:", err));
