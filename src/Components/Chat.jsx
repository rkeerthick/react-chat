import React from 'react'
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="userName">Jane</span>
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