/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import LogOut from './LogOut';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
      getMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-message', {
      to: currentChat._id,
      msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });

    setMessages(msgs);
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    };
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <>
      {
        currentChat && (
          <Container>
            <div className='chat-header'>
              <div className='user-details'>
                <div className='avatar'>
                  <img src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`} alt='avatar' />
                </div>
                <div className='username'>
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
              <LogOut />
            </div>
            <div className='chat-messages'>
              {
                 messages.map((msg) => {
                  return (<div ref={scrollRef} key={uuidv4()} className='chat'>
                    <div
                      className={`messages ${msg.fromSelf ? 'sent' : 'received'}`}
                    >
                      <div className='content'>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  </div>
                  )
                })
              }
            </div>

            <ChatInput handleSendMsg={handleSendMsg} />
          </Container>
        )
      }
    </>
  )
}

export default ChatContainer;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
   @media screen and (max-width: 768px) and (max-width: 1024px){
      grid-auto-rows: 15% 70% 15%;
    }
  .chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details{
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar{
        img{
          height: 3rem;
        }
      }

      .username{
        h3{
          color: white;
        }
      }
    }
  }

  .chat-messages{
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    
    .chat{
      width: 100%;
      .messages{
        width: 100%;
        display: flex;
        align-items: center;
        .content{
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          p{
            color: #d1d1d1;
          }
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            max-width: 70%;
          }
        }
    }

    .sent{
      justify-content: flex-end;
      .content{
        background-color: #4f04ff21;
      }
    }

  .received{
    justify-content: flex-start;
    .content{
      background-color: #9900ff20 ;
    }
  }
    }

  }
`
