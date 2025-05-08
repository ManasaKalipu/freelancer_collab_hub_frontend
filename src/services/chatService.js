import { collection, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const chatService = {
  async sendMessage(senderId, receiverId, text) {
    try {
      const chatId = [senderId, receiverId].sort().join('_');
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId,
        receiverId,
        text,
        timestamp: new Date()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  subscribeToMessages(senderId, receiverId, callback) {
    const chatId = [senderId, receiverId].sort().join('_');
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  },

  async getRecentChats(userId) {
    try {
      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", userId)
      );
      return new Promise((resolve) => {
        onSnapshot(q, (snapshot) => {
          const chats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          resolve(chats);
        });
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};