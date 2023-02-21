import PropTypes from "prop-types";
import { useContext } from "react";
import NotificationContext from "../notificationContext";

const Notification = () => {
  const [notification,] = useContext(NotificationContext)

  if (notification === null) {
    return null;
  }
  const {content, className} = notification
  return <div className={className}>{content}</div>;
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
