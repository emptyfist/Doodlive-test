import { onUnmounted, ref, Ref } from 'vue'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/modules/auth.module'
import {
  getFirestore,
  collection,
  CollectionReference,
  Firestore,
  DocumentData,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'

const authModule: Auth = getModule(Auth, store)
    
const firestore: Firestore = getFirestore()
const messagesCollectionRef: CollectionReference<DocumentData> = collection(firestore, 'messages')
const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(100))

export function useChat() {
  const messages: Ref<DocumentData[] | null> = ref<DocumentData[] | null>(null)

  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    messages.value = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)
  
  const sendMessage = (text: string) => {
    if (!authModule.isLoggedIn) return
    // console.log('authModule.loggedInUser = ', authModule.loggedInUser)
    const { email, photoURL, uid, displayName } = authModule.loggedInUser

    addDoc(messagesCollectionRef, {
      email: email,
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp()
    })
  }

  return { messages, sendMessage }
}