import PropTypes from "prop-types";
// mui imports
import { ListSubheader, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
}

const NavGroup = ({ item }: ItemType) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: "#efefef",
    lineHeight: "26px",
    padding: "3px 12px",
  }));
  return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
