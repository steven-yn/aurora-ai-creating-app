import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import fs from 'node:fs';

export async function GET(
  req: NextRequest,
  // { params }: { params: { path: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const pathQuery = searchParams.get('path');

  return new Response(fs.readFileSync(`.${pathQuery}` || './'), {
    status: 200,
  });
}
