import React, { FC } from 'react';
import { AvatarCreatorEvent, UserAuthorizedEvent, AssetUnlockedEvent, AvatarExportedEvent, UserSetEvent } from '../events';
import { AvatarCreatorRaw, AvatarCreatorRawProps } from './avatar-creator-raw';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserLoggedOutEvent } from '../events/user-logged-out.event';

export type AvatarCreatorProps = {
  onUserSet?: (event: UserSetEvent) => void;
  onAvatarExported?: (event: AvatarExportedEvent) => void;
  onUserAuthorized?: (event: UserAuthorizedEvent) => void;
  onAssetUnlock?: (event: AssetUnlockedEvent) => void;
  onUserUpdated?: (event: UserUpdatedEvent) => void;
  onUserLoggedOut?: (event: UserLoggedOutEvent) => void;
} & AvatarCreatorRawProps;

/**
 * AvatarCreator is a React component that allows you to create an avatar using Ready Player Me and receive avatar URL. It wraps AvatarCreatorRaw to provide more type safety, and to provide explicit callbacks per event type.
 * @param subdomain The subdomain of your Ready Player Me instance.
 * @param className The css classes to apply to this iframe.
 * @param style The css styles to apply to this iframe.
 * @param config The configuration for the AvatarCreator component.
 * @param onUserSet A callback that is called when the user is set.
 * @param onAvatarExported A callback that is called when an avatar is exported.
 * @param onUserAuthorized A callback that is called when the user is authorized.
 * @param onAssetUnlock A callback that is called when an asset unlock button is pressed in RPM.
 * @param onUserUpdated A callback that is called when the user is updated.
 * @param onUserLoggedOut A callback that is called when the user is logged out.
 * @returns A React component.
 */
export const AvatarCreator: FC<AvatarCreatorProps> = ({ subdomain, className, style, config, onUserSet, onAvatarExported, onUserAuthorized, onAssetUnlock, onUserUpdated, onUserLoggedOut }) => {
  const supportedEvents = {
    'v1.avatar.exported': onAvatarExported,
    'v1.user.set': onUserSet,
    'v1.user.authorized': onUserAuthorized,
    'v1.asset.unlock': onAssetUnlock,
    'v1.user.updated': onUserUpdated,
    'v1.user.logout': onUserLoggedOut,
  } as Record<string, any>;

  const handleEvents = (event: AvatarCreatorEvent) => {
    supportedEvents[event.eventName!]?.(event);
  };

  return <AvatarCreatorRaw subdomain={subdomain} className={className} style={style} config={config} onEventReceived={handleEvents} />;
};
