import { createGlobalStyle } from 'styled-components';

import Starjedi from './Starjedi.ttf'

export default createGlobalStyle`
  @font-face {
    font-family: 'Star Jedi';
    font-style: normal;
    font-weight: 400;
    src: local('Star Jedi'), local('StarJedi-Regular'),
        url(${Starjedi}) format('ttf');
  }
`;
