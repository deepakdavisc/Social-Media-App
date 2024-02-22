import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, databses } from "./config";
import { ID, Query } from "appwrite";

export async function createUser(user: INewUser) {
  try {
    console.log("--------", user);
    const newAccount = account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(user.firstName);

    const newUser = await saveUserToDB({
      accountId: (await newAccount).$id,
      name: (await newAccount).name,
      emailAddress: (await newAccount).email,
      userName: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  emailAddress: string;
  name: string;
  imageUrl: URL;
  userName?: string;
}) {
  try {
    const newUser = await databses.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databses.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
