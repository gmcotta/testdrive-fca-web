import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;
    height: 100%;
    width: 100%;
  }

  *, button, input {
    font-family: 'Montserrat', sans-serif;
  }

  :root {
    --color-white: #fff;
    --color-light: #fffcf7;
    --color-black: #000;
    --color-dark: #2b2d42;
    --color-primary: #6186c4;
    --color-gray-light: #eee;
    --color-gray-dark: #8a8d8b;
    --color-green: #a3c299;
    --color-red: #bf3b26;
  }

  .light {
    color: var(--color-light);
  }
  .dark {
    color: var(--color-dark);
  }

  .text--center {
    text-align: center;
  }
`;
