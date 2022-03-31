import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/store/modules/auth.module'
import {
  getFirestore,
  collection,
  CollectionReference,
  Firestore,
  DocumentData,
  query,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore'

export function useChat() {
  const authModule: AuthModule = getModule(AuthModule, store)
    
  const user = authModule.loggedInUser
  const isLogin = authModule.isLoggedIn

  console.log('firebase-chat.ts -> user : ', user)
  console.log('firebase-chat.ts -> isLogin : ', isLogin)

  const messages: Array<DocumentData> = []
  const firestore: Firestore = getFirestore()
  const messagesCollectionRef: CollectionReference<DocumentData> = collection(firestore, 'messages')
  const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'), limit(100))

  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      messages.push(doc.data())
    })
  })
  unsubscribe()
  
  const sendMessage = (text: string) => {
    console.log('send message -> text : ', text)
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