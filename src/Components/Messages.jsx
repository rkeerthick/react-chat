import React, { useContext, useEffect } from 'react'
import Message from "./Message"
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
  const [messages, setMessages] = React.useState([])

  const { data } = useContext(ChatContext);
  console.log(data, 'data');

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatID]);

  return (
    <div className='messages'>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
    </div>
  );
}

export default Messages