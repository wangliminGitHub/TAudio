/*
 * @Author: princemwang
 * @Date: 2022-08-02 17:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 18:26:59
 */

import React, { useRef } from 'react';
import { TaudioProps } from './types';
import { AudioLayout } from './audioLayout';
import { AudioSpeed } from './speed';
import { AudioBtn } from './audioBtn';
import { PlayTime } from './playTime';
import { Progress } from './progress';
import { Volume } from './volume';

const TAudio = ({
  src,
  preload = 'auto',
  crossOriginIsolated = 'true',
  children,
  ...props
}: TaudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <div className="t-audio">
      <audio
        ref={audioRef}
        preload={preload}
        cross-origin-isolated={crossOriginIsolated}
        crossOrigin="true"
        src={src}
        {...props}
      ></audio>
      {typeof children === 'function' ? (
        children(audioRef)
      ) : (
        <AudioLayout audioRef={audioRef}></AudioLayout>
      )}
    </div>
  );
};
export { AudioBtn, PlayTime, AudioSpeed, Progress, Volume };
export default () => {
  return <TAudio src="https://webcast.tencent.com/assets/bensound-dreams.mp3"></TAudio>;
};
