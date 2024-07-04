/* eslint-disable */
import EmojiPicker from 'emoji-picker-react';
import React, { useRef, useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const inputRef = useRef();
  const handleEmojiClick = (event, emojiObject) => {
    const emoji = event.emoji;
    const { selectionStart, selectionEnd } = inputRef.current;//lay vi tri con tro
    const start = msg.substring(0, selectionStart);//phan dau cua chuoi truoc con tro
    const end = msg.substring(selectionEnd, msg.length);//phan cuoi cua chuoi sau con tro
    const updateMsg = start + emoji + end;
    setMsg(updateMsg);
    inputRef.current.focus();
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.trim() === '') return;
    handleSendMsg(msg);
    setMsg('');
  }
  return (
    <Container>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmile onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick}  className='emoji-picker-react' />
            )
          }
        </div>
      </div>
      <form className='input-container' onSubmit={(e) => sendChat(e)}>
        <input type='text' ref={inputRef} placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)}/>
        <button type='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

export default ChatInput;

const Container = styled.div`
display: grid;
grid-template-columns: 50% 50%;
align-items: center;
background-color: #0804;
padding: 0 2rem;
padding-bottom: 0.3rem;

@media screen and (min-width: 768px) and (max-width: 1024px){
      padding: 0 1rem;
      gap: 1rem;
}
.button-container{
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji{
    position: relative;
    svg{
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }

    .emoji-picker-react{
      position: absolute;
      top: -480px;
      left: 30px;
      ${'' /* background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9186f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        } */}

      ${'' /* .emoji-categories {
          button {
            filter: contrast(0);
          }

      .emoji-search{
        background-color: transparent;
        border-color: #9186f3;
      }

      .emoji-group:before{
        background-color: #080420;
      } */}
    }
  }
}
.input-container{
  width: 100%;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input{
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;

    &::selection{
      background-color: #9a86f3;
    }
    &:focus{
      outline: none;
    }
  }
  button{
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9a86f3;
    border: none;
    @media screen and (min-width: 768px) and (max-width: 1024px){
      padding: 0.3rem 1rem;
      svg{
        font-size: 1rem;
      }
    }
    svg{
      font-size: 2rem;
      color: white;
    }
  }
}
`