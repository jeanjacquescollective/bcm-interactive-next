// Types
export interface SegmentItem {
    id: number;
    title: string;
    description: string;
    color: string;
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
    id: number;
    name: string;
    created: string;
    lastModified: string;
    data: CanvasData;
}