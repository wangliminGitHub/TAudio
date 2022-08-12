/*
 * @Author: princemwang
 * @Date: 2022-08-02 19:39:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 14:16:36
 */
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useHover } from '../hooks';
import './style.css';

export interface AudioSpeedParams {
  audioRef: React.RefObject<HTMLAudioElement>;
  /**
   * 倍速按钮文字或者ReactElement
   */
  speedBtnText?: string;
  /**
   * 默认播放速度，值为1
   */
  defaultSpeedValue?: number;
  /**
   * 播放速率options
   */
  speedOptions?: { text: string; value: number }[];
}
const speedOption = [
  { text: '0.5x', value: 0.5 },
  { text: '1.0x', value: 1.0 },
  { text: '1.5x', value: 1.5 },
  { text: '2.0x', value: 2.0 },
];
export const AudioSpeed = ({
  audioRef,
  speedBtnText = '倍速',
  defaultSpeedValue = 1,
  speedOptions = speedOption,
}: AudioSpeedParams) => {
  const speedBtnRef = useRef<HTMLDivElement>(null);
  const controlMaskRef = useRef<HTMLDivElement>(null);
  const isHoverBtn = useHover(speedBtnRef);
  const isHoverMask = useHover(controlMaskRef);
  const [speedValue, setSpeedValue] = useState<number>(defaultSpeedValue);
  const [speedShow, setSpeedShow] = useState(false);
  const speedItemClassName = useCallback(
    (value: number) => {
      return value === speedValue;
    },
    [speedValue],
  );
  const speedItemClick = useCallback((ele: { text: string; value: number }) => {
    setSpeedValue(ele.value);
  }, []);
  useEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    audioDom.playbackRate = speedValue;
  }, [speedValue]);
  const speedText = useMemo(() => {
    const item = speedOptions.find((ele) => ele.value === speedValue);
    return item?.text || '1.0x';
  }, [speedValue, speedOptions]);
  const speedBtnClick = useCallback((event: any) => {
    setSpeedShow((val) => !val);
    if (!isMobile && event.preventDefault) {
      event.preventDefault();
    }
    return false;
  }, []);
  useEffect(() => {
    if (isMobile) return;
    const timeOut = setTimeout(() => {
      if (!isHoverBtn && !isHoverMask && speedShow) {
        setSpeedShow(false);
      }
      clearTimeout(timeOut);
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [isHoverBtn, isHoverMask, speedShow]);
  return (
    <div className="audio-speed">
      <div className="audio-speed-button" onClick={speedBtnClick} ref={speedBtnRef}>
        {speedText}
      </div>
      <div
        className="speed-mask"
        style={{ display: speedShow ? 'block' : 'none' }}
        ref={controlMaskRef}
      >
        <div className="speed-list">
          {speedOptions.map((ele) => (
            <div
              key={ele.value}
              onClick={() => {
                speedItemClick(ele);
              }}
              className={
                speedItemClassName(ele.value) ? 'speed-item speed-item-curent' : 'speed-item'
              }
            >
              {ele.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
