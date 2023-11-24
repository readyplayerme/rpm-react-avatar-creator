# Ready Player Me - React Avatar Creator

**Ready Player Me - React Avatar Creator** is a set of components and helper methods to help implementing the Ready Player Me Avatar Creator into React projects.

Codesandbox example for loading the Avatar Creator: https://codesandbox.io/p/sandbox/ready-player-me-react-avatar-creator-qxkqjf

Codesandbox example for loading the Avatar Creator and visualizing the avatar with the Visage package: https://codesandbox.io/p/sandbox/ready-player-me-visage-example-l4m2k2

## Installation

Ready Player Me React Avatar Creator is available as a [npm package](https://www.npmjs.com/package/@readyplayerme/react-avatar-creator).

```bash
npm i @readyplayerme/react-avatar-creator
```

## Usage

```tsx
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

export default function App() {
  return <AvatarCreator subdomain="demo" style={{ width: '100%', height: '100vh', border: 'none' }} />;
}
```

https://user-images.githubusercontent.com/3163281/235168912-a9dacd91-af3a-4b35-81c3-b025e12e333a.mp4

---

# Components

## AvatarCreator

AvatarCreator component helps you load Ready Player Me in an iframe where you can edit your avatar and receive your avatar URL as a post message once your avatar is exported.

### Parameters

**subdomain** _[required]_: string

- Your Ready Player Me subdomain. You can get one from [Ready Player Me Studio](https://studio.readyplayer.me/).

**className** _[optional]_: string

- The css classes to apply to the iframe.

**style** _[optional]_: CSSProperties

- The css styles to apply to the iframe.

**config** _[optional]_: AvatarCreatorConfig

- Editor Configuration is where you can set url properties of Ready Player Me editor. Read more about these options in [Ready Player Me documentations](https://docs.readyplayer.me/ready-player-me/integration-guides/web-and-native-integration/avatar-creator-integration#configuration-1).

**onAvatarExported** _[optional]_: (event: AvatarExportedEvent) => void

- Callback function that is called when avatar is exported.

**onUserSet** _[optional]_: (event: UserSetEvent) => void

- Callback function that is called when user id is set.

**onAssetUnlocked** _[optional]_: (event: AssetUnlockedEvent) => void

- Callback function that is called when an asset is unlocked.

**onUserAuthorized** _[optional]_: (event: UserAuthorizedEvent) => void

- Callback function that is called when the user is authorized.

### Example

```tsx
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent, UserSetEvent } from '@readyplayerme/react-avatar-creator';

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function App() {
  const handleOnUserSet = (event: UserSetEvent) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(`Avatar URL is: ${event.data.url}`);
  };

  return (
    <>
      <AvatarCreator subdomain="demo" config={config} style={style} onUserSet={handleOnUserSet} onAvatarExported={handleOnAvatarExported} />
    </>
  );
}
```

## AvatarCreatorRaw

AvatarCreatorRaw is a lower level component that gives you everything found in the avatar creator, but without explicit callbacks for each event, so you can have the ability to create your own custom logic around these events, if you choose to do so.

### Parameters

**subdomain** _[required]_: string

- Your Ready Player Me subdomain. You can get one from [Ready Player Me Studio](https://studio.readyplayer.me/).

**className** _[optional]_: string

- The css classes to apply to the iframe.

**style** _[optional]_: CSSProperties

- The css styles to apply to the iframe.

**config** _[optional]_: AvatarCreatorConfig

- Editor Configuration is where you can set url properties of Ready Player Me editor. Read more about these options in [Ready Player Me documentations](https://docs.readyplayer.me/ready-player-me/integration-guides/web-and-native-integration/avatar-creator-integration#configuration-1).

**onEventReceived** _[required]_: (event: IFrameEvent<any>) => void

- Callback function that is called whenever an AvatarCreatorEvent is published

### Example

```tsx
import { AvatarCreatorConfig, AvatarCreatorEvent, AvatarCreatorRaw } from '@readyplayerme/react-avatar-creator';

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function App() {
  const handleCustomEvent = (event: AvatarCreatorEvent) => {
    console.log(`Received custom event`, event);
  };

  return (
    <>
      <AvatarCreatorRaw subdomain="demo" config={config} style={style} onEventReceived={handleCustomEvent} />
    </>
  );
}
```

## Using AvatarCreator with Visage

If you would like to use Visage, with its full capability to edit camera and light properties of the scene and more, you can use AvatarCreator component and Visage components together.

```tsx
import { Avatar } from '@readyplayerme/visage';
import { AvatarCreator, AvatarCreatorConfig } from '@readyplayerme/react-avatar-creator';
import { useState } from 'react';

const subdomain = 'demo';

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export const YourCustomComponent = () => {
  const [url, setUrl] = useState<string>();

  if (!url) {
    return <AvatarCreator subdomain={subdomain} config={config} style={style} onAvatarExported={(event) => setUrl(event.data.url)} />;
  }
  return <Avatar style={style} modelSrc={url} cameraInitialDistance={10} />;
};
```
