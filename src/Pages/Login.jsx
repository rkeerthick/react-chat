import React from "react"

export default function Login() {
    return(
        <div className="form-container">
            <div className="form-wrapper">
                <span className="logo">Chat</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" name="" id="" placeholder="Enter your email" />
                    <input type="password" name="" id="" placeholder="Enter your password" />
                    <input className="file-hidden" type="file" name="file" id="file" />
                    
                    <button>Sign In</button>
                </form>
                <p>Don't have an account? Register</p>
            </div>
        </div>
    )
}