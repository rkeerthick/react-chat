import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error, "error");
      setError(true);
    }
  };

  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    // check for the group exist (in the database) if not create a new group

    try {
      const response = await getDocs(db, "chats", combinedID);

      if (!response.exists()) {
        await setDoc(doc, (db, "chats", combinedID), {
          messages: [],
        });
      }
    } catch (error) {
      setError(true);
    }

    // create new chats
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          name=""
          id=""
          placeholder="Find a chat"
          onKeyDown={handleKey}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
