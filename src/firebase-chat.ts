import { onUnmounted } from 'vue'
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
  console.log('useChat()')
  let messages: Array<DocumentData> = []

  // dummy data ...
  /*messages.push({
    id: 'nqjJLEZ9aFmjjQ3EBC0g',
    text: 'Hi, I am ICanDoEverything.',
    userPhotoURL: 'https://lh3.googleusercontent.com/a/AATXAJxkyWgIoQbhoNQapp6ChdCMqhAK6KDNoLBjP-lk=s96-c',
    userName: 'everything icando',
    userId: 'nyps3c0hWwTWQaAtXXmjidvLUFl1',
    createdAt: {
      nanoseconds: 91000000,
      seconds: 1648792680
    }
  } as DocumentData)
  messages.push({
    id: 'R55R7ca0wvIGS5LoXjd7',
    text: 'Great.',
    userPhotoURL: 'https://lh3.googleusercontent.com/a/AATXAJxkyWgIoQbhoNQapp6ChdCMqhAK6KDNoLBjP-lk=s96-c',
    userName: 'everything icando',
    userId: 'nyps3c0hWwTWQaAtXXmjidvLUFl1',
    createdAt: {
      nanoseconds: 260000000,
      seconds: 1648792853
    }
  } as DocumentData)
  messages.push({
    id: 'q0cjqV9DiDiV51OICX3P',
    text: 'Happy New Year',
    userPhotoURL: 'https://lh3.googleusercontent.com/a/AATXAJxkyWgIoQbhoNQapp6ChdCMqhAK6KDNoLBjP-lk=s96-c',
    userName: 'everything icando',
    userId: 'nyps3c0hWwTWQaAtXXmjidvLUFl1',
    createdAt: {
      nanoseconds: 144000000,
      seconds: 1648792856
    }
  } as DocumentData)
  messages.push({
    id: 'btdz3SbU2f6OKlCaVsQT',
    text: 'I still can\'\t see the message list.',
    userPhotoURL: 'https://lh3.googleusercontent.com/a/AATXAJxkyWgIoQbhoNQapp6ChdCMqhAK6KDNoLBjP-lk=s96-c',
    userName: 'everything icando',
    userId: 'nyps3c0hWwTWQaAtXXmjidvLUFl1',
    createdAt: {
      nanoseconds: 62000000,
      seconds: 1648793217
    }
  } as DocumentData)*/

  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    messages = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()

    messages.forEach(each => {
      console.log('message : ', each)
    })
  })
  onUnmounted(unsubscribe)
  console.log('firebase-chat.ts -> messages : ', messages)
  
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