import { createGlobalStyle } from 'styled-components';

import Starjedi from './Starjedi.ttf'

export default createGlobalStyle`
  @font-face {
    font-family: 'Star Jedi';
    font-style: normal;
    font-weight: 400;
    src: local('Star Jedi'), local('StarJedi-Regular'),
         url(http://allfont.net/cache/fonts/star-jedi_108a0c1f596b5c0a80628b4566a9f336.woff) format('woff'),
         url(http://allfont.net/cache/fonts/star-jedi_108a0c1f596b5c0a80628b4566a9f336.ttf) format('truetype');
  }
`;

// 
// @font-face {
//     font-family: 'Star Jedi';
//     font-style: normal;
//     font-weight: 400;
//     src: local('Star Jedi'), local('StarJedi-Regular'),
//         url(http://allfont.net/cache/fonts/star-jedi_108a0c1f596b5c0a80628b4566a9f336.woff) format('woff'),
//         url(http://allfont.net/cache/fonts/star-jedi_108a0c1f596b5c0a80628b4566a9f336.ttf) format('truetype');
// }
