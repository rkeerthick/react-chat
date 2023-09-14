import React, { useContext } from 'react'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';

const Chat = () => {

  const { data } = useContext(ChatContext);


  console.log(data.user)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="userName">{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src="/images/cam.png" alt="" />
          <img src="/images/add.png" alt="" />
          <img src="/images/more.png" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat