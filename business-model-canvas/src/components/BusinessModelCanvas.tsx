'use client';
import React, { useState, useEffect } from 'react';
import CanvasSegment from './CanvasSegment';
import { getCanvasSegments } from '@/services/questionsService';

/**
 * Main component for the Business Model Canvas
 */
const BusinessModelCanvas = ({ userId = null }) => {
  const [canvasData, setCanvasData] = useState({});
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch segments on component mount
  useEffect(() => {
    async function loadSegments() {
      try {
        const availableSegments = await getCanvasSegments();
        setSegments(availableSegments);
        
        // Initialize empty canvas data for each segment
        const initialData = {};
        availableSegments.forEach(segment => {
          initialData[segment] = '';
        });
        setCanvasData(initialData);
      } catch (error) {
        console.error('Failed to load canvas segments:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSegments();
  }, []);

  // Handle content change for a segment
  const handleContentChange = (segment, content) => {
    setCanvasData(prevData => ({
      ...prevData,
      [segment]: content
    }));
  };

  // Save canvas data to localStorage
  const saveCanvas = () => {
    try {
      localStorage.setItem('businessModelCanvas', JSON.stringify(canvasData));
      alert('Canvas saved successfully!');
    } catch (error) {
      console.error('Error saving canvas:', error);
      alert('Failed to save canvas.');
    }
  };

  // Load canvas data from localStorage
  const loadCanvas = () => {
    try {
      const savedData = localStorage.getItem('businessModelCanvas');
      if (savedData) {
        setCanvasData(JSON.parse(savedData));
        alert('Canvas loaded successfully!');
      } else {
        alert('No saved canvas found.');
      }
    } catch (error) {
      console.error('Error loading canvas:', error);
      alert('Failed to load canvas.');
    }
  };

  // Handle export as JSON
  const exportCanvas = () => {
    try {
      const dataStr = JSON.stringify(canvasData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'business-model-canvas.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting canvas:', error);
      alert('Failed to export canvas.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Function to get background color for each segment
  const getSegmentColor = (segment) => {
    const colorMap = {
      'Key Partners': 'bg-yellow-50',
      'Key Activities': 'bg-yellow-50',
      'Key Resources': 'bg-yellow-50',
      'Value Propositions': 'bg-blue-50',
      'Customer Relationships': 'bg-green-50',
      'Channels': 'bg-green-50',
      'Customer Segments': 'bg-green-50',
      'Cost Structure': 'bg-red-50',
      'Revenue Streams': 'bg-red-50'
    };
    
    return colorMap[segment] || 'bg-gray-50';
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Row 1 */}
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Key Partners" 
            content={canvasData['Key Partners']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Key Partners')}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Key Activities" 
            content={canvasData['Key Activities']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Key Activities')}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Value Propositions" 
            content={canvasData['Value Propositions']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Value Propositions')}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Customer Relationships" 
            content={canvasData['Customer Relationships']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Customer Relationships')}
          />
        </div>
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Customer Segments" 
            content={canvasData['Customer Segments']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Customer Segments')}
          />
        </div>

        {/* Row 2 */}
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Key Resources" 
            content={canvasData['Key Resources']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Key Resources')}
          />
        </div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-1">
          <CanvasSegment 
            title="Channels" 
            content={canvasData['Channels']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Channels')}
          />
        </div>
        <div className="md:col-span-2"></div>

        {/* Row 3 */}
        <div className="md:col-span-2">
          <CanvasSegment 
            title="Cost Structure" 
            content={canvasData['Cost Structure']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Cost Structure')}
          />
        </div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-2">
          <CanvasSegment 
            title="Revenue Streams" 
            content={canvasData['Revenue Streams']}
            onContentChange={handleContentChange}
            backgroundColor={getSegmentColor('Revenue Streams')}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessModelCanvas;
