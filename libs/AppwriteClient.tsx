import {
  Account,
  Client,
  ID,
  Databases,
  Query,
  Storage,
  Teams,
} from "appwrite";

const client = new Client();

client
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT))
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const team = new Teams(client);
export { client, account, database, storage, ID, Query, team };
