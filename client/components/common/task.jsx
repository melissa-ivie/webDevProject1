import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';


export const Task = (props) => {
    const navigate = useNavigate(); 
    var id = props.id;
    var status = props.status;
    var changeTaskStatus = async () => {
        sessionStorage.setItem("refreshProject", "T")
        console.log(id);
        if(status == false){
            console.log("inside if");
            status = true; 
        }
        fetch('/updateTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                status:true, 
            })
        })
    };

    if(status == false){
        return (
            <div className="task">
                <h5>{props.title}</h5>
                <p>Description: {props.description}</p>
                <p>Estimated Time: {props.time}</p>
                {/* <p>Status:{props.status}</p>  */}
                {/* <h5>{props.user}</h5> */}
                <Button type="button" onClick={changeTaskStatus}>
                  Mark Task as Complete
                </Button>
            </div>
        );

    }else{
        return (
            <div className="task">
                <h5>{props.title}</h5>
                <p>Description: {props.description}</p>
                <p>Estimated Time: {props.time}</p>
            </div>
        );

    }
    
  };