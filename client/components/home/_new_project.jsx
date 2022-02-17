import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const NewProject = () => {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [userEmails, setUsers] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(async () => {
        const res = await api.get('/users/me');
        setUser(res.user);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    

    const newProject = async () => {
        if (title === '') {
        setErrorMessage('Project Title cannot be blank');
        return;
        }

        const projectLeaderID = user.id;
        const leaderEmail = user.email;
        var users = userEmails.split(',')
        //user.push(leaderEmail);
      
        fetch('/project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                projectLeaderID,
                users, 
            })
        })
        navigate('/#');
    };

  return (
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Project Title</div>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>Emails of Project Members (seperate with commas)</div>
          <Input type="text" value={userEmails} onChange={(e) => setUsers(e.target.value)} />
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={newProject}>
              Add New Project
            </Button>
          </div>
          <div className="flex">{errorMessage}</div>
        </Paper>
      </div>
    </div>
  );
};
