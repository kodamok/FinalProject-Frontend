import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  
  
  #root{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  html {font-size: 100%;
    box-sizing: border-box;} /*16px*/

  body {
    background: white;
    font-family: 'Open Sans','Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.75;
    color: #000000;
    box-sizing: border-box;
    margin:0;
  }
  button, label{
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  input, select{
    font-family: 'Open Sans','Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;

  }
    //p {margin-bottom: 1rem;} it is necessary?
  
  p{
    margin:0;
  }

  a{
    text-decoration: none;
  }


  h1, h2, h3, h4, h5 {
    margin: 3rem 0 1.38rem;
    font-family: 'Inter', sans-serif;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
    font-size: 4.209rem;
  }

  h2 {font-size: 3.157rem;}

  h3 {font-size: 2.369rem;}

  h4 {font-size: 1.777rem;}

  h5 {font-size: 1.333rem;}

  small, .text_small {font-size: 0.75rem;}

  .box{
    padding:2rem;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
`;
