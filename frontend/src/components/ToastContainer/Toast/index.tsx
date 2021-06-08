import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} data-testid="icon-toast-container-info" />,
  error: <FiAlertCircle size={24} data-testid="icon-toast-container-error" />,
  success: (
    <FiCheckCircle size={24} data-testid="icon-toast-container-success" />
  ),
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      $hasDescription={!!message.description}
      style={style}
      data-testid="toast-container"
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button
        type="button"
        onClick={() => removeToast(message.id)}
        data-testid="toast-close-button"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
