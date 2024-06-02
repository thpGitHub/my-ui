import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from '../../../graphql/schema';
import dbConnect from '../../../lib/mongodb';

let apolloServer = null;

async function startApolloServer() {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();
  }
}

export async function POST(req, res) {
  await startApolloServer();
  await dbConnect();
  const handler = startServerAndCreateNextHandler(apolloServer);
  return handler(req, res);
}

export async function OPTIONS(req, res) {
  res.status(200).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
