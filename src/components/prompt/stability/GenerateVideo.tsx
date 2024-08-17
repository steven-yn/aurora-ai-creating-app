'use client';

import { fetchGenerationResult, generateImg2Video } from '@/services/stablilty';
import { RootState } from '@/store';
import { Button } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const GenerateVideo = () => {
  const count = useRef(0);
  const timer = useRef<NodeJS.Timeout>();
  const [videoFile, setVideoFile] = useState();
  const [videoId, setVideoId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const clientReceivedImage = useSelector(
    (state: RootState) => state.imageData.clientReceived,
  );

  const postGenerateImg2Video = async () => {
    const res = await generateImg2Video(clientReceivedImage.url);

    setVideoId(res.id);
  };

  const getVideo = async (id: string) => {
    const res = await fetchGenerationResult(id);

    if (res.status === 200) {
      console.log(videoFile, 'videoFile');
      setVideoFile(res.blob);

      return;
    }

    timer.current = setTimeout(() => {
      getVideo(id);
      console.log(res, `not yet retry:${count.current++}`);
    }, 10500);
  };

  useEffect(() => {
    if (videoId) getVideo(videoId);
  }, [videoId]);

  useEffect(() => {
    if (videoFile) {
      setVideoUrl(URL.createObjectURL(videoFile));
    }
  }, [videoFile]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex gap-3">
        <Button onClick={postGenerateImg2Video}>generate video</Button>
        <Button
          onClick={() => {
            getVideo(videoId);
          }}
        >
          get video
        </Button>
        <Button
          onClick={() => {
            if (timer.current) {
              clearTimeout(timer.current);
            }
          }}
        >
          remove timer
        </Button>
      </div>
      <img src={clientReceivedImage.url} />
      {videoUrl && (
        <>
          <video src={videoUrl} controls></video>
          <Button
            as="a"
            className="text-slate-100"
            href={videoUrl}
            download="video.mp4"
          >
            동영상 다운로드
          </Button>
        </>
      )}
    </div>
  );
};

export default GenerateVideo;
