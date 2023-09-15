import React, { useContext, useEffect, useState } from 'react'
import Message from "./Message"
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userChats', data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => unSub();
  }, [data.chatId])

  return (
    <div className='messages'>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
    </div>
  );
}

export default Messages