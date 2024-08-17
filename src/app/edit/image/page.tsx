'use client';

import StoreProvider from '@/app/StoreProvider';
import React from 'react';
import ImportImage from '@/components/edit/ImportImage/ImportImage';
import ImageEditor from '@/components/edit/ImageEditor/ImageEditor';

const Image = () => {
  return (
    <StoreProvider>
      <div className="px-4">
        이미지 편집하기
        <ImportImage>
          <ImageEditor />
        </ImportImage>
      </div>
    </StoreProvider>
  );
};

export default Image;
