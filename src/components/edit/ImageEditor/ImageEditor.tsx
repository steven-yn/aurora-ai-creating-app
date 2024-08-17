'use client';

import { RootState } from '@/store';
import { setEditSize, setEditedImage } from '@/store/edit/imageData';
import { Button, Input, Spacer } from '@nextui-org/react';
import React, { Ref, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 768, height: 768 });

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSize((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  return (
    <>
      <div className="flex items-center gap-3">
        width:
        <Input
          type="number"
          value={size.width.toString()}
          onChange={handleSizeChange}
        />
        height:
        <Input
          type="number"
          value={size.height.toString()}
          onChange={handleSizeChange}
        />
        <ImageEditor.Crop width={size.width} height={size.height} />
        <ImageEditor.Download />
      </div>
      <Spacer y={5} />
      <ImageEditor.Canvas canvasRef={canvasRef} />
    </>
  );
};

interface CropProps {
  width: number;
  height: number;
}

const Crop = ({ width, height }: CropProps) => {
  const dispatch = useDispatch();
  const handleCrop = () => {
    dispatch(setEditSize({ width, height }));
  };
  return <Button onClick={handleCrop}>crop</Button>;
};

const Download = () => {
  const editedImage = useSelector((state: RootState) => state.imageData.edited);

  return (
    <Button as="a" href={editedImage.url} download="image.png">
      download
    </Button>
  );
};

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef }: CanvasProps) => {
  const dispatch = useDispatch();
  const editSize = useSelector((state: RootState) => state.imageData.editSize);
  const clientReceivedImage = useSelector(
    (state: RootState) => state.imageData.clientReceived,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!clientReceivedImage.url || !canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(clientReceivedImage.url, 'clientReceivedImage.url');
    console.log(canvas, 'canvas');
    console.log(ctx, 'ctx');

    const image = new Image();
    image.src = clientReceivedImage.url;

    image.onload = () => {
      const widthRatio = editSize.width / image.width;
      const heightRatio = editSize.height / image.height;
      const scaleRatio = Math.min(widthRatio, heightRatio);

      const newWidth = image.width * scaleRatio;
      const newHeight = image.height * scaleRatio;

      canvas.width = editSize.width;
      canvas.height = editSize.height;

      const offsetX = (editSize.width - newWidth) / 2;
      const offsetY = (editSize.height - newHeight) / 2;

      ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);

      // URL.revokeObjectURL(clientReceivedImage.url);

      dispatch(setEditedImage({ url: canvas.toDataURL('image/png') }));
    };
  }, [editSize, clientReceivedImage]);

  return (
    <canvas width={editSize.width} height={editSize.height} ref={canvasRef} />
  );
};

ImageEditor.Canvas = Canvas;
ImageEditor.Crop = Crop;
ImageEditor.Download = Download;

export default ImageEditor;
