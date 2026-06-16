import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!roomId || !start || !end) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const bookingsPath = path.join(process.cwd(), 'src/data/bookings.json');
    const bookingsData = fs.readFileSync(bookingsPath, 'utf8');
    const bookings = JSON.parse(bookingsData);

    const startDate = new Date(start);
    const endDate = new Date(end);

    const isOccupied = bookings.some((booking: any) => {
      if (booking.roomId !== roomId) return false;
      const bStart = new Date(booking.startDate);
      const bEnd = new Date(booking.endDate);
      
      return (startDate < bEnd && endDate > bStart);
    });

    return NextResponse.json({ available: !isOccupied });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}
