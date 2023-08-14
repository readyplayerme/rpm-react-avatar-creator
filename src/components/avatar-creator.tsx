import React, { FC } from 'react';
import { IFrameEvent } from '../types';
import { AvatarCreatorEvent, UserAuthorizedEvent, AssetUnlockedEvent, AvatarExportedEvent, UserSetEvent } from '../events';
import { AvatarCreatorRaw, AvatarCreatorRawProps } from './avatar-creator-raw';

export type AvatarCreatorProps = {
  onUserSet?: (event: UserSetEvent) => void;
  onAvatarExported?: (event: AvatarExportedEvent) => void;
  onUserAuthorized?: (event: UserAuthorizedEvent) => void;
  onAssetUnlock?: (event: AssetUnlockedEvent) => void;
} & AvatarCreatorRawProps;

/**
 * AvatarCreator is a React component that allows you to create an avatar using Ready Player Me and receive avatar URL. It wraps AvatarCreatorRaw to provide more type safety, and to provide explicit callbacks per event type.
 * @param subdomain The subdomain of your Ready Player Me instance.
 * @param className The css styles to apply to this iframe.
 * @param avatarCreatorConfig The configuration for the AvatarCreator component.
 * @param avatarConfig The configuration for the Avatar GLB file.
 * @param onUserSet A callback that is called when a user is set.
 * @param onAvatarExported A callback that is called when an avatar is exported.
 * @param onUserAuthorized A callback that is called when a user is authorized.
 * @param onAssetUnlock A callback that is called when an asset unlock button is pressed in RPM.
 * @returns A React component.
 */
export const AvatarCreator: FC<AvatarCreatorProps> = ({ subdomain, className, avatarCreatorConfig, onUserSet, onAvatarExported, onUserAuthorized, onAssetUnlock }) => {
  const supportedEvents = {
    'v1.avatar.exported': onAvatarExported,
    'v1.user.set': onUserSet,
    'v1.user.authorized': onUserAuthorized,
    'v1.asset.unlock': onAssetUnlock,
  } as Record<string, any>;

  const handleEvents = (event: IFrameEvent<AvatarCreatorEvent>) => {
    supportedEvents[event.eventName]?.();
  };

  return <AvatarCreatorRaw subdomain={subdomain} className={className} avatarCreatorConfig={avatarCreatorConfig} onEventReceived={handleEvents} />;
};
