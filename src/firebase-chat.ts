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

export function useChat() {
  const authModule: Auth = getModule(Auth, store)
    
  const messages: Array<DocumentData> = []
  const firestore: Firestore = getFirestore()
  const messagesCollectionRef: CollectionReference<DocumentData> = collection(firestore, 'messages')
  const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(100))

  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log('message : ', doc.data())
      messages.push(doc.data())
    })
  })
  unsubscribe()
  
  const sendMessage = (text: string) => {
    if (!authModule.isLoggedIn) return
    const { photoURL, uid, displayName } = authModule.loggedInUser

    addDoc(messagesCollectionRef, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp()
    })
  }

  /*const messages = ref([])
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }*/

  return { messages, sendMessage }
}