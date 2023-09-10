import React from "react"

export default function Register() {
    return(
        <div className="form-container">
            <div className="form-wrapper">
                <span className="logo">Chat</span>
                <span className="title">Register</span>
                <form>
                    <input type="text" name="" id="" placeholder="Enter your name" />
                    <input type="email" name="" id="" placeholder="Enter your email" />
                    <input type="password" name="" id="" placeholder="Enter your password" />
                    <input className="file-hidden" type="file" name="file" id="file" />
                    <label htmlFor="file">
                        <img src="/images/addAvatar.png" alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                </form>
                <p>Do you have a account ? Login</p>
            </div>
        </div>
    )
}