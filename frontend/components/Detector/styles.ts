import styled from 'styled-components';

export const Text = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  color: #000000;
  margin-bottom: 1px;
`;

export const Index = styled.div`
  background: #FFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 0px 20px 20px 0;
  height: 95px;
  width: 95px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px
`

export const Info = styled.div`
  position: absolute;
  top: -150px;
  left: -50px;
  display: flex;
  z-index: 2;
`
export const Circle = styled.div<{ index: number, good: string }>`
  position: absolute;
  background: ${({ good }) => good};
  height: 10px;
  width: 10px;
  border-radius: 100%;
  right: 14px;
  top: ${({ index }) => {
    if (index === 1) {
      return '22px'
    }
    if (index === 2) {
      return '36px'
    }
    if (index === 3) {
      return '50px'
    }
    return '66px'
  }};
`

export const Box = styled.div`
  background: #FFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  height: 95px;
  width: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-radius: 20px 0px 0px 20px;

`
export const Num = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
`

export const MyImage = styled.div`
  position: absolute;
  height: 400px;
  width: 500px;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.15);
  }
`

export const Wrapper = styled.div`
  position: relative;
  padding: 40px 0;
  width: 250px;
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-direction: column;
  margin: 100px 20px 150px 20px;

`;
