const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'resources.db');

let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    dbInstance = new Database(DB_PATH);
    initDatabase();
  }
  return dbInstance;
}

function initDatabase() {
  const db = dbInstance;
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT,
      summary TEXT,
      source TEXT,
      category TEXT NOT NULL,
      date TEXT,
      checked INTEGER DEFAULT 0,
      upvotes INTEGER DEFAULT 0,
      downvotes INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_category ON items(category);
    CREATE INDEX IF NOT EXISTS idx_checked ON items(checked);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_url ON items(url) WHERE url IS NOT NULL;
  `);
}

function insertItems(items) {
  const db = getDb();
  const insert = db.prepare(`
    INSERT OR IGNORE INTO items (title, url, summary, source, category, date, checked, upvotes, downvotes)
    VALUES (@title, @url, @summary, @source, @category, @date, 0, 0, 0)
  `);
  const transaction = db.transaction((rows) => {
    let count = 0;
    for (const row of rows) {
      const info = insert.run(row);
      if (info.changes > 0) count++;
    }
    return count;
  });
  return transaction(items);
}

function getItems(filters = {}) {
  const db = getDb();
  const clauses = [];
  const params = {};

  if (filters.category) {
    clauses.push('category = @category');
    params.category = filters.category;
  }
  if (typeof filters.checked !== 'undefined') {
    clauses.push('checked = @checked');
    params.checked = Number(filters.checked);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const sql = `SELECT id, title, url, summary, source, category, date, checked, upvotes, downvotes, created_at
               FROM items ${where}
               ORDER BY date DESC NULLS LAST, id DESC`;
  return db.prepare(sql).all(params);
}

function toggleItem(id) {
  const db = getDb();
  const update = db.prepare('UPDATE items SET checked = 1 - checked WHERE id = ?');
  const select = db.prepare('SELECT checked FROM items WHERE id = ?');
  const info = update.run(id);
  if (info.changes === 0) return null;
  const row = select.get(id);
  return row ? row.checked : null;
}

function voteItem(id, type) {
  const db = getDb();
  let sql;
  if (type === 'up') sql = 'UPDATE items SET upvotes = upvotes + 1 WHERE id = ?';
  else if (type === 'down') sql = 'UPDATE items SET downvotes = downvotes + 1 WHERE id = ?';
  else return null;
  const info = db.prepare(sql).run(id);
  if (info.changes === 0) return null;
  return db.prepare('SELECT upvotes, downvotes FROM items WHERE id = ?').get(id);
}

function getStats() {
  const db = getDb();
  const total = db.prepare('SELECT COUNT(*) AS c FROM items').get().c;
  const checked = db.prepare('SELECT COUNT(*) AS c FROM items WHERE checked = 1').get().c;
  const news = db.prepare("SELECT COUNT(*) AS c FROM items WHERE category = 'news'").get().c;
  const courses = db.prepare("SELECT COUNT(*) AS c FROM items WHERE category = 'courses'").get().c;
  const reading = db.prepare("SELECT COUNT(*) AS c FROM items WHERE category = 'reading'").get().c;
  return { total, checked, news, courses, reading };
}

function getTopSources(limit = 10) {
  const db = getDb();
  const sql = `
    SELECT source, COALESCE(SUM(upvotes),0) - COALESCE(SUM(downvotes),0) AS netVotes
    FROM items
    GROUP BY source
    ORDER BY netVotes DESC
    LIMIT ?
  `;
  return db.prepare(sql).all(limit);
}

function getJourneyStats() {
  const db = getDb();
  const totalChecked = db.prepare('SELECT COUNT(*) AS c FROM items WHERE checked = 1').get().c;
  const milestones = [5, 10, 20, 50, 100].map((m) => ({ count: m, achieved: totalChecked >= m }));
  return { totalChecked, milestones };
}

module.exports = {
  getDb,
  insertItems,
  getItems,
  toggleItem,
  voteItem,
  getStats,
  getTopSources,
  getJourneyStats,
};
