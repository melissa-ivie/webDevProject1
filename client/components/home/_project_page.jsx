import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <Header text="Project Page"></Header>
      <div className='pageBody'>
        <Button type="button" onClick={goToDashboard}>
            Go To Project Dashboard
        </Button>
      </div>
    </div>
    
  );
};
