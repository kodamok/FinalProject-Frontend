import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BsFilterCircleFill } from 'react-icons/bs';
import { Context } from '../../../providers/GeneralProvider';
import useError from '../../../hooks/useError';
import NoItemsFound from '../../atoms/NoItemsFound/NoItemsFound';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import CardProfile from '../../molecules/CardProfile/CardProfile';
import PageHead from '../../molecules/PageHead/PageHead';
import InputWithLabel from '../../atoms/InputWithLabel/InputWithLabel';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
// import useMediaQuery from '../../../hooks/useMediaQuery';

const ContainerFilterBy = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 0 1rem;
  /* border-top: 1px solid black;
  border-bottom: 1px solid black; */
  > div:first-child {
    display: flex;
    align-items: center;
  }

  .filter {
    position: relative;
    display: flex;
    align-items: center;
  }

  .mobileFilter {
    display: flex;
    position: absolute;
    top: 20px;
    left: 20px;
    flex-direction: column;
    justify-content: flex-start;
    background: ${({ theme }) => theme.color.main2};
    border: 2px solid #e76f51;
    border-radius: 10px 0 0 0;
    color: white;
    z-index: 500;
    > p {
      padding: 0.5rem;
    }
  }

  ${({ theme }) => theme.up(theme.breakpoint.sm)} {
    padding: 0 2rem;
  }

  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    padding: 0;
  }
`;

const ContainerClients = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 1600px;
  margin: 1.2rem auto 1.2rem auto;
  border-radius: 1rem;
`;

// const ContainerClients = styled.div`
//   padding: 0.3rem;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 1rem;
//   width: 100%;
//   max-width: 1600px;
//   margin: 1.2rem auto 1.2rem auto;
//   border-radius: 1rem;
//   ${({ theme }) => theme.down(theme.breakpoint.sm)} {
//     grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
//     justify-content: center;
//   }
// `;
const ContainerProjects = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 1600px;
  margin: 1.2rem auto 1.2rem auto;
  border-radius: 1rem;
`;

const Wrap = styled.div`
  /* border: 2px solid red; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

/* const MobileFilterContent = styled.div<props>`
  position: absolute;
  top: 25px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #eae2b7;
  border: 1px solid #e76f51;
  border-radius: 10px 0 0 0;
  z-index: 500;
`; */

function ClientsOrProjects() {
  const navigate = useNavigate();
  const [choiceRadio, setChoiceRadio] = useState('projects');
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const { userData } = useContext(Context);
  const { handleError } = useError();

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/freelancer`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      if (res.status === 200) {
        setClients(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      handleError();
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/project`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();

      if (res.status === 200) {
        setProjects(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      handleError();
    }
  };

  useEffect(() => {
    (async () => {
      await fetchClients();
      await fetchProjects();
      setIsLoading(false);
    })();
  }, []);

  // Handling value when you click on choice
  const handleChangeRadio = (e: any) => {
    setChoiceRadio(e.target.value);
  };
  const handleNavigateToCreateNewClient = () => {
    navigate('/newClient');
  };

  const pageHeadInfo = [
    {
      id: 1,
      titleOfPage: 'Clients & Projects',
      threeDotButton: {
        button1: 'New Client',
        onClickEvent: handleNavigateToCreateNewClient
      }
    }
  ];

  // SHOW/HIDE FILTER RADIO BUTTONS ACCORDING TO MEDIA QUERIES IN CSS

  const [mobileFilter, setMobileFilter] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const ref: any = useRef(null);
  useOnClickOutside(ref, () => setMobileFilter(false));

  const handleOpenFilter = (e: any) => {
    e.stopPropagation();
    setMobileFilter((prev) => !prev);
  };

  // OBSERVE WINDOW WIDTH

  useEffect(() => {
    const updateWindowWidth = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    if (windowWidth < 720) {
      setMobileFilter(false);
    }

    if (windowWidth > 720) {
      setMobileFilter(true);
    }
    window.addEventListener('resize', updateWindowWidth);
  }, [windowWidth]);

  // IF WE USE USEMEDIAQUERY HOOK THERE IS A GLITCH WHEN RESIZING
  /*  const queryMobileVersion = useMediaQuery('(max-width: 720px)');  */
  /*  useEffect(() => {
    if (queryMobileVersion === true) {
      setMobileFilter(false);
    }

    if (queryMobileVersion === false) {
      setMobileFilter(true);
    }
  }, [queryMobileVersion]); */

  if (isLoading) return <LoadingSpin />;
  return (
    <Wrap>
      <PageHead pageHeadInfo={pageHeadInfo}>
        <ContainerFilterBy>
          {windowWidth < 720 ? (
            <div onClick={handleOpenFilter}>
              <BsFilterCircleFill fontSize={25} />
            </div>
          ) : null}

          {mobileFilter && (
            <div
              className={windowWidth < 720 ? 'mobileFilter' : 'mobile'}
              ref={windowWidth < 720 ? ref : null}
            >
              <p>Filter by:</p>
              <InputWithLabel
                type="radio"
                label="Projects:"
                name="chooseType"
                onChange={handleChangeRadio}
                value="projects"
                id="projects"
                checked={choiceRadio === 'projects'}
              />
              <InputWithLabel
                type="radio"
                label="Clients:"
                name="chooseType"
                value="clients"
                id="clients"
                onChange={handleChangeRadio}
                checked={choiceRadio === 'clients'}
              />
            </div>
          )}
        </ContainerFilterBy>
      </PageHead>
      {choiceRadio === 'projects' ? (
        <ContainerProjects>
          {projects.length ? (
            projects.map((item: any) => (
              <CardProfile key={item._id} projectData={item} clientData={clients} />
            ))
          ) : (
            <NoItemsFound text="Projects" />
          )}
        </ContainerProjects>
      ) : (
        <ContainerClients>
          {clients.length ? (
            clients.map((item: any) => (
              <CardProfile client key={item._id} clientData={item} projectData={projects} />
            ))
          ) : (
            <NoItemsFound text="Clients" />
          )}
        </ContainerClients>
      )}
    </Wrap>
  );
}

export default ClientsOrProjects;
