import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  databaseId: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  postCollectId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const account = new Account(client);
export const databses = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);
