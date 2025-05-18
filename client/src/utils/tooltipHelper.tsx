import React from 'react';
import { terminologyData } from '@/data/terminology';
import TerminologyTooltip from '@/components/TerminologyTooltip';

/**
 * Processes text content and wraps any recognized technical terms with tooltips
 * 
 * @param content The text content to process
 * @param options Configuration options
 * @returns React elements with tooltips applied to technical terms
 */
export function processTextWithTooltips(
  content: string,
  options: {
    excludeTerms?: string[];
    onlyCategories?: string[];
    maxOccurrences?: number;
  } = {}
): React.ReactNode[] {
  const { 
    excludeTerms = [], 
    onlyCategories = [],
    maxOccurrences = 1  // By default, only add tooltip to first occurrence
  } = options;
  
  // Create a map to track occurrences of each term
  const occurrenceMap = new Map<string, number>();
  
  // Filter to only the terms we want to use
  const termsToUse = terminologyData.filter(term => {
    // Skip excluded terms
    if (excludeTerms.includes(term.term)) return false;
    
    // Filter by category if specified
    if (onlyCategories.length > 0 && !onlyCategories.includes(term.category)) return false;
    
    return true;
  });
  
  // Sort terms by length (descending) to ensure longer phrases get matched first
  const sortedTerms = [...termsToUse].sort((a, b) => 
    b.term.length - a.term.length
  );
  
  // Split content by words and spaces while preserving spaces and punctuation
  const tokens: string[] = [];
  let currentToken = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (/\s/.test(char) || /[.,;:!?()'"[\]{}]/.test(char)) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = '';
      }
      tokens.push(char);
    } else {
      currentToken += char;
    }
  }
  
  if (currentToken) {
    tokens.push(currentToken);
  }
  
  // Process the tokens to add tooltips
  const result: React.ReactNode[] = [];
  let i = 0;
  
  while (i < tokens.length) {
    let matched = false;
    
    // Try to match each term
    for (const term of sortedTerms) {
      // Check if we have enough tokens left to match the term
      const termWords = term.term.split(/\s+/);
      
      if (i + termWords.length * 2 - 1 <= tokens.length) {
        // Build a potential match by combining tokens
        let potentialMatch = '';
        let validMatch = true;
        let matchTokens = [];
        
        for (let j = 0; j < termWords.length * 2 - 1; j++) {
          const tokenIndex = i + j;
          matchTokens.push(tokens[tokenIndex]);
          
          // Check if this is an expected space token between words
          if (j % 2 === 1 && !/\s/.test(tokens[tokenIndex])) {
            validMatch = false;
            break;
          }
          
          potentialMatch += tokens[tokenIndex];
        }
        
        // Check if we have a case-insensitive match
        if (validMatch && potentialMatch.trim().toLowerCase() === term.term.toLowerCase()) {
          // Track occurrences of this term
          const occurrences = occurrenceMap.get(term.term.toLowerCase()) || 0;
          
          if (occurrences < maxOccurrences) {
            // Add tooltip for this term
            result.push(
              <TerminologyTooltip
                key={`term-${i}`}
                term={term.term}
                explanation={term.explanation}
              >
                {potentialMatch}
              </TerminologyTooltip>
            );
            
            // Update occurrence count
            occurrenceMap.set(term.term.toLowerCase(), occurrences + 1);
            
            // Skip the matched tokens
            i += matchTokens.length;
            matched = true;
            break;
          }
        }
      }
    }
    
    // If no match, add the current token as is
    if (!matched) {
      result.push(tokens[i]);
      i++;
    }
  }
  
  return result;
}