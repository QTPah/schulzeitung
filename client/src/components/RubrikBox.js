import React from 'react'
import { Navigate, Route } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useAPI } from '../contexts/APIContext';
import { useNavigate } from 'react-router-dom'

function RubrikBox({ name , description, children }) {

  const auth = useAuth();
  const api = useAPI();
  const navigate = useNavigate();

  return (
    <div className='rubrik' onClick={() => navigate(`/rubriken/${name.toLowerCase()}`)}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default RubrikBox;