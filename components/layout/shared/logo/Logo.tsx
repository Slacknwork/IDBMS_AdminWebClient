import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
  justifyContent: "center",
  alignItems: "center",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/IDTco_logo.jpg" alt="logo" height={150} width={150} priority />
    </LinkStyled>
  );
};

export default Logo;
