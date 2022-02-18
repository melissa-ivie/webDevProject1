import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const Home = () => {
  const api = useContext(ApiContext);
  var userProjects = [];
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);
  useEffect(async () => {
    const res = await api.get('/projects');
    setProjects(res.projects);
  }, []);
  const navigate = useNavigate();

  const goToProjectPage = () => {
    navigate('/projectPage');
  };

  const goToNewProjectPage = () => {
    navigate('/newProjectPage');
  };
  
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
    userProjects = Object.assign(userProjects,projectsObj)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <Header text="Project Dashboard"></Header>
      <div className='pageBody'>
        <h3>Projects:</h3>
        <div className='projectList'> {getProjects(user.email, user.id)}
          {userProjects.map((pro) => {
            return <h4><Button type="button" onClick={goToProjectPage}>{pro}</Button></h4>
          })}
        </div>
        <Button type="button" onClick={goToNewProjectPage}>
          Add New Project
       </Button>
      </div>
    </div>
    
  );
};
