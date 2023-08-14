# Ready Player Me - React Avatar Creator

**Ready Player Me - React Avatar Creator** is a set of components and helper methods to help implementing the Ready Player Me Avatar Creator into React projects.

## Installation
Ready Player Me React Avatar Creator is available as a [npm package](https://www.npmjs.com/package/@readyplayerme/react-avatar-creator).

```bash
npm i @readyplayerme/react-avatar-creator
```

## Usage

```tsx
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

export default function App() {
  return (<AvatarCreator subdomain="demo"/>);
}
```

https://user-images.githubusercontent.com/3163281/235168912-a9dacd91-af3a-4b35-81c3-b025e12e333a.mp4

---

# Components

## AvatarCreator

AvatarCreator component helps you load Ready Player Me in an iframe where you can edit your avatar and receive your avatar URL as a post message once your avatar is exported.

### Parameters

**subdomain** *[required]*: string 
- Your Ready Player Me subdomain. You can get one from [Ready Player Me Studio](https://studio.readyplayer.me/).

**editorConfig** *[optional]*: EditorConfig
- Editor Configuration is where you can set url properties of Ready Player Me editor. Read more about these options in [Ready Player Me documentations](https://docs.readyplayer.me/ready-player-me/integration-guides/web-and-native-integration/avatar-creator-integration#configuration-1).

**onAvatarExported** *[optional]*: (event: AvatarExportedEvent) => void
- Callback function that is called when avatar is exported.

**onUserSet** *[optional]*: (event: UserSetEvent) => void
- Callback function that is called when user id is set.

**onAssetUnlocked** *[optional]*: (event: AssetUnlockedEvent) => void
- Callback function that is called when an asset is unlocked.

**onUserAuthorized** *[optional]*: (event: UserAuthorizedEvent) => void
- Callback function that is called when the user is authorized.

### Example

```tsx
import { AvatarExportedEvent, UserSetEvent } from "@readyplayerme/react-avatar-creator/events";
import { AvatarCreator, AvatarCreatorConfig } from "@readyplayerme/react-avatar-creator";

const config: AvatarCreatorConfig = {
    clearCache: true;
    bodyType: 'halfbody';
    quickStart: 'false';
    language: 'tr';
}

const handleOnUserSet = (event: UserSetEvent) => {
    console.log(`User ID is: ${event.data.id}`)
}

const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(`Avatar URL is: ${event.data.url}`)
}

<AvatarCreator subdomain="demo" 
               editorConfig={config}
               onUserSet={handleOnUserSet} 
               onAvatarExported={handleOnAvatarExported}/>
```

## AvatarCreatorRaw

AvatarCreatorRaw is a lower level component that gives you everything found in the avatar creator, but without explicit callbacks for each event, so you can have the ability to create your own custom logic around these events, if you choose to do so.

### Parameters

**subdomain** *[required]*: string
- Your Ready Player Me subdomain. You can get one from [Ready Player Me Studio](https://studio.readyplayer.me/).

**editorConfig** *[optional]*: EditorConfig
- Editor Configuration is where you can set url properties of Ready Player Me editor. Read more about these options in [Ready Player Me documentations](https://docs.readyplayer.me/ready-player-me/integration-guides/web-and-native-integration/avatar-creator-integration#configuration-1).

**avatarConfig** *[optional]*: AvatarConfig
- Avatar Configuration is that changes the optimization properties of the generated GLB avatar model. Read more about these options in [Ready Player Me documentations](https://docs.readyplayer.me/ready-player-me/api-reference/avatar-rest-api/get-3d-avatars).

**onEventReceived** *[required]*: (event: IFrameEvent<any>) => void
- Callback function that is called whenever an AvatarCreatorEvent is published

### Example

```tsx
import { AvatarCreator, AvatarCreatorConfig } from "@readyplayerme/react-avatar-creator";

const config: AvatarCreatorConfig = {
  clearCache: true;
  bodyType: 'halfbody';
  quickStart: 'false';
  language: 'tr';
}

<AvatarCreatorRaw subdomain="demo" editorConfig={config}
  onEventReceived={(event) => console.log(event.eventName)}/>
```

## Using AvatarCreator with Visage

If you would like to use Visage, with its full capability to edit camera and light properties of the scene and more, you can use AvatarCreator component and Visage components together.

```tsx
import { Avatar } from '@readyplayerme/visage';
import { AvatarCreator, AvatarCreatorConfig } from '@readyplayerme/react-avatar-creator';

const subdomain = 'demo';

const editorConfig: AvatarCreatorConfig = {
  clearCache: true;
  bodyType: 'fullbody';
  quickStart: 'false';
  language: 'tr';
};

export const YourCustomComponent = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);

  return <>
    <AvatarCreator subdomain={subdomain} editorConfig={editorConfig} onAvatarExported={() => setUrl(event.data.url)} />
    <Avatar modelSrc={url} />
  </>
}
```