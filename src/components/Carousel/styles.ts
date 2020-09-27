import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  position: relative;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background-color: var(--color-white);
`;

export const SlideButton = styled.button`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  height: 4rem;
  width: 4rem;
  border: none;
  border-radius: 50%;
  color: #fff;
  background-color: var(--color-primary);
  cursor: pointer;

  &:disabled {
    background-color: var(--color-gray);
    color: var(--color-gray-dark);
    cursor: not-allowed;
  }

  &.left {
    left: -8rem;
  }

  &.right {
    right: -8rem;
  }
`;

export const Slider = styled.ul`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.li`
  flex-shrink: 0;
  width: 100%;
  list-style: none;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const NavIndicator = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin: 0 0.4rem;
  cursor: pointer;
  border: none;

  &.active {
    background-color: var(--color-primary);
    width: 1.4rem;
    height: 1.4rem;
    cursor: default;
  }
`;

export const Caption = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
`;
