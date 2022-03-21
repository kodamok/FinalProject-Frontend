import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../providers/GeneralProvider';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserData, userData } = useContext(Context);
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
      // console.log(resJSON);
      // if (res.status === 201) {
      //   console.log('Ok');
      // } else {
      //   console.log('Nope');
      // }
    } catch (error: any) {
      console.log('Something wrong with sending message', error);
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
