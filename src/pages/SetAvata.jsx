/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Buffer } from 'buffer';

import loading from '../assets/loading.gif';
import { setAvataRoute } from '../utils/APIRoutes';
const SetAvata = () => {
  const api = `https://api.multiavatar.com`;

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined) {
      toast.error('Please select an avatar!', toastOption);
    } else {
      const user = await JSON.parse(localStorage.getItem('user'));
      const { data } = await axios.post(`${setAvataRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error("Error setting avatar", toastOption);
      }
    }
  };
  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await new Promise((resolve, reject) => {
            setTimeout(async () => {
              const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
              resolve(response);
            }, i * 2000);
          });
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString('base64'));
        } catch (error) {
          console.error(error);
        }
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Container>
          <img src={loading} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>pick an avatar as your profile picture</h1>
          </div>
          <div className='avatars'>
            {
              avatars.map((avatar, index) => {
                return (<div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} key={index}>
                  <img src={`data:image/svg+xml;base64, ${avatar}`} alt='avatar' onClick={() => setSelectedAvatar(index)} />
                </div>
                )
              })
            }
          </div>
          <button onClick={setProfilePicture} className='submit-btn'>Set Profile Picture</button>
        </Container>
      )}
    </>
  )
}

export default SetAvata;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  weight: 100vw;

  .loader{
    max-inline-size: 100%;
  }

  .title-container{
    h1{
      color: white;
    }
  }

  .avatars{
    display: flex;
    gap: 2rem;

    .avatar{
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img{
        height: 6rem;
      }
    }

    .selected{
      border: 0.4rem solid #4e0eff;
    }
    }

    .submit-btn{
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s element-in-out;
      &:hover{
        background-color: #4e0eff;
      }
  }

`
