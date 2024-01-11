import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  display: "block",
  justifyContent: "center",
  alignItems: "center",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/IDTco_logo.jpg"
        alt="logo"
        width={500}
        height={500}
        style={{ height: 100, width: 100, objectFit: "contain" }}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
