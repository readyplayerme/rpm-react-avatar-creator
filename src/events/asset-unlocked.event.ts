import { IFrameEvent } from '../types';

export type AssetUnlockedEventPayload = {
  id: string;
};

export type AssetUnlockedEvent = IFrameEvent<AssetUnlockedEventPayload>;
