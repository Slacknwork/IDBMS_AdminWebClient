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
    <LinkStyled href="/" sx={{ height: 100, width: 100, position: "relative" }}>
      <Image
        src="/images/logos/IDTco_logo.jpg"
        alt="logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
