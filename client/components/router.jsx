import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './home/_home';
import { AuthContext } from '../utils/auth_context';
import { SignIn } from './sign_in/_sign_in';
import { SignUp } from './sign_up/_sign_up';
import { Admin } from './admin/_admin';
import { ProjectPage } from './home/_project_page';
import { NewProject } from './home/_new_project';
import { NewTask } from './home/_new_task';
export const Router = () => {
  const [authToken] = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={authToken ? <Home /> : <Navigate replace to="signin" />} // no token means not logged in
      />
      <Route path="admin" element={<Admin />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="projectPage" element={<ProjectPage />} />
      <Route path="newProjectPage" element={<NewProject />} />
      <Route path="newTask" element={<NewTask/>}/>
    </Routes>
  );
};
