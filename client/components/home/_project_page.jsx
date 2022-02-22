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
  const [user, setUser] = useState(null);
  const projectID = parseInt(sessionStorage.getItem("projectID"));
  const projectName = sessionStorage.getItem("selectedProject");
  const projectRefresh = sessionStorage.getItem("refreshProject");

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //get tasks
  useEffect(async () => {
    console.log("inside use effect for tasks");
    const res = await api.get('/tasks');
    setTasks(res.tasks);
  }, []);
  const navigate = useNavigate();

  const goToDashboard = () => {
    sessionStorage.setItem("projectID", "-1");
    sessionStorage.setItem("selectedProject", "None");
    navigate('/');
  };

  // Should this be '/project/:id/new_task',
  // or just '/new_task'?
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
        <h3>Tasks for Project {projectName}</h3>
        <div className='taskList'>{getTasks()}
          <div className='incompleteTask'> Incomplete Tasks:
              {incompleteProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status}></Task>
                })}
          </div>
          <div className='completeTask'> Complete Tasks:
              {completeProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID}></Task>
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
