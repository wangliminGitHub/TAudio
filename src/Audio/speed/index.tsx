import React, { useMemo, useCallback } from 'react';
import './style.css';

export interface AudioSpeedParams {
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
  speedBtnText = '倍速',
  defaultSpeedValue = 1,
  speedOptions = speedOption,
}: AudioSpeedParams) => {
  const speedItemClassName = useCallback(
    (value: number) => {
      return value === defaultSpeedValue;
    },
    [defaultSpeedValue],
  );
  return (
    <div className="audio-speed">
      <div className="audio-speed-button">{speedBtnText}</div>
      <div className="speed-mask">
        <div className="speed-list">
          {speedOptions.map((ele) => (
            <div
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
