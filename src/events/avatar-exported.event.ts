import { IFrameEvent } from '../types';

export type AvatarExportedEventPayload = {
  url: string;
};

export type AvatarExportedEvent = IFrameEvent<AvatarExportedEventPayload>;
