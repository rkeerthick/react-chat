import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div
      ref={ref}
      className={`message ${message.senderID === currentUser.uid && "owner"}`}
      // className="message owner"
    >
      <div className="messageInfo">
        <img
          src={
            message.senderID === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        {message.text !== "" && <p>{message.text}</p>}
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};

export default Message;
