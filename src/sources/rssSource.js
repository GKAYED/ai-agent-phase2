const Parser = require('rss-parser');
const axios = require('axios');
const { assignCategory } = require('../organizer');

const parser = new Parser();

async function fetchRssSource(source) {
  try {
    const feed = await parser.parseURL(source.url);
    const items = (feed.items || []).map((it) => {
      const title = it.title || '(untitled)';
      const url = it.link || it.guid || null;
      const summary = (it.contentSnippet || it.content || it.summary || '').toString().slice(0, 500);
      const date = it.isoDate || it.pubDate || null;
      const item = { title, url, summary, source: source.name, date };
      const category = assignCategory(item, source);
      return { ...item, category };
    });
    return { items, error: null };
  } catch (e) {
    return { items: [], error: `${source.name}: ${e.message}` };
  }
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function fetchAllSources(sources = [], manualResources = []) {
  const errors = [];
  const results = [];

  // Concurrency limit 5
  for (const group of chunk(sources, 5)) {
    const groupResults = await Promise.all(group.map(fetchRssSource));
    for (const r of groupResults) {
      if (r.error) errors.push(r.error);
      results.push(...r.items);
    }
  }

  // Map manual resources into same shape
  const manual = manualResources.map((m) => ({
    title: m.title,
    url: m.url,
    summary: m.summary || '',
    source: m.source || 'Manual',
    category: m.category || 'courses',
    date: m.date || null,
  }));

  return { items: [...manual, ...results], errors };
}

module.exports = { fetchAllSources };
