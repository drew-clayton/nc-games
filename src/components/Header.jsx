import styled from "styled-components";

const Header = () => {
  //? this is just a test of styled components //

  const StyledHeader = styled.h2`
    background-color: #a6b9f0;
  `;

  return (
    <>
      <StyledHeader>NC Games</StyledHeader>
    </>
  );
};

export default Header;
