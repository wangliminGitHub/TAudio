/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:27:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 17:30:16
 */
import React from 'react';
import { AudioBtn } from '../audioBtn';
import { PlayTime } from '../playTime';
import { Progress } from '../progress';
import { Volume } from '../volume';
import { AudioSpeed } from '../speed';
import './style.css';

export const AudioLayout = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  return (
    <div className="t-audio-layout">
      <div className="t-progress">
        <Progress audioRef={audioRef}></Progress>
      </div>
      <div className="t-audio-control">
        <div className="control-left">
          <div className="t-audio-btn">
            <AudioBtn audioRef={audioRef}></AudioBtn>
          </div>
          <div className="t-audio-palytime" style={{ marginLeft: '10px' }}>
            <PlayTime audioRef={audioRef}></PlayTime>
          </div>
        </div>
        <div className="control-right">
          <div className="t-audio-speed" style={{ marginRight: '30px' }}>
            <AudioSpeed audioRef={audioRef}></AudioSpeed>
          </div>
          <div className="t-audio-volume">
            <Volume audioRef={audioRef}></Volume>
          </div>
        </div>
      </div>
    </div>
  );
};
