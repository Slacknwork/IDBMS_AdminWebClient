import { Card } from "@mui/material";

const BlankCard = ({ children, className }) => {
  return (
    <Card
      sx={{ px: 4, position: "relative" }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
