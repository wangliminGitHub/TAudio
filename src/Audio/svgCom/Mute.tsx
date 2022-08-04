/*
 * @Author: princemwang
 * @Date: 2022-07-15 15:16:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 19:28:20
 */
import React from 'react';

export const MuteSvg = ({ click }: { click?: () => void }) => {
  return (
    <svg
      className="mute-icon"
      width="26"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={click}
    >
      <g clipPath="url(#clip0_916_185)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.41681 18.6617L11.4758 20.3051C11.6382 20.4348 11.8397 20.5055 12.0474 20.5055C12.5537 20.5055 12.9643 20.0954 12.9644 19.5892V14.5006L9.41681 18.6617ZM12.9644 8.51694L6.38114 16.2387L5.46248 15.5055H0.916668C0.410406 15.5055 0 15.0951 0 14.5888V7.00154C0 6.49528 0.410406 6.08487 0.916668 6.08487L5.62192 6.08483L11.4739 1.38782C11.8687 1.0709 12.4457 1.13403 12.7626 1.52883C12.8933 1.6916 12.9644 1.89409 12.9644 2.10282V8.51694ZM16.8771 9.91128C16.9194 10.2038 16.9406 10.5005 16.9401 10.7992C16.9427 12.4516 16.2784 14.0351 15.0976 15.191C14.749 15.5435 14.7438 16.1092 15.0859 16.4681C15.4352 16.8345 16.0154 16.8484 16.3819 16.4991C17.9138 14.9985 18.7759 12.9436 18.7734 10.7992C18.7747 9.90573 18.6256 9.02653 18.3396 8.19588L16.8771 9.91128ZM15.8476 5.13511L15.0969 6.01574C15.1024 5.7773 15.2003 5.54121 15.3887 5.36586C15.5216 5.24216 15.6814 5.16549 15.8476 5.13511ZM20.6195 5.52162C21.4089 7.13967 21.8334 8.93582 21.8334 10.7993C21.8381 13.9359 20.6148 16.9499 18.4252 19.1959L18.4123 19.2092C18.0631 19.5758 18.0772 20.156 18.4437 20.5052C18.8103 20.8544 19.3905 20.8403 19.7397 20.4738C22.2413 17.9007 23.6667 14.4613 23.6667 10.7993C23.6667 8.38014 23.0454 6.05818 21.9014 4.01812L20.6195 5.52162ZM20.4662 1.93207C20.2814 1.70986 20.0893 1.49289 19.89 1.28149C19.7504 1.13623 19.5742 1.04684 19.3896 1.01416L20.4662 1.93207ZM19.3645 1.01007L18.3552 2.19394C18.2512 1.86551 18.3377 1.49195 18.6076 1.24293C18.8196 1.04746 19.0993 0.970662 19.3645 1.01007Z"
          fill="black"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.35086 21.2607C3.77096 21.6192 4.40215 21.5693 4.76067 21.1492L20.8507 2.29502C21.2092 1.87492 21.1593 1.24373 20.7392 0.885214C20.3191 0.526701 19.6879 0.57663 19.3293 0.996734L3.23934 19.8509C2.88083 20.271 2.93075 20.9022 3.35086 21.2607Z"
        fill="black"
      />
      <defs>
        <clipPath id="clip0_916_185">
          <rect width="26" height="20" fill="white" transform="translate(0 1.00006)" />
        </clipPath>
      </defs>
    </svg>
  );
};
