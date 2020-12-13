
import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: row;
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

export const Blocks = styled.div`
  display: flex;
`

export const Block = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  background: ${({ isActive }) => isActive ? "#60CFBF" : "#FFF"};
  border-radius: 10px;
  margin-left: 42px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  height: 42px;
  width: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
`

export const Title = styled.h2`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  margin-bottom: 60px;
`;


