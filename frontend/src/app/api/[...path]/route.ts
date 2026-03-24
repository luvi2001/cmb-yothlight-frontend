import { NextRequest, NextResponse } from 'next/server';

export async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = (params.path || []).join('/');
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(
          Array.from(req.headers.entries()).filter(([key]) =>
            !['host', 'connection'].includes(key.toLowerCase())
          )
        ),
      },
      body: req.method !== 'GET' ? await req.text() : undefined,
    });

    return NextResponse.json(await response.json(), {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
