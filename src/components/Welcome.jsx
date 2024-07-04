/* eslint-disable */
import React from 'react'
import styled from 'styled-components';

import welcome from '../assets/welcome.gif';
const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={welcome} alt='robot'/>
      <h1>Welcome, <span>{currentUser.username} !</span> </h1>
      <h3>Please select a chat to start messaging!!</h3>
    </Container>
  )
}

export default Welcome;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;

  img{
    width: 100%;
    height: 20rem;
  }

  span{
    color: #4e00ff;
  }
`