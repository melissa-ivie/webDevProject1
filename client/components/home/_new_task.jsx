import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const NewTask = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('false');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //if (loading) {
    //return <div>Loading...</div>;
  //}

  const newTask = async () => {
    if (title === '') {
      setErrorMessage('Task Title cannot be blank');
      return;
    } else if (description === '') {
      setErrorMessage('Task Description cannot be blank');
      return;
    } else if (time === '') {
      setErrorMessage('Task ETA cannot be blank');
      return;
    }

    fetch('/task', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        assignedUser,
        time,
        status,
      }),
    });
    navigate('/projectPage');
  };

  const cancelAdd = async () => {
    navigate('/projectPage');
  };

  return (
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Task Title</div>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>Task Description</div>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div>Assigned user to task (enter email)</div>
          <Input type="text" value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} />
          <div>Task ETA</div>
          <Input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
          <div>Mark as complete?</div>
          <select name="completed" id="completed" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          {/* <Input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /> */}
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
