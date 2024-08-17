import FormData from 'form-data';

export const generateImg2Video = async () => {
  const fileRes = await fetch(
    'http://localhost:3000/api/file?path=/public/dalmi.jpeg',
  );
  const body = await fileRes.arrayBuffer();

  const blob = new Blob([body], { type: 'image/jpeg' });

  const mockData = new FormData();
  mockData.append('image', blob, 'dalmi.jpeg');
  mockData.append('seed', 0);
  mockData.append('cfg_scale', 1.8);
  mockData.append('motion_bucket_id', 127);

  const response = await fetch(
    'https://api.stability.ai/v2beta/image-to-video',
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_KEY}`,
      },
      body: mockData as unknown as BodyInit,
    },
  );

  return (await response.json()) as { id: string };
};

export const fetchGenerationResult = async (id: string) => {
  const response = await fetch(
    `https://api.stability.ai/v2beta/image-to-video/result/${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_KEY}`,
        Accept: 'video/*',
      },
    },
  );

  if (response.status === 202) {
    return await response.json();
  }

  const blob = await response.blob();

  return { id, status: 200, blob };
};
