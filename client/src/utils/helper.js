import {showMessage} from 'react-native-flash-message';

const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
  });
};

const showSuccess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

const updateNotification = (updater, text, type = 'error') => {
  updater({
    text,
    type,
  });
  setTimeout(() => {
    updater({text: '', text: ''});
  }, 2500);
};

export {showError, showSuccess, updateNotification};
