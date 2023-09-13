import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", response.user.uid), {});

            navigate("/")

          } catch (err) {
            console.log(err);
            setError(true);
          }
        });
      });
    } catch (err) {
      
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="" id="" placeholder="Enter your name" />
          <input type="email" name="" id="" placeholder="Enter your email" />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
          />
          <input className="file-hidden" type="file" name="file" id="file" />
          <label htmlFor="file">
            <img src="/images/addAvatar.png" alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        {error && <span>Something is wrong!!</span>}
        <p>
          Do you have a account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
