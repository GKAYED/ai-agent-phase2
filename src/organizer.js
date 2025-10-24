function categorizeByRules(item) {
  const t = `${item.title || ''} ${item.summary || ''}`.toLowerCase();
  const isCourse = /\b(course|tutorial|learn|introduction|beginner|workshop)\b/.test(t) ||
                   /coursera|edx|fast\.ai/.test(t);
  const isReading = /\b(paper|research|study|arxiv)\b/.test(t);
  const isNews = /\b(release|launch|announce|announcement)\b/.test(t) ||
                 /hacker news|techcrunch|venturebeat/.test(t);

  if (isCourse) return 'courses';
  if (isReading) return 'reading';
  if (isNews) return 'news';
  return 'reading';
}

function assignCategory(item, sourceEntry) {
  if (sourceEntry && sourceEntry.category) return sourceEntry.category;
  return categorizeByRules(item);
}

module.exports = { assignCategory };
