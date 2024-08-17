import FormData from 'form-data';

export const generateImg2Video = async (createdUrl: string) => {
  const res = await fetch(createdUrl);
  const blob = await res.blob();

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
