import { NextResponse } from "next/server";
import questions from "../../../data/questions.json";

export async function GET() {
  // In the future, fetch from a database here
  const segmentQuestions = questions;


  return NextResponse.json(segmentQuestions);
}