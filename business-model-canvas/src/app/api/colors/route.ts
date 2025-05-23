import { NextResponse } from 'next/server';

const COLORS = [
    "#2563eb", // blue-600
    "#16a34a", // green-600
    "#d97706", // amber-600
    "#dc2626", // red-600
    "#7c3aed", // violet-600
    "#0891b2", // cyan-600
];


export async function GET() {
    return NextResponse.json(COLORS);
}