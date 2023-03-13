import { RootState } from '..';

export const selectNotificationModule = (state: RootState) => state.notification;

export const selectNotification = (state: RootState) =>
  selectNotificationModule(state).notificationMsg;
