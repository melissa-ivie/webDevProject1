import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';


export const Task = (props) => {
    const navigate = useNavigate();   
    return (
        <div className="task">
            <h5>{props.title}</h5>
            <p>Description: {props.description}</p>
            <p>Estimated Time: {props.time}</p>
            {/* <p>Status:{props.status}</p>  */}
            {/* <h5>{props.user}</h5> */}
        </div>
    );

    
  };