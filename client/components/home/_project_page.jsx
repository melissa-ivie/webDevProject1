import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  var projectTasks = [];
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [projectID, setProjectID] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //get projectID
  useEffect(async () => {
    const res = await api.get('/projectID');
    setProjectID(res.projectID);
  }, []);
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/');
  };

  // Should this be '/project/:id/new_task',
  // or just '/new_task'?
  const goToNewTaskPage = () =>{
    navigate('/newTask')
  }

  //Need to get the project id
  //id keeps returning null.
  const getTasks = (projectID) => {
    let tasksObj = {};
    for(const task in tasks){
      let currentTask = tasks[task];
      let taskID = currentTask.id;
      tasksObj[taskID] = currentTask.title;
      if((projectID != null)){
        projectTasks = Object.assign(projectTasks, tasksObj)
      }
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <Header text="Project Page"></Header>
      <div className='pageBody'>
        <h3>Tasks:</h3>
        <div className='taskList'> {getTasks(projectID)}
        </div>
        <Button type="button" onClick={goToNewTaskPage}>Add Task</Button>
        <Button type="button" onClick={goToDashboard}>
            Go To Project Dashboard
        </Button>
      </div>
    </div>
    
  );
};
