import { describe, expect, test } from 'vitest';
import { buildVariables, BuildVariablesParams } from './shared';

function makeParams(favicon: string, url = 'https://example.com/articles/page'): BuildVariablesParams {
	return {
		title: 'Test',
		author: '',
		content: '',
		contentHtml: '',
		url,
		fullHtml: '',
		description: '',
		favicon,
		image: '',
		published: '',
		site: '',
		language: 'en',
		wordCount: 0,
	};
}

describe('buildVariables favicon', () => {
	test('resolves root-relative favicon URLs against the page URL', () => {
		const vars = buildVariables(makeParams('/favicon.ico'));
		expect(vars['{{favicon}}']).toBe('https://example.com/favicon.ico');
	});

	test('resolves path-relative favicon URLs against the page URL', () => {
		const vars = buildVariables(makeParams('icons/favicon.png'));
		expect(vars['{{favicon}}']).toBe('https://example.com/articles/icons/favicon.png');
	});

	test('keeps absolute favicon URLs unchanged', () => {
		const vars = buildVariables(makeParams('https://cdn.example.net/favicon.png'));
		expect(vars['{{favicon}}']).toBe('https://cdn.example.net/favicon.png');
	});
});
