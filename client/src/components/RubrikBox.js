import React from 'react'
import { Navigate, Route } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useAPI } from '../contexts/APIContext';

function RubrikBox({ name , description, children }) {

  const auth = useAuth();
  const api = useAPI();

  return (
    <div className='rubrik'>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default RubrikBox;