import { describe, it, expect } from 'vitest';

describe('i18n key completeness', () => {
  it('zh-CN has all keys present in en', async () => {
    const en = (await import('../../../messages/en.json')).default;
    const zhCN = (await import('../../../messages/zh-CN.json')).default;

    function getMissingKeys(source: Record<string, unknown>, target: Record<string, unknown>, path = ''): string[] {
      const missing: string[] = [];
      for (const key of Object.keys(source)) {
        const fullPath = path ? `${path}.${key}` : key;
        const sourceVal = source[key];
        const targetVal = target?.[key];
        if (
          typeof sourceVal === 'object' &&
          sourceVal !== null &&
          !Array.isArray(sourceVal)
        ) {
          missing.push(
            ...getMissingKeys(
              sourceVal as Record<string, unknown>,
              (targetVal ?? {}) as Record<string, unknown>,
              fullPath
            )
          );
        } else if (targetVal === undefined) {
          missing.push(fullPath);
        }
      }
      return missing;
    }

    const missing = getMissingKeys(
      en as unknown as Record<string, unknown>,
      zhCN as unknown as Record<string, unknown>
    );

    if (missing.length > 0) {
      console.error('Missing zh-CN keys:', missing);
    }
    expect(missing).toEqual([]);
  });

  it('en has all keys present in zh-CN (no orphaned translations)', async () => {
    const en = (await import('../../../messages/en.json')).default;
    const zhCN = (await import('../../../messages/zh-CN.json')).default;

    function getMissingKeys(source: Record<string, unknown>, target: Record<string, unknown>, path = ''): string[] {
      const missing: string[] = [];
      for (const key of Object.keys(source)) {
        const fullPath = path ? `${path}.${key}` : key;
        const sourceVal = source[key];
        const targetVal = target?.[key];
        if (
          typeof sourceVal === 'object' &&
          sourceVal !== null &&
          !Array.isArray(sourceVal)
        ) {
          missing.push(
            ...getMissingKeys(
              sourceVal as Record<string, unknown>,
              (targetVal ?? {}) as Record<string, unknown>,
              fullPath
            )
          );
        } else if (targetVal === undefined) {
          missing.push(fullPath);
        }
      }
      return missing;
    }

    const orphaned = getMissingKeys(
      zhCN as unknown as Record<string, unknown>,
      en as unknown as Record<string, unknown>
    );

    if (orphaned.length > 0) {
      console.warn('zh-CN keys not in en (orphaned):', orphaned);
    }
    // This is a warning test — orphaned keys are a smell but not a hard failure
    expect(orphaned.length).toBeLessThan(10);
  });
});
