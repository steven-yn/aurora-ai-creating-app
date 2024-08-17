'use client';
import StoreProvider from '@/app/StoreProvider';
import ImportImage from '@/components/edit/ImportImage/ImportImage';
import GenerateVideo from '@/components/prompt/stability/GenerateVideo';
import React from 'react';

const Img2Video = () => {
  return (
    <StoreProvider>
      <div className="px-4">
        이미지로 동영상 생성하기
        <ImportImage>
          <GenerateVideo />
        </ImportImage>
      </div>
    </StoreProvider>
  );
};

export default Img2Video;
