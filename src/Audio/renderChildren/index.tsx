/*
 * @Author: princemwang
 * @Date: 2022-08-01 12:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 14:18:20
 */
import React from 'react';
export const RenderChildren = (children: React.ReactElement) => {
  return React.Children.map(children, (child) => {
    console.log(child, 'child');
    return React.cloneElement(child, {});
  });
};
