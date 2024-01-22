import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  overflow: "hidden",
  display: "block",
}));

const Logo = ({ h, w }: { h: number | `${number}` | null; w: number | `${number}` | null }) => {
  h = h || 70;
  w = w || 180;
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/logo.png" alt="logo" height={h} width={w} priority />
    </LinkStyled>
  );
};

export default Logo;
