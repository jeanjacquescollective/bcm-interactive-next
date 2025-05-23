import { NextResponse } from "next/server";

export async function GET() {
  // In the future, fetch from a database here
  const segmentQuestions = {
    keyPartners: [
      "Who are our key partners?",
      "Which key resources do our partners provide?",
      "Which key activities do partners perform?"
    ],
    keyActivities: [
      "What key activities do our value propositions require?",
      "What activities are most important for distribution channels, customer relationships, revenue streams?"
    ],
    keyResources: [
      "What key resources do our value propositions require?",
      "Which resources are most important for distribution channels, customer relationships, revenue streams?"
    ],
    valuePropositions: [
      "What value do we deliver to the customer?",
      "Which customer needs are we satisfying?",
      "What bundles of products and services are we offering?"
    ],
    customerRelationships: [
      "What type of relationship do we want to establish with our customers?",
      "How are they integrated with the rest of our business model?",
      "How costly are they?"
    ],
    channels: [
      "Through which channels do we reach our customers?",
      "Which channels work best?",
      "How are we integrating them with customer routines?"
    ],
    customerSegments: [
      "Who are our customers?",
      "Which customers are most important?",
      "What are the characteristics of our target segments?"
    ],
    costStructure: [
      "What are the most important costs in our business model?",
      "Which key resources and activities are most expensive?"
    ],
    revenueStreams: [
      "For what value are our customers willing to pay?",
      "How are they currently paying?",
      "How would they prefer to pay?"
    ],
  };

  return NextResponse.json(segmentQuestions);
}