import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const roomsPath = path.join(process.cwd(), 'src/data/rooms.json');
    const roomsData = fs.readFileSync(roomsPath, 'utf8');
    return NextResponse.json(JSON.parse(roomsData));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
