import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Register() {
  const [error, setError] = useState(false);

  const handleAdd = async (response, downloadURL, displayName, email) => {
    await updateProfile(response.user, {
      displayName,
      photoURL: downloadURL,
    });
    await setDoc(doc(db, "users", response.user.uid), {
      uid: response.user.uid,
      displayName,
      email,
      photoURL: downloadURL,
    });
  }

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

      if (!file) return;

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          debugger;
          console.log(error);
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              debugger;
              await handleAdd(response, downloadURL, displayName, email)
            })
            .catch((error) => {
              debugger;
              console.log(error);
            });
        }
      );
    } catch (err) {
      debugger;
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
        <p>Do you have a account ? Login</p>
        {error && <span>Something is wrong!!</span>}
      </div>
    </div>
  );
}
