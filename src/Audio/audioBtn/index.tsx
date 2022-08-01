import React, { useCallback } from 'react';
import { PlaySvg } from '../svgCom/Paly';
import { PauseSvg } from '../svgCom/Pause';
import { useAudioState } from '../hooks';
import { Loading } from '../svgCom/Loading';

export const AudioBtn = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const [state] = useAudioState(audioRef);
  const audioHandle = useCallback(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    if (state === 'play') {
      audioDom.pause();
    } else if (state === 'pause') {
      audioDom.play();
    }
  }, [audioRef, state]);
  return (
    <div
      className="audio-btn"
      onClick={audioHandle}
      style={{ cursor: state !== 'loading' ? 'pointer' : 'none' }}
    >
      {state === 'loading' ? (
        <Loading></Loading>
      ) : state === 'play' ? (
        <PlaySvg></PlaySvg>
      ) : (
        <PauseSvg></PauseSvg>
      )}
    </div>
  );
};
