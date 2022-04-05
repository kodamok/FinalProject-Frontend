import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../providers/GeneralProvider';
import useError from './useError';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserData, userData } = useContext(Context);
  const { handleError } = useError();
  // const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const sendMessage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/stopServer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      await res.json();
    } catch (error: any) {
      handleError();
    }
  };

  const handleLogout = async () => {
    sendMessage();

    setUserData({
      userId: '',
      token: '',
      name: '',
      exp: '',
      role: '',
      email: '',
      identityCardNumber: '',
      taxNumber: '',
      avatar: ''
    });
    navigate('/');
  };

  return {
    handleLogout
  };
};
