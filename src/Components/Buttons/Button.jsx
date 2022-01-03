import React from 'react';
import { Link } from 'react-router-dom';
import "./Button.style.scss"
// import styled from 'styled-components';

// const ButtonStyle = styled.div`
 
//   @media only screen and (max-width: 768px) {
//     .button {
//       font-size: 1.8rem;
//     }
//   }
// `;

export default function Button({
  btnText = 'test',
  btnLink = '',
  outline = false,
}) {
  return (
    <div outline={outline} className="custom-btn btn-9">
      <Link className="button" to={btnLink}>
        {btnText}
      </Link>
    </div>
  );
}