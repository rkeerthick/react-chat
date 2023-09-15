import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleClick = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderID: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } 
    else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text
      },
      [data.chatID + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage(null);
  };



  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <div className="send">
        <img src="/images/img.png" alt="" />
        <input
          type="file"
          className="file"
          id="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <label htmlFor="file">
          <img src="/images/attach.png" alt="" />
        </label>
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};

export default Input;
