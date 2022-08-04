/*
 * @Author: princemwang
 * @Date: 2022-08-02 17:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-02 19:43:58
 */
/*
 * @Author: princemwang
 * @Date: 2022-08-01 11:28:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 17:46:39
 */
import React, { useRef } from 'react';
import { TaudioProps } from './types';
import { AudioLayout } from './audioLayout';
import { judgeChildren, renderChildren } from './utils';

const TAudio = ({
  src,
  preload = 'auto',
  crossOriginIsolated = 'true',
  children,
  ...props
}: TaudioProps) => {
  const audioRef = useRef(null);
  const element: any = children;
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
      {judgeChildren(children) ? (
        renderChildren(element)
      ) : (
        <AudioLayout audioRef={audioRef}></AudioLayout>
      )}
    </div>
  );
};
export default () => {
  return <TAudio src="https://webcast.tencent.com/assets/bensound-dreams.mp3"></TAudio>;
};
