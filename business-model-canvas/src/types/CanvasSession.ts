// Types
export interface SegmentItem {
    id: string;
    title: string;
    description: string;
    color: { light: string; dark: string } ; 
}

export interface CanvasSegmentData {
    items: SegmentItem[];
    questions: string[];
    key: string;
}
export interface CanvasData {
    keyPartners: CanvasSegmentData;
    keyActivities: CanvasSegmentData;
    keyResources: CanvasSegmentData;
    valuePropositions: CanvasSegmentData;
    customerRelationships: CanvasSegmentData;
    channels: CanvasSegmentData;
    customerSegments: CanvasSegmentData;
    costStructure: CanvasSegmentData;
    revenueStreams: CanvasSegmentData;
    brainStormArea: CanvasSegmentData;
}

export interface CanvasSession {
    id: string | (() => string | null) | null;
    name: string;
    created: string;
    lastModified: string;
    data: CanvasData;
}