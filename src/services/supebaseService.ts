import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are defined before creating the client
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Fetches questions for a specific canvas segment from Supabase
 * @param {string} segment - The canvas segment name (e.g., "Customer Segments")
 * @param {string|null} userId - Optional user ID for personalized questions
 * @returns {Promise<string[]>} - Array of questions
 */
export async function fetchSegmentQuestions(segment: string | number, userId = null) {
  if (!supabase) {
    console.warn('Supabase client not initialized. Using fallback questions.');
    return null;
  }

  try {
    // Query parameters
    const query = supabase
      .from('canvas_questions')
      .select('questions')
      .eq('canvas_segment', segment);
    
    // Add user filter if provided
    if (userId) {
      query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching questions from Supabase:', error);
      return null;
    }

    // Return the questions array if data exists
    if (data && data.length > 0) {
      // Handle different types of storage in the questions field
      // It could be stored as an array or as a JSON string
      const questions = data[0].questions;
      
      if (typeof questions === 'string') {
        // If stored as a JSON string, parse it
        try {
          return JSON.parse(questions);
        } catch (e) {
          // If not valid JSON, split by newlines as fallback
          console.warn('Failed to parse questions JSON, falling back to newline split:', e);
          return questions.split('\n').filter(q => q.trim().length > 0);
        }
      }
      
      return questions;
    }

    return null;
  } catch (err) {
    console.error('Exception while fetching questions:', err);
    return null;
  }
}

/**
 * Checks if Supabase is configured and available
 * @returns {boolean} - Whether Supabase is available
 */
export function isSupabaseAvailable() {
  return supabase !== null;
}

/**
 * Helper function to create the necessary table in Supabase
 * (for development purposes only - should be done via migrations in production)
 */
export async function createQuestionsTable() {
  if (!supabase) return { success: false, error: 'Supabase not initialized' };

  const { error } = await supabase
    .from('canvas_questions')
    .insert([
      {
        canvas_segment: 'Customer Segments',
        questions: [
          'Who are your most important customers?',
          'What are the customer archetypes you target?',
          'What are their demographics, behaviors, and needs?',
          'Are you focused on mass market or niche segments?',
          'Are there distinct groups with different needs?'
        ]
      }
    ]);

  return { success: !error, error };
}