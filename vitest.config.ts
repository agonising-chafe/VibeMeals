import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/domain/__tests__/**/*.spec.ts'],
    environment: 'node',
  },
});