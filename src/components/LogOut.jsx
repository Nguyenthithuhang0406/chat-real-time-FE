/* eslint-disable */
import React from 'react'
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
   </Button>
  )
}

export default LogOut;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #9a8;
  cursor: pointer;

  svg{
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`
