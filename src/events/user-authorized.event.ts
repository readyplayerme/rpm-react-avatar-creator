import { IFrameEvent } from '../types';

export type UserAuthorizedEventPayload = {
  id: string;
};

export type UserAuthorizedEvent = IFrameEvent<UserAuthorizedEventPayload>;
