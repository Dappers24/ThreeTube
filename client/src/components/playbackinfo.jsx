import * as Player from "@livepeer/react/player";
import { getSrc } from "@livepeer/react/external";
import {livepeer} from '../apis/livepeer'
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { useEffect } from "react";
import { useState } from "react";

// fetch the playback info on the server, using React Server Components
// or regular API routes



export const DemoPlayer = () => {

  
const [src , setsrc] = useState('');


useEffect(()=>{
  getPlaybackSource()
})

const getPlaybackSource = async() => {
  const playbackInfo = await livepeer.playback.get('cc3f6huz7ykd5jdy');

  const srcGet = getSrc(playbackInfo.playbackInfo);
  setsrc(srcGet);
};

  return (
    <Player.Root src={src}>
      <Player.Container>
        <Player.Video title="Live stream" />

        <Player.Controls className="flex items-center justify-center">
          <Player.PlayPauseTrigger className="w-10 h-10">
            <Player.PlayingIndicator asChild matcher={false}>
              <PlayIcon />
            </Player.PlayingIndicator>
            <Player.PlayingIndicator asChild>
              <PauseIcon />
            </Player.PlayingIndicator>
          </Player.PlayPauseTrigger>
        </Player.Controls>
      </Player.Container>
    </Player.Root>
  );
};