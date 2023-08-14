import React, { FC, useEffect, useRef } from 'react';
import { AvatarCreatorConfig, IFrameEvent } from '../types';
import { JSONTryParse } from '../utils';
import { AvatarCreatorEvent } from '../events';
import { useAvatarCreatorUrl } from '../hooks/use-avatar-creator-url';

const MESSAGE_EVENT = 'message';
const RPM_TARGET = 'readyplayerme';
const IFRAME_READY_EVENT = 'v1.frame.ready';

export type AvatarCreatorRawProps = {
  subdomain: string;
  className?: string;
  avatarCreatorConfig?: AvatarCreatorConfig;
};

export type EventReceivedProps = {
  onEventReceived?: (event: IFrameEvent<AvatarCreatorEvent>) => void;
};

/**
 * AvatarCreatorRaw is a React component that allows you to create an avatar using Ready Player Me and receive avatar URL. It exposes the raw events in one callback to allow you to write more custom logic around the event handling.
 * @param subdomain The subdomain of your Ready Player Me instance.
 * @param className The css styles to apply to this iframe.
 * @param avatarCreatorConfig The configuration for the AvatarCreator component.
 * @param avatarConfig The configuration for the Avatar GLB file.
 * @param onEventReceived A callback that is called when an avatar creator event is received.
 * @returns A React component.
 */
export const AvatarCreatorRaw: FC<AvatarCreatorRawProps & EventReceivedProps> = ({ subdomain, className, avatarCreatorConfig, onEventReceived }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const url = useAvatarCreatorUrl(subdomain, avatarCreatorConfig);

  const subscribeToAvatarCreatorEvents = () => {
    if (!iframeRef.current?.contentWindow) return;

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        target: RPM_TARGET,
        type: 'subscribe',
        eventName: 'v1.**',
      }),
      '*'
    );
  };

  const subscribe = (event: any) => () => {
    const iframeEvent = JSONTryParse<IFrameEvent<AvatarCreatorEvent>>(event);

    if (iframeEvent?.source !== RPM_TARGET) return;

    if (iframeEvent?.eventName === IFRAME_READY_EVENT) {
      subscribeToAvatarCreatorEvents();
      return;
    }

    onEventReceived?.(iframeEvent);
  };

  useEffect(() => {
    window.addEventListener(MESSAGE_EVENT, subscribe);

    return () => {
      window.removeEventListener(MESSAGE_EVENT, subscribe);
    };
  }, []);

  return <iframe title="Ready Player Me" ref={iframeRef} src={url} className={className} allow="camera *; clipboard-write" />;
};
