import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children, roles }) => {
  const navigate = useNavigate();
  const { token, users } = useSelector((state) => state.auth);

  if (!token) {
    navigate('/login');
    return null;
  }

  if (token && users && roles.length > 0) {
    const isCanAccess = roles.includes(users?.role);
    if (!isCanAccess) {
      navigate('/');
      return null;
    }
  }

  return children;
};

export default Protected;
