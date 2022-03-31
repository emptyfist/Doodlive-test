import {
  getFirestore,
  collection,
  CollectionReference,
  Firestore,
  DocumentData,
  query,
  orderBy,
  limit,
  doc,
  onSnapshot
} from 'firebase/firestore'
import type { ResponseData } from '@/@types'

const firestore: Firestore = getFirestore()
const messagesCollectionRef: CollectionReference<DocumentData> = collection(firestore, 'messages')
const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(100))

class ChatService {
  async getMessages(): Promise<ResponseData> {
    let messages = []
    const unsubscribe = onSnapshot(doc(firestore, "messages"), (doc) => {
      console.log("Current message: ", doc.data())      
    });
    unsubscribe()
    return Promise.resolve({ code: true, msg: '' })
  }
}

export default new ChatService();