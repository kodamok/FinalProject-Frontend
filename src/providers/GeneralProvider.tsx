import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useMemo,
  useState
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Few examples of complex types
// type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
// const defaultUpdate: UpdateType()
// type SetValue<T> = Dispatch<SetStateAction<T>>

interface ContextType {
  example: boolean;
  setExample: Dispatch<SetStateAction<boolean>>;
  example2: boolean;
  setExample2: Dispatch<SetStateAction<boolean>>;
  userData: {
    token: string;
    role: string;
    email: string;
    userId: string;
    exp: any;
    name: string;
    identityCardNumber: string;
    taxNumber: string;
    avatar: string;
  };
  setUserData: Dispatch<
    SetStateAction<{
      token: string;
      role: string;
      email: string;
      userId: string;
      exp: any;
      name: string;
      identityCardNumber: string;
      taxNumber: string;
      avatar: string;
    }>
  >;
  myError: {
    message: string | undefined;
    success: boolean;
    successMessage: string | undefined;
  };
  setMyError: Dispatch<
    SetStateAction<{
      message: string;
      success: boolean;
      successMessage: string;
    }>
  >;
  messages: never[];
  setMessages: Dispatch<SetStateAction<never[]>>;
  openChatBoxWithThisUser: string;
  setOpenChatBoxWithThisUser: Dispatch<SetStateAction<string>>;
  clientsGlobal: never[];
  setClientsGlobal: Dispatch<SetStateAction<never[]>>;
  filesAreUploaded: boolean;
  setFilesAreUploaded: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextType>({
  example: false,
  setExample: () => undefined,
  example2: false,
  setExample2: () => undefined,
  userData: {
    token: '',
    role: '',
    email: '',
    name: '',
    exp: '',
    userId: '',
    identityCardNumber: '',
    taxNumber: '',
    avatar: ''
  },
  setUserData: () => undefined,
  myError: {
    message: '',
    success: false,
    successMessage: ''
  },
  setMyError: () => undefined,
  messages: [],
  setMessages: () => undefined,
  openChatBoxWithThisUser: '',
  setOpenChatBoxWithThisUser: () => undefined,
  clientsGlobal: [],
  setClientsGlobal: () => undefined,
  filesAreUploaded: false,
  setFilesAreUploaded: () => undefined
});

function GeneralProvider({ children }: { children: ReactNode }): ReactElement {
  const [example, setExample] = useState<boolean>(false);
  const [example2, setExample2] = useLocalStorage('localStorageExample', true);
  const [userData, setUserData] = useLocalStorage('alpacaUserData', {
    token: '',
    role: '',
    email: '',
    name: '',
    exp: '',
    userId: '',
    identityCardNumber: '',
    taxNumber: '',
    avatar: ''
  });
  const [myError, setMyError] = useState({
    message: '',
    success: false,
    successMessage: ''
  });
  const [messages, setMessages] = useState<never[]>([]);
  const [openChatBoxWithThisUser, setOpenChatBoxWithThisUser] = useState<string>('');
  const [clientsGlobal, setClientsGlobal] = useState([]);
  const [filesAreUploaded, setFilesAreUploaded] = useState(false);

  const value = useMemo(() => {
    return {
      example,
      setExample,
      example2,
      setExample2,
      userData,
      setUserData,
      myError,
      setMyError,
      messages,
      setMessages,
      openChatBoxWithThisUser,
      setOpenChatBoxWithThisUser,
      clientsGlobal,
      setClientsGlobal,
      filesAreUploaded,
      setFilesAreUploaded
    };
  }, [
    example,
    setExample,
    example2,
    setExample2,
    userData,
    setUserData,
    myError,
    setMyError,
    messages,
    setMessages,
    openChatBoxWithThisUser,
    setOpenChatBoxWithThisUser,
    clientsGlobal,
    setClientsGlobal,
    filesAreUploaded,
    setFilesAreUploaded
  ]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default GeneralProvider;
