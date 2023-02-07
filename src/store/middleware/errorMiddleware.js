import { isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    message.error(action.payload.data.message);
  }

  return next(action);
};
