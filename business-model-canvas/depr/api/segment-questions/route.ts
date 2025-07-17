import { NextResponse } from "next/server";
// import questions from "../../../data/questions.json";

export async function GET() {
  // In the future, fetch from a database here
  // const segmentQuestions = questions;
  const segmentQuestions = [
    {
      segment: "keyPartners",
      questions: [
        "Who are our key partners?",
        "What key activities do our partners perform?",
        "What key resources do our partners provide?",
      ],
    },
    {
      segment: "keyActivities",
      questions: [
        "What key activities do we need to perform?",
        "Which activities are most important for our value proposition?",
        "What activities are crucial for customer relationships?",
      ],
    },
    {
      segment: "keyResources",
      questions: [
        "What key resources do we need to deliver our value proposition?",
        "Which resources are critical for customer relationships?",
        "What resources are essential for revenue streams?",
      ],
    },
    // Add more segments and questions as needed
  ];

  return NextResponse.json(segmentQuestions);
}