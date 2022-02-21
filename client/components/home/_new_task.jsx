import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from "../../utils/api_context";
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const NewTask = () => {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    
    const newTask = async () => {
        if (title === ''){
            setErrorMessage('Task needs a title');
            return;
        }

    }

    const cancelAdd = async () => {
        navigate('/');
      };

    return (
        <div className="flex flex-row justify-center m-4">
            <div className="w-96">
            <Paper>
                <div>Task Title</div>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div>Emails of Project Members (seperate with commas)</div>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="flex flex-row justify-end mt-2">
                <Button type="button" onClick={newTask}>
                    Add New Task
                </Button>
                <Button type="button" onClick={cancelAdd}>
                    Cancel
                </Button>
                </div>
                <div className="flex">{errorMessage}</div>
            </Paper>
            </div>
        </div>
    );
};