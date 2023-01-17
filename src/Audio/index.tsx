/*
 * @Author: princemwang
 * @Date: 2022-08-02 17:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-17 11:06:39
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
  return (
    <TAudio src="https://1500013868.vod2.myqcloud.com/6cab5142vodcq1500013868/b6b1b12e387702304767512641/AHa2WeLyBUQA.mp3"></TAudio>
  );
};
