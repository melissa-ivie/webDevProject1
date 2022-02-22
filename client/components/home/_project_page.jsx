import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';
import { Task } from '../common/task';

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  var incompleteProjectTasks = [];
  var completeProjectTasks = [];
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [project, setProjects] = useState(null);
  const [user, setUser] = useState(null);
  const projectID = parseInt(sessionStorage.getItem("projectID"));
  const projectName = sessionStorage.getItem("selectedProject");

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //get tasks
  useEffect(async () => {
    const res = await api.get('/tasks');
    setTasks(res.tasks);
  }, []);

  //get project for leaderID
  // useEffect(async () => {
  //   const res = await api.get('/pro');
  //   setTasks(res.tasks);
  // }, []);

  const navigate = useNavigate();

  const goToDashboard = () => {
    sessionStorage.setItem("projectID", "-1");
    sessionStorage.setItem("selectedProject", "None");
    navigate('/');
  };

//navigate to new task
  const goToNewTaskPage = () =>{
    navigate('/newTask')
  }


  //Creates list of all tasks for the project
  const getTasks = () => {
    incompleteProjectTasks = [];
    completeProjectTasks = [];
    let itasksObj = {};
    let ctasksObj = {};
    for(const task in tasks){
      let currentTask = tasks[task];
      let taskID = currentTask.id;
      if((currentTask.projectID == projectID)){
        if(currentTask.status){
          ctasksObj[taskID] = currentTask;
        }else{
          itasksObj[taskID] = currentTask;
        }
      }
    }
    incompleteProjectTasks = Object.assign(incompleteProjectTasks,itasksObj)
    completeProjectTasks = Object.assign(completeProjectTasks,ctasksObj)
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <Header text="Project Page"></Header>
      <div className='pageBody'>
        <h3 className='projectTitle'>Tasks for Project {projectName}</h3>
        <div className='taskList'>{getTasks()}
          <div className='incompleteTask'> <h5 className='taskCategory'>Incomplete Tasks:</h5>
              {incompleteProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status}projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
          <div className='completeTask'>  <h5 className='taskCategory'>Completed Tasks:</h5>
              {completeProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
        
        </div>
        <Button type="button" onClick={goToNewTaskPage}>Add Task</Button>
        <Button type="button" onClick={goToDashboard}>
            Go To Project Dashboard
        </Button>
      </div>
    </div>
    
  );
};
