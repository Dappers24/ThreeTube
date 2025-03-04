import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
//import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
//import { vodSource } from "./source";
import PropTypes from "prop-types";

const DemoPlayer = ({ src }) => {
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

DemoPlayer.propTypes = {
    src: PropTypes.array,
  };

export default DemoPlayer;
