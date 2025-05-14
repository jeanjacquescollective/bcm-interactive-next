import { fetchSegmentQuestions, isSupabaseAvailable } from '@/services/supebaseService';

/**
 * Fetches questions for a specific canvas segment
 * First tries to get from Supabase (if enabled), then falls back to local JSON
 * 
 * @param {string} segment - The canvas segment name (e.g., "Customer Segments")
 * @param {string|null} userId - Optional user ID for personalized questions
 * @returns {Promise<string[]>} - Array of questions
 */
export async function getSegmentQuestions(segment, userId = null) {
  // First try Supabase if it's available
  if (isSupabaseAvailable()) {
    const supabaseQuestions = await fetchSegmentQuestions(segment, userId);
    if (supabaseQuestions) {
      return supabaseQuestions;
    }
  }

  // Fall back to local JSON file
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch local questions: ${response.status}`);
    }
    
    const data = await response.json();
    return data[segment] || [];
  } catch (error) {
    console.error('Error loading questions from local JSON:', error);
    // Return empty array as last resort
    return [];
  }
}

/**
 * Get all available canvas segments
 * @returns {Promise<string[]>} - Array of segment names
 */
export async function getCanvasSegments() {
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch segments: ${response.status}`);
    }
    
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error('Error loading segments from local JSON:', error);
    // Return default segments as fallback
    return [
      'Customer Segments',
      'Value Propositions',
      'Channels',
      'Customer Relationships',
      'Revenue Streams',
      'Key Resources',
      'Key Activities',
      'Key Partnerships',
      'Cost Structure'
    ];
  }
}
