import React, { ReactNode, useContext } from 'react';
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';

import ErrorMessage from '../../molecules/ErrorMessage/ErrorMessage';
import { Context } from '../../../providers/GeneralProvider';

interface MainContainer {
  children: ReactNode;
}

// Component which provide Header to Each Page
function MainContainerApp({ children }: MainContainer) {
  const { myError } = useContext(Context);
  return (
    <>
      {(myError.message || myError.successMessage) && (
        <ErrorMessage
          message={myError.message === '1' ? undefined : myError.message}
          success={myError.success}
          successMessage={myError.successMessage === '1' ? undefined : myError.successMessage}
        />
      )}
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainContainerApp;
