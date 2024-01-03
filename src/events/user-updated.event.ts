import { IFrameEvent } from '../types';

export type UserUpdatedEventPayload = {
  id: string;
};

export type UserUpdatedEvent = IFrameEvent<UserUpdatedEventPayload>;
