import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const Home = () => {
  const api = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  const goToProjectPage = () => {
    navigate('/projectPage');
  };

  const goToNewProjectPage = () => {
    navigate('/newProjectPage');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <Header text="Project Dashboard"></Header>
      <div className='pageBody'>
        <h3>Projects:</h3>
        <Button type="button" onClick={goToProjectPage}>
          Go To Project Page
        </Button>
        <Button type="button" onClick={goToNewProjectPage}>
          Add New Project
       </Button>
      </div>
    </div>
    
  );
};
