#!/usr/bin/env tsx

/**
 * API integration test script
 * Tests all SWAPI endpoints and validates type safety
 */

import { swapiService } from '../services/api';

async function testApiIntegration(): Promise<void> {
  console.log('🧪 Starting API Integration Tests...\n');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Helper function to run a test
  const runTest = async (name: string, testFn: () => Promise<void>): Promise<void> => {
    try {
      console.log(`🔍 Testing: ${name}`);
      await testFn();
      console.log(`✅ ${name} - PASSED\n`);
      testsPassed++;
    } catch (error) {
      console.error(`❌ ${name} - FAILED`);
      console.error(`   Error: ${error instanceof Error ? error.message : String(error)}\n`);
      testsFailed++;
    }
  };
  
  // Test 1: Get Characters (paginated)
  await runTest('Get Characters (Page 1)', async () => {
    const response = await swapiService.getCharacters(1);
    
    if (!response) throw new Error('No response received');
    if (!response.results || !Array.isArray(response.results)) {
      throw new Error('Invalid results format');
    }
    if (response.results.length === 0) {
      throw new Error('No characters returned');
    }
    if (typeof response.count !== 'number') {
      throw new Error('Invalid count field');
    }
    
    console.log(`   Found ${response.results.length} characters, total: ${response.count}`);
    console.log(`   First character: ${response.results[0].name}`);
  });
  
  // Test 2: Search Characters
  await runTest('Search Characters ("luke")', async () => {
    const response = await swapiService.searchCharacters('luke');
    
    if (!response || !Array.isArray(response.results)) {
      throw new Error('Invalid search response');
    }
    
    const foundLuke = response.results.some((char: any) => 
      char.name.toLowerCase().includes('luke')
    );
    
    if (!foundLuke) {
      throw new Error('Luke not found in search results');
    }
    
    console.log(`   Found ${response.results.length} characters matching "luke"`);
    console.log(`   Characters: ${response.results.map((c: any) => c.name).join(', ')}`);
  });
  
  // Test 3: Get Specific Character
  await runTest('Get Character by ID (1 - Luke Skywalker)', async () => {
    const character = await swapiService.getCharacter(1);
    
    if (!character) throw new Error('No character returned');
    if (!character.name) throw new Error('Character missing name field');
    if (!character.url) throw new Error('Character missing url field');
    
    console.log(`   Character: ${character.name}`);
    console.log(`   Birth Year: ${character.birth_year}`);
    console.log(`   Homeworld: ${character.homeworld}`);
  });
  
  
  
  
  
  
  
  // Test 10: Test Error Handling
  await runTest('Error Handling (404)', async () => {
    try {
      await swapiService.getCharacter(99999); // Non-existent character
      throw new Error('Expected 404 error, but request succeeded');
    } catch (error: any) {
      if (error.message === 'Expected 404 error, but request succeeded') {
        throw error;
      }
      
      // This is expected - API should return an error
      console.log(`   Correctly handled error: ${error.message}`);
    }
  });
  
  
  // Summary
  console.log('📊 Test Results Summary:');
  console.log(`✅ Tests Passed: ${testsPassed}`);
  console.log(`❌ Tests Failed: ${testsFailed}`);
  console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
  
  if (testsFailed > 0) {
    console.log('\n⚠️  Some tests failed. Please check the API service configuration.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! API integration is working correctly.');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testApiIntegration().catch((error) => {
    console.error('💥 Test suite failed with error:', error);
    process.exit(1);
  });
}