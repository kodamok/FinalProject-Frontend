import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { MdFullscreen } from 'react-icons/md';
import { BsImage } from 'react-icons/bs';
import { AiOutlineFileText } from 'react-icons/ai';
import { Context } from '../../../providers/GeneralProvider';
import CardDetails from '../../molecules/CardDetails/CardDetails';
import useError from '../../../hooks/useError';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Button from '../../atoms/Button/Button';
import FileUploader from '../../molecules/FileUploader/FileUploader';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';
import GeneratePdf from '../../molecules/GeneratePdf/GeneratePdf';
import PageHead from '../../molecules/PageHead/PageHead';
import {
  AOpen,
  ContainerIframesFiles,
  ContainerPreviewImg,
  ContainerUploadedFiles,
  ContainerUploadedImages
} from '../EditProject/EditProject';

// /project/:projectId
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    padding: 0.4rem;
  }
`;
// Style Mobil Version
const ContainerDetails = styled.div`
  ${({ theme }) => theme.down(theme.breakpoint.m)} {
    width: 50%;
  }
  ${({ theme }) => theme.down(theme.breakpoint.sm)} {
    width: 100%;
  }
  width: 100%;
  margin: 0 auto;
`;

// const ServicesInvoice = styled.div`
//   display: flex;
//   position: relative;
//   flex-direction: column;
//   align-items: center;
//   }
//
// `;
// const ServicesButton = styled.button`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   border: 1px solid black;
//   margin-bottom: 0.3rem;
//   //border: none;
//   padding: 0.5rem 0.6rem;
//   border-radius: 0.6rem;
//   background: ${({ theme }) => theme.color.main5};
//   max-width: 150px;
//   transition: 0.3s;
//   font-weight: 600;
//   color: ${({ theme }) => theme.color.main1};
//   font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
//   &:hover {
//     cursor: pointer;
//     transform: scale(1.05);
//     background: ${({ theme }) => theme.color.main9};
//     color: ${({ theme }) => theme.color.main8};
//   }
// `;
// const PricesInvoice = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//     }
//
// `;
// const LabelTotal = styled.label`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: auto;
//   font-weight: bold;
//   margin-bottom: 1rem;
//   //border: 10px solid chocolate;
// `;

// Style Modal
// const ModalBackground = styled.div`
//   width: 77vw;
//   max-width: 350px;
//   height: 30vh;
//   background-color: ${({ theme }) => theme.color.main8};
//   position: absolute;
//   left: -3rem;
//   display: flex;
//   //border: 10px solid pink;
// `;
// const ModalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 90vw;
//   max-width:350px;
//   max-height: 70vh;
//   border-radius: 0.6rem;
//   overflow-y: scroll;
//   background-color: ${({ theme }) => theme.color.main1};
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   padding: 25px;
//   //scrollbar-color: Is in the GlobalStyle.ts
//
// }
// div {
//   display:flex;
//   justify-content: flex-end;
// }
//
// `;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  > p:first-child {
    font-weight: 500;
  }
  > p:nth-child(2) {
    font-weight: 400;
  }
`;
// Style Modal Desktop
const ModalBackgroundDesktop = styled.div`
  min-width: 200px;
  max-width: 550px;
  min-height: 50px;
  //border: 10px solid red;
  background-color: ${({ theme }) => theme.color.main8};
  position: absolute;
  display: flex;
  justify-content: center;
  align-item: center;
  border-radius: 0.6rem;
  z-index: 3;
`;
const ModalContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 550px;
  min-height: 50px;
  border-radius: 0.6rem;
  overflow: auto;
  background-color: ${({ theme }) => theme.color.main1};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 25px;
}
> div:first-child {
  position: absolute;
  top: 0;
  right: 8px;
}
`;

// Style Desktop Version
const ContainerDesktop = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 0;
  //border: 10px solid yellow;
`;
const ContainerDetailsDesktop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  //background: ${({ theme }) => theme.color.main2};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 0.6rem;
  //border: 10px solid green;
`;
const ProjectInvoicesFilesDesktop = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  //background: ${({ theme }) => theme.color.main2};
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  //border: 16px solid ${({ theme }) => theme.color.main2};
  padding: 1rem;
  border-radius: 0.6rem;
  h5 {
    margin: 0 !important;
  }
  
  //border: 10px solid red;
}
h6 {
margin:0;
}
`;

const ContainerButtonAndFiles = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: 1440px;
  //background: ${({ theme }) => theme.color.main7};
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 0.6rem;
  //border: 16px solid ${({ theme }) => theme.color.main2};
`;

const InvoiceDesktop = styled.div`
  display: flex;
  position: relative;
  gap: 15px;
  //border: 10px solid purple;
`;
// const ServicesInvoiceDesktop = styled.div`
//   display: flex;
//   flex-direction: column;
//   }
// `;
// const ShortDescriptionDesktop = styled.div`
//   display: flex;
//   flex-direction: column;
//   p {
//     width: 500px;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     margin-bottom: 0.3rem;
//     padding: 0.25rem 0;
//     border: 1px solid transparent;
//     font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
//     ${({ theme }) => theme.down(theme.breakpoint.l)} {
//       width: 400px;
//     }
//     ${({ theme }) => theme.down('1300px')} {
//       width: 300px;
//     }
//   }
// `;
//
// const PricesInvoiceDesktop = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex:10 5 10px;
//   p {
//     margin-bottom:0.3rem;
//     padding: 0.25rem 0;
//     border: 1px solid transparent;
//     font-size: ${({ theme }) => theme.fontSizeOpenSans.ms};
//   }
// }
// `;
const Total = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //border: 10px solid black;
  padding: 1rem;
  gap: 2rem;
`;
const Files = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  //border: 10px solid black;
`;
const TotalNumber = styled.p`
  position: relative;
  margin: auto;
`;
const LabelTotalDesktop = styled.label`
  font-weight: bold;
`;
const Line = styled.div`
  border: 0.2px solid black;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 15px;
`;
const FirstContainer = styled.div`
  margin: 0 auto;
  padding-top: 2rem;
  h4 {
    margin: 1rem;
  }
  h5 {
    margin: 1rem;
  }
`;
// const H5 = styled.h5`
//   text-decoration: underline;
// `;

const WholeContainer = styled.div`
  padding: 0 0 2rem 0;
`;

const ProjectInvoicesFiles = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const WrapperServices = styled.div`
  width: 100%;
  margin: 2rem 0;
  padding: 1.5rem 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 0.6rem;
  h4 {
    margin: 0 0 1rem 0;
  }
  > div {
    display: flex;
    gap: 1rem;
    justify-content: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);

    p:first-child,
    h4:first-child {
      flex-basis: 80%;
      min-width: 200px;
    }

    p:nth-child(2),
    h4:nth-child(2) {
      flex-basis: 20%;
      min-width: 80px;
    }
  }
`;

const WrapperServicesDesktop = styled.div`
  width: 100%;
  margin: 2rem 0;
  padding: 1.5rem 1rem;
  //box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  //background: ${({ theme }) => theme.color.main1};
  border-radius: 0.6rem;
  h4 {
    margin: 0 0 1rem 0;
  }
  > div {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);

    p:first-child,
    h4:first-child {
      flex-basis: 30%;
      min-width: 200px;
      ${({ theme }) => theme.down('1220px')} {
        max-width: 185px;
      }
    }

    p:nth-child(2),
    h4:nth-child(2) {
      flex-basis: 20%;
      min-width: 80px;
    }
    p:nth-child(3),
    h4:nth-child(3) {
      flex-basis: 50%;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      ${({ theme }) => theme.down('1320px')} {
        max-width: 200px;
      }
      ${({ theme }) => theme.down('1220px')} {
        max-width: 165px;
      }
    }
  }
`;

const ContainerTotal = styled.div`
  border-top: 2px solid black;
  font-weight: 600;
`;

const ContainerServiceAndPrice = styled.div`
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    text-shadow: 0px 0px 1px black;
    box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
    border-radius: 0.2rem;
  }
`;

const ContainerButtonAndGenerate = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 0.6rem;
`;

function ProjectDetail() {
  const navigate = useNavigate();
  const [project, setProject]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPreviews, setShowPreviews] = useState(false);
  const { userData, filesAreUploaded, setFilesAreUploaded } = useContext(Context);
  const { handleError } = useError();
  const { projectId } = useParams();

  const fetchProject = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/projectOne/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log('This is Fetch', res);
      console.log('This is resJson', resJSON);
      if (res.status === 200) {
        setProject(resJSON);
      } else {
        handleError();
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (filesAreUploaded) {
      fetchProject();
      setFilesAreUploaded(false);
    }
  }, [filesAreUploaded]);

  // Setting the description one by one
  const [serviceToModal, setServiceToModal]: any = useState({});
  const handleModalIndex = (index: number) => {
    setServiceToModal(project.services[index]);
    // And is combined with the the modal openModal state
    setOpenModal(true);
  };
  console.log('This is what DESCRIPTION print', serviceToModal);

  // useMediaQuery
  const desktopVersion = useMediaQuery('(min-width: 1060px)');
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const ref: any = useRef(null);
  // useOnClickOutside(ref, () => handleModal()); Come from this one but is enough
  // with (ref, handleModal) if we have declared this function before
  useOnClickOutside(ref, handleModal);

  const handleNavigateToClient = () => {
    if (userData.role === 'Freelancer') {
      navigate(`/client/${project.ownerUser}`);
    } else {
      navigate(`/client/${project.ownerFreelancer}`);
    }
  };
  const handleNavigateToEditProject = () => {
    navigate(`/editProject/${projectId}`);
  };
  // const [total, setTotal] = useState([]);
  // const handleTotal = project.price.reduce((sum: number, value: number) => sum + value);

  // Total of the services
  console.log(`This is the project`, project.services);
  const projectServices = project.services;

  const total = projectServices?.reduce((a: any, v: any) => a + +v.price, 0);
  console.log(`This is the total`, total);

  const PageHeadInfo = [
    {
      id: 1,
      titleOfPage: `Project Details`,
      threeDotButton: {
        button1: 'Edit Project',
        onClickEvent: handleNavigateToEditProject
      }
    },
    {
      id: 2,
      threeDotButton: {
        button1: 'View Client',
        onClickEvent: handleNavigateToClient
      }
    }
  ];

  if (isLoading) return <LoadingSpin />;
  return (
    // Project Details Mobil Version ----------------------------------------------
    <WholeContainer>
      <PageHead pageHeadInfo={PageHeadInfo} />
      {!desktopVersion ? (
        <Container>
          <ContainerDetails>{project && <CardDetails projectData={project} />}</ContainerDetails>
          <ProjectInvoicesFiles>
            {/* <h4>Service</h4> */}
            {openModal && (
              <ModalBackgroundDesktop ref={ref}>
                <ModalContainerDesktop>
                  <div>
                    <GrClose onClick={handleModal} cursor="pointer" fontSize={18} />
                  </div>
                  <ModalText>
                    <p>Description of {serviceToModal.serviceName}:</p>
                    <p>{serviceToModal.description}</p>
                  </ModalText>
                </ModalContainerDesktop>
              </ModalBackgroundDesktop>
            )}
            {/*   {project.services.map((item: any, index: number) => ( */}
            {/*     // eslint-disable-next-line react/no-array-index-key */}
            {/*     <div key={index}> */}
            {/*       <ServicesButton type="button" onClick={() => handleModalIndex(index)}> */}
            {/*         {item.serviceName} */}
            {/*       </ServicesButton> */}
            {/*     </div> */}
            {/*   ))} */}

            {/* <PricesInvoice> */}
            {/*   <h4>Price</h4> */}
            {/*   {project.services.length > 0 && */}
            {/*     project.services.map((item: any, index: number) => ( */}
            {/*       // eslint-disable-next-line react/no-array-index-key */}
            {/*       <div key={index}> */}
            {/*         <p>{item.price} €</p> */}
            {/*       </div> */}
            {/*     ))} */}
            {/* </PricesInvoice> */}
            <WrapperServices>
              <div>
                <h4>Services</h4>
                <h4>Price</h4>
              </div>
              {project.services.length > 0 &&
                project.services.map((item: any, i: number) => (
                  <ContainerServiceAndPrice onClick={() => handleModalIndex(i)}>
                    <p>{item.serviceName}</p>
                    <p>{item.price}€</p>
                  </ContainerServiceAndPrice>
                ))}
              <ContainerTotal>
                <p>Total:</p>
                <p>{total} €</p>
              </ContainerTotal>
            </WrapperServices>
            <ContainerButtonAndGenerate>
              <Button
                text="+ Add/Remove New Service"
                height="50px"
                width="auto"
                fontSize="13px"
                padding="0.5rem 1rem"
                onClick={handleNavigateToEditProject}
              />
              <GeneratePdf />
            </ContainerButtonAndGenerate>
            <ContainerButtonAndFiles>
              <Button
                text={showPreviews ? 'Hide Previews' : 'Show Previews Files/Images'}
                onClick={() => setShowPreviews((prev) => !prev)}
              />
              {!showPreviews ? (
                <>
                  <p>Images</p>
                  <ContainerUploadedImages>
                    {project.images.length > 0 &&
                      project.images.slice(0, 7).map((item: any) => (
                        <div key={item.key}>
                          <a href={item.url} target="_blank" rel="noreferrer">
                            <BsImage fontSize={36} />
                          </a>
                        </div>
                      ))}
                  </ContainerUploadedImages>
                  <p>Files</p>
                  <ContainerUploadedFiles>
                    {project.files.length > 0 &&
                      project.files.map((item: any) => (
                        <div key={item.key}>
                          <a href={item.url} target="_blank" rel="noreferrer">
                            <AiOutlineFileText fontSize={40} />
                          </a>
                        </div>
                      ))}
                  </ContainerUploadedFiles>
                </>
              ) : (
                <>
                  <p>Images</p>
                  <ContainerPreviewImg>
                    {project.images.length > 0 &&
                      project.images.slice(0, 7).map((item: any) => (
                        <div key={item.key}>
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                            <img src={`${item.url}`} height="100%" width="100%" alt="idea" />
                          </a>
                        </div>
                      ))}
                  </ContainerPreviewImg>
                  <p>Files</p>
                  <ContainerIframesFiles>
                    {project.files.length > 0 &&
                      project.files.map((item: any) => (
                        <div key={item.key}>
                          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                          <iframe
                            // src={`https://drive.google.com/viewerng/viewer?url=${item.url}&embedded=true`}
                            // src={`https://drive.google.com/gview?url=${item.url}&embedded=true`}
                            // src={`https://docs.google.com/gview?url=${item.url}&embedded=true`}
                            src={`${item.url}`}
                            height="100%"
                            width="100%"
                            loading="lazy"
                            frameBorder="0"
                            style={{ border: 0 }}
                          />
                          {/* eslint-disable-next-line jsx-a11y/alt-text */}
                          {/* <object data={item.url} type="application/pdf" width="100%" height="100%"> */}
                          {/*   <p> */}
                          {/*     Your browser does not support PDFs. */}
                          {/*     <a href={item.url}>Download the PDF</a>. */}
                          {/*   </p> */}
                          {/* </object> */}
                          <AOpen href={item.url} target="_blank" rel="noreferrer">
                            <MdFullscreen fontSize={32} />
                          </AOpen>
                        </div>
                      ))}
                  </ContainerIframesFiles>
                </>
              )}
              <Files>
                <FileUploader projectId={projectId} />
              </Files>
            </ContainerButtonAndFiles>
          </ProjectInvoicesFiles>
          {/* <LabelTotal> */}
          {/*   Total:<span> </span> */}
          {/*   <TotalNumber /> */}
          {/*   {total} € <span /> */}
          {/* </LabelTotal> */}
        </Container>
      ) : (
        // Project Details Desktop Version ----------------------------------------------
        <FirstContainer>
          <ContainerDesktop>
            <ContainerDetailsDesktop>
              {project && <CardDetails projectData={project} />}
              <Button
                text={`Send Message To ${userData.role === 'Freelancer' ? 'Client' : 'Freelancer'}`}
                width="100%"
                padding="1.5rem 2rem"
              />
            </ContainerDetailsDesktop>
            <ProjectInvoicesFilesDesktop>
              <InvoiceDesktop>
                {/* <ServicesInvoiceDesktop> */}
                {/* <H5>Service</H5> */}
                {openModal && (
                  <ModalBackgroundDesktop ref={ref}>
                    <ModalContainerDesktop>
                      <div>
                        <GrClose onClick={handleModal} cursor="pointer" fontSize={18} />
                      </div>
                      <ModalText>
                        <p>Description of {serviceToModal.serviceName}:</p>
                        <p>{serviceToModal.description}</p>
                      </ModalText>
                    </ModalContainerDesktop>
                  </ModalBackgroundDesktop>
                )}
                <WrapperServicesDesktop>
                  <div>
                    <h4>Services</h4>
                    <h4>Price</h4>
                    <h4>Description</h4>
                  </div>
                  {project.services.length > 0 &&
                    project.services.map((item: any, i: number) => (
                      <ContainerServiceAndPrice onClick={() => handleModalIndex(i)}>
                        <p>{item.serviceName}</p>
                        <p>{item.price}€</p>
                        <p>{item.description}</p>
                      </ContainerServiceAndPrice>
                    ))}
                </WrapperServicesDesktop>
                {/*   {project.services.map((item: any, index: number) => ( */}
                {/*     // eslint-disable-next-line react/no-array-index-key */}
                {/*     <div key={index}> */}
                {/*       <ServicesButton type="button" onClick={() => handleModalIndex(index)}> */}
                {/*         {item.serviceName} */}
                {/*       </ServicesButton> */}
                {/*     </div> */}
                {/*   ))} */}
                {/* </ServicesInvoiceDesktop> */}
                {/* <PricesInvoiceDesktop> */}
                {/*   <H5>Price</H5> */}
                {/*   {project.services.map((item: any, index: number) => ( */}
                {/*     // eslint-disable-next-line react/no-array-index-key */}
                {/*     <div key={index}> */}
                {/*       <p>{item.price}€</p> */}
                {/*     </div> */}
                {/*   ))} */}
                {/* </PricesInvoiceDesktop> */}
                {/* <ShortDescriptionDesktop> */}
                {/*   <H5>Short description</H5> */}
                {/*   {project.services.map((item: any, index: number) => ( */}
                {/*     // eslint-disable-next-line react/no-array-index-key */}
                {/*     <div key={index}> */}
                {/*       <p>{item.description}</p> */}
                {/*     </div> */}
                {/*   ))} */}
                {/* </ShortDescriptionDesktop> */}
              </InvoiceDesktop>
              <div>
                <Line />
                <Total>
                  <Button
                    text="+ Add/Remove New Service"
                    height="50px"
                    width="200px"
                    fontSize="13px"
                    padding="0.5rem 1rem"
                    onClick={handleNavigateToEditProject}
                  />
                  <GeneratePdf />
                  {/* <Button */}
                  {/*   text="+ Add note" */}
                  {/*   height="50px" */}
                  {/*   width="140px" */}
                  {/*   fontSize="13px" */}
                  {/*   padding="0.5rem 1rem" */}
                  {/* /> */}
                  <LabelTotalDesktop>
                    Total:<span> </span>
                    <TotalNumber />
                    {total}€ <span />
                  </LabelTotalDesktop>
                </Total>
              </div>
            </ProjectInvoicesFilesDesktop>
          </ContainerDesktop>
          <ContainerButtonAndFiles>
            <Button
              text={showPreviews ? 'Hide Previews' : 'Show Previews Files/Images'}
              onClick={() => setShowPreviews((prev) => !prev)}
            />
            {!showPreviews ? (
              <>
                <p>Images({project?.images?.length})</p>
                <ContainerUploadedImages>
                  {project.images.length > 0 &&
                    project.images.slice(0, 7).map((item: any) => (
                      <div key={item.key}>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <BsImage fontSize={36} />
                        </a>
                      </div>
                    ))}
                </ContainerUploadedImages>
                <p>Files({project?.files?.length})</p>
                <ContainerUploadedFiles>
                  {project.files.length > 0 &&
                    project.files.map((item: any) => (
                      <div key={item.key}>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <AiOutlineFileText fontSize={40} />
                        </a>
                      </div>
                    ))}
                </ContainerUploadedFiles>
              </>
            ) : (
              <>
                <p>Images({project?.images?.length})</p>
                <ContainerPreviewImg>
                  {project.images.length > 0 &&
                    project.images.slice(0, 7).map((item: any) => (
                      <div key={item.key}>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                          <img src={`${item.url}`} height="100%" width="100%" alt="idea" />
                        </a>
                      </div>
                    ))}
                </ContainerPreviewImg>
                <p>Files({project?.files?.length})</p>
                <ContainerIframesFiles>
                  {project.files.length > 0 &&
                    project.files.map((item: any) => (
                      <div key={item.key}>
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe
                          // src={`https://drive.google.com/viewerng/viewer?url=${item.url}&embedded=true`}
                          // src={`https://drive.google.com/gview?url=${item.url}&embedded=true`}
                          // src={`https://docs.google.com/gview?url=${item.url}&embedded=true`}
                          src={`${item.url}`}
                          height="100%"
                          width="100%"
                          loading="lazy"
                          frameBorder="0"
                          style={{ border: 0 }}
                        />
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        {/* <object data={item.url} type="application/pdf" width="100%" height="100%"> */}
                        {/*   <p> */}
                        {/*     Your browser does not support PDFs. */}
                        {/*     <a href={item.url}>Download the PDF</a>. */}
                        {/*   </p> */}
                        {/* </object> */}
                        <AOpen href={item.url} target="_blank" rel="noreferrer">
                          <MdFullscreen fontSize={32} />
                        </AOpen>
                      </div>
                    ))}
                </ContainerIframesFiles>
              </>
            )}
            <Files>
              <FileUploader projectId={projectId} />
            </Files>
          </ContainerButtonAndFiles>
        </FirstContainer>
      )}
    </WholeContainer>
  );
}

export default ProjectDetail;
