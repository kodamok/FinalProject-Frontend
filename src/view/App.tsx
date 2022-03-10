import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as queryString from 'query-string';
import HomePage from '../components/templates/HomePage/HomePage';
import Services from '../components/templates/Services/Services';
import SignUp from '../components/templates/SignUp/SignUp';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { theme } from '../assets/styles/theme';
import MainContainerApp from '../components/templates/MainContainer/MainContainer';
import AboutUs from '../components/templates/AboutUs/AboutUs';
import Contact from '../components/templates/Contact/Contact';
import LogIn from '../components/templates/Login/LogIn';
import AdminDashboard from '../components/templates/Admin_Dashboard/Admin_Dashboard';
import UserDashboard from '../components/templates/User_Dashboard/UserDashboard';
import { Context } from '../providers/GeneralProvider';
import ClientsOrProjects from '../components/templates/Admin_ClientsOrProjects/ClientsOrProjects';
import Settings from '../components/templates/Settings/Settings';
import NewClient from '../components/templates/Admin_NewClient/NewClient';
import Projects from '../components/templates/User_Projects/Projects';
import VerifyEmail from '../components/molecules/VerifyEmail/VerifyEmail';
import ForgotPassword from '../components/molecules/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/molecules/ResetPassword/ResetPassword';
import Statistics from '../components/templates/Admin_Statistics/Statistics';
import ClientDetail from '../components/organisms/ClientDetail/ClientDetails';
import ProjectDetail from '../components/organisms/ProjectDetail/ProjectDetails';
import Messages from '../components/templates/Messages/Messages';
import NewProject from '../components/templates/Admin_NewProject/NewProject';
import Impressum from '../components/templates/Impressum/Impressum';
import { useAuth } from '../hooks/useAuth';
import useError from '../hooks/useError';

function App(): JSX.Element {
  const { userData, setMessages, setUserData } = useContext(Context);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { token, role } = userData;
  const { handleError } = useError();
  useEffect(() => {
    let interval: any;
    if (userData.token) {
      // When entering the website, check whether the token's time has expired
      if (Date.now() > userData.exp) {
        handleLogout();
      }
      // If token exist check whether the token is close to expiration ( < 30s )
      if (userData.token) {
        interval = setInterval(() => {
          // If yes then Display Message About It
          if (+userData.exp - Date.now() < 30000) {
            handleError('For Your Safety We Will Logout You in a 30 seconds :)');
          }
          // If Token expired Clear UserData and Logout User/Admin
          if (Date.now() > userData.exp) {
            handleLogout();
            handleError('We Logged Out You For Your Security :)');
            clearInterval(interval);
          }
          // console.log('Left', ((userData.exp - Date.now()) / 1000).toFixed(0), 's To Logout');
        }, 5000);
      } else {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.exp]);

  const [listening, setListening] = useState(false);

  useEffect(() => {
    const connectSSE = async () => {
      if (token) {
        if (!listening) {
          // console.log('I try listening SSE...');
          const events = new EventSource(`${process.env.REACT_APP_BACKEND}/events/${token}`);

          events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            // console.log('Parsed', parsedData);
            // console.log(parsedData.text);
            if (parsedData.text === 'stopSSEEventsNow') {
              events.close();
              console.log('I closed the connection Here');
            }
            setMessages((messagesItems) => messagesItems.concat(parsedData));
          };

          events.onerror = (e) => {
            console.log('SSE ERROR', e);
          };

          events.onopen = () => {
            console.log('Connection works ...');
          };

          setListening(true);
        }
      } else {
        setMessages([]);
        setListening(false);
      }
    };
    connectSSE();
  }, [listening, token]);

  const handleGoogleLogin = async (code: any) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/googleLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Authorization: 'Bearer ' + userData?.token, // IN FUTURE TO AUTHORIZATION
        },
        body: JSON.stringify({ code })
      });
      const resJSON = await res.json();
      if (res.status === 200) {
        setUserData(resJSON);
        navigate('/');
        handleError('You are correctly logged in', true);
      } else {
        handleError(resJSON.message, res.status === 200);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    }
  };

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);

    // Finded another solution? TODO - check this, maybe better avoid installing a library
    // const urlParams = new URLSearchParams(window.location.search);
    // const clientCode = urlParams.get('code');

    if (urlParams.error) {
      const { error }: any = urlParams;
      console.log(`An error occurred: ${error}`);
      handleError('Something went wrong with Google Login, try later again');
    }
    if (urlParams.code) {
      console.log(`The code is: ${urlParams.code}`);
      handleGoogleLogin(urlParams.code);
    }
  }, [window.location.search]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainerApp>
        {token && role === 'Freelancer' ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/clients" element={<ClientsOrProjects />} />
            <Route path="/client/:clientId" element={<ClientDetail />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/newClient" element={<NewClient />} />
            <Route path="/newProject/:clientId" element={<NewProject />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        ) : token && role === 'Client' ? (
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/freelancer/:freelancerId" element={<ClientDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
            <Route path="/forgotPassword/" element={<ForgotPassword />} />
            <Route path="/forgotPassword/:token" element={<ResetPassword />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        )}
      </MainContainerApp>
    </ThemeProvider>
  );
}

export default App;
