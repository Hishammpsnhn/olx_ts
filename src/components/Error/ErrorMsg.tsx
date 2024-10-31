import React from "react";
// import { FaExclamationTriangle } from "react-icons/fa"; // Import an icon for visual emphasis
import styles from "./ErrorMsg.module.css"; 

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      {/* <FaExclamationTriangle className={styles.errorIcon} /> Icon for emphasis */}
      {message}
    </div>
  );
};

export default ErrorMessage;
