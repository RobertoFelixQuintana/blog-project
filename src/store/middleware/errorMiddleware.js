import { isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';
import { logout } from '../Features/auth';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    message.error(action.payload.data.message);
  }

  if (action?.payload?.status === 401) {
    api.dispatch(logout());
  }

  return next(action);
};
