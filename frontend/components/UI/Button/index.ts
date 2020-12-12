import styled, { css } from 'styled-components';

export const SButton = styled.button<{ myType: "white" | "blue" | "orange", small?: boolean, middle?: boolean }>`
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  font-style: normal;
  pointer-events: auto;

  ${({ myType, small }) => myType === 'white' && css`
    height: 60px;
    border-radius: 20px;
    width: ${small ? "150px" : "350px"};
    background-color: transparent;
    border: 1px solid #fff;
    font-family: "Play";
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  `};

  ${({ myType, small }) => myType === 'orange' && css`
    height: 60px;
    border-radius: 20px;
    width: ${small ? "150px" : "350px"};
    background-color: ${({ theme }) => theme.orange};
    border: 1px solid ${({ theme }) => theme.orange};
    font-family: "Raleway";
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;      
    color: #FFFFFF;
    &:hover {
      background-color: transparent;
    }
  `};

  ${({ myType, small, theme, middle }) => myType === 'blue' && css`
    height: ${small ? 'auto' : '60px'};
    border-radius: ${small ? '10px' : '20px'};
    font-size: ${small ? '12px' : '18px'};
    line-height: ${small ? '15px' : '22px'};
    padding: ${middle ? "none" : small ? '7px 21px' : '16px 31px'};
    min-width: ${small || middle ? '110px' : '218px'};
    ${middle && 'width: 210px'};
    background-color: ${small ? "#FFF" : theme.lightBlue};
    border: 1px solid ${({ theme }) => theme.lightBlue};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    font-family: Montserrat;
    color: #000000;
    font-weight: normal;
    &:hover {
      /* background-color: transparent; */
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    }
  `};

  transition: background-color 0.3s ease;
`;



