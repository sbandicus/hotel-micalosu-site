import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const body = await request.json();
  const { roomId, guestName, email, startDate, endDate, guests } = body;

  if (!roomId || !guestName || !email || !startDate || !endDate || !guests) {
    return NextResponse.json({ error: 'Missing information' }, { status: 400 });
  }

  try {
    const bookingsPath = path.join(process.cwd(), 'src/data/bookings.json');
    const bookingsData = fs.readFileSync(bookingsPath, 'utf8');
    const bookings = JSON.parse(bookingsData);

    // Double check availability
    const startD = new Date(startDate);
    const endD = new Date(endDate);
    const isOccupied = bookings.some((booking: any) => {
      if (booking.roomId !== roomId) return false;
      const bStart = new Date(booking.startDate);
      const bEnd = new Date(booking.endDate);
      return (startD < bEnd && endD > bStart);
    });

    if (isOccupied) {
      return NextResponse.json({ error: 'Dates already booked' }, { status: 400 });
    }

    const newBooking = {
      id: Date.now().toString(),
      roomId,
      guestName,
      email,
      startDate,
      endDate,
      guests
    };

    bookings.push(newBooking);
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const bookingsPath = path.join(process.cwd(), 'src/data/bookings.json');
        const bookingsData = fs.readFileSync(bookingsPath, 'utf8');
        return NextResponse.json(JSON.parse(bookingsData));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}
