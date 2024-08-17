'use client';
import { RootState } from '@/store';
import {
  imageDataBlobMap,
  setClientReceivedImage,
} from '@/store/edit/imageData';
import { Button, Card, CardBody, Input, Textarea } from '@nextui-org/react';
import React, { DragEventHandler, PropsWithChildren, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageEditor from '../ImageEditor/ImageEditor';

const ImportImage = ({ children }: PropsWithChildren) => {
  const clientReceivedImage = useSelector(
    (state: RootState) => state.imageData.clientReceived,
  );

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full h-full min-h-[360px]">
        <CardBody>
          <ImportImage.ByDrag>
            {!clientReceivedImage.url && '여기에 이미지를 드래그 해주세요'}
            {clientReceivedImage.url && children}
          </ImportImage.ByDrag>
        </CardBody>
      </Card>
      <ImportImage.ByFileInput />
    </div>
  );
};

const ByDrag = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          setClientReceivedImage({
            url: reader.result as string,
          }),
        );

        imageDataBlobMap.set(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };

  const handleDragLeave: DragEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full text-slate-400"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {children}
    </div>
  );
};

const ByFileInput = () => {
  const dispatch = useDispatch();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    dispatch(
      setClientReceivedImage({
        url: imageUrl,
      }),
    );

    imageDataBlobMap.set(imageUrl, file);
  };

  return (
    <Input
      type="file"
      onChange={(e) => {
        handleFileChange(e);
      }}
    />
  );
};

ImportImage.ByDrag = ByDrag;
ImportImage.ByFileInput = ByFileInput;

export default ImportImage;
