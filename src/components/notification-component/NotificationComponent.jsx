import { NotificationComponentContainer } from "./NotificationComponent.styles";

const NotificationComponent = ({ success, text }) => {
  return (
    <NotificationComponentContainer
      style={
        success
          ? { backgroundColor: "var(--green)" }
          : { backgroundColor: "var(--red)" }
      }
    >
      <h2>{text}</h2>
    </NotificationComponentContainer>
  );
};

export default NotificationComponent;
