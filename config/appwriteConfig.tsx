import { Client, Databases, Account, ID, Query, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT))
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT));

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { Query, storage, client, database, account, ID };
