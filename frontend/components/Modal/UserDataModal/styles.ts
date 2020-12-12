import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

export const Circle = styled.div`
  overflow: hidden;
  height: 138px;
  width: 138px;
  border-radius: 50%;
  background-color: #FFF;
  margin-bottom: 32px;
  display: flex;
  justify-content: center; 
  align-items: flex-end;
  margin-right: 52px;
`

export const ImageWrapper = styled.div`
  margin-left: 15px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 20px;
  > span {
    font-weight: 300;
    margin-left: 15px;
  }
`

export const Title = styled.h2`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  text-align: left;
  margin-bottom: 36px;
`;


