import React from 'react'

const Input = () => {
  return (
    <div className="inputs">
      <input type="text" placeholder="Type something" />
      <div className="send">
        <img src="/images/img.png" alt="" />
        <input type="file" className='file' id="file" />
        <label htmlFor="file">
          <img src="/images/attach.png" alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input