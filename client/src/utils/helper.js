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

const catchError = error => {
  if (error?.response?.data) {
    console.log('>>>', error.response.data);
    return {success: false, error: error.response.data.message};
  } else {
    console.log('===', error.response.data);
    return {success: false, error: error.response.data};
  }
};

export {showError, showSuccess, updateNotification, catchError};
