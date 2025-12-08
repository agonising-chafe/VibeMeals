#!/usr/bin/env tsx
/**
 * Gemini API Model Lister
 *
 * This script connects to the Gemini API and lists all available models
 * for your API key. This is useful for debugging "model not found" errors.
 *
 * Usage:
 *   npm run test:gemini
 */
import 'dotenv/config';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
async function listModels() {
    if (!GEMINI_API_KEY) {
        console.error('❌ Error: GEMINI_API_KEY is not set.');
        console.log('Please set it in your .env file or as an environment variable.');
        process.exit(1);
    }
    console.log('🔍 Fetching available Gemini models for your API key...');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            const body = await response.text();
            console.error(`\n❌ API Error: ${response.status} ${response.statusText}`);
            console.error('   Response:', body);
            if (response.status === 401 || response.status === 403) {
                console.error('\n   This looks like an invalid API key. Please double-check it.');
            }
            process.exit(1);
        }
        const data = await response.json();
        const models = (data.models || []).filter((m) => m.supportedGenerationMethods.includes('generateContent'));
        console.log('\n✅ Success! Here are the models you can use for content generation:\n');
        models.forEach((model) => {
            console.log(`  - ${model.name} (Display Name: ${model.displayName})`);
        });
        console.log('\nPick one of these model names (e.g., "models/gemini-pro") and update GEMINI_MODEL in import-recipe-url.ts.');
    }
    catch (err) {
        console.error('\n❌ A network error occurred:', err);
    }
}
listModels();
