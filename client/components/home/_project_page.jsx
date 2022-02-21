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
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/');
  };

  // Should this be '/project/:id/new_task',
  // or just '/new_task'?
  const goToNewTaskPage = () =>{
    navigate('/new_task')
  }

  // not sure if we need to get the project id, 
  //but this is copied and pasted from _home.jsx
  const getProjects = (email, id) => {
    let projectsObj = {};
    for(const proj in projects){
      let currentProject = projects[proj]
      let emails = currentProject.userEmails;
      let prID = currentProject.id; 
      if((Object.values(emails).indexOf(email) > -1) || (currentProject.projectLeaderID == id)){
        projectsObj[prID] = currentProject.title;
      }
    }
  };
  
  //Need to get the project id
  //id keeps returning null.
  const getTasks = (id) => {
    let tasksObj = {};
    currentProjectID = getProjects;
    for(const task in tasks){
      let currentTask = tasks[task];
      let taskID = currentTask.id;
      tasksObj[taskID] = currentTask.title;
      if((project.id == id)){
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
        {/* {getTasks(project.id) */}
        <div className='taskList'>
        </div>
        <Button type="button" onClick={goToNewTaskPage}>Add Task</Button>
        <Button type="button" onClick={goToDashboard}>
            Go To Project Dashboard
        </Button>
      </div>
    </div>
    
  );
};
