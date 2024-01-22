import { IEmergencyRequest } from "@/store/types/emergencyRequest";
import { Avatar, Typography } from "@mui/material";

interface INotificationCard {
  title: string;
  description: string;
}
export default function NotificationCard({ requestedBy, chargingType }: IEmergencyRequest) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Avatar
        src={`https://ui-avatars.com/api/?name=${
          requestedBy.firstName.replace(" ", "+") + requestedBy.lastName.replace(" ", "+")
        }`}
        alt={`${requestedBy.firstName} ${requestedBy.lastName}`}
      />
      <div>
        <Typography variant="subtitle1">
          <strong>
            {requestedBy.firstName} {requestedBy.lastName}
          </strong>{" "}
          is requesting for a rescue
        </Typography>
        <Typography
          variant="body1"
          style={{
            textTransform: "uppercase",
          }}
        >
          <strong>Charging Type:</strong> {chargingType}
        </Typography>
      </div>
    </div>
  );
}
