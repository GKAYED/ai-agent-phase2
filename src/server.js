const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');
const { insertItems, getItems, toggleItem, voteItem, getStats, getTopSources, getJourneyStats } = require('./db');
const { fetchAllSources } = require('./sources/rssSource');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/fetch', async (req, res) => {
  try {
    const start = Date.now();
    const { items, errors } = await fetchAllSources(config.sources, config.manualResources);
    const count = insertItems(items);
    const duration = Date.now() - start;
    const body = { success: true, count, durationMs: duration };
    if (errors.length) body.errors = errors;
    res.json(body);
  } catch (error) {
    console.error(chalk.red('Fetch error:'), error.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/api/items', (req, res) => {
  try {
    const { category, checked } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (typeof checked !== 'undefined') filters.checked = checked;
    const items = getItems(filters);
    res.json(items);
  } catch (error) {
    console.error(chalk.red('Items error:'), error.message);
    res.status(500).json({ error: 'Failed to get items' });
  }
});

app.post('/api/items/:id/toggle', (req, res) => {
  try {
    const id = Number(req.params.id);
    const checked = toggleItem(id);
    if (checked === null) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true, checked });
  } catch (error) {
    console.error(chalk.red('Toggle error:'), error.message);
    res.status(500).json({ error: 'Failed to toggle item' });
  }
});

app.post('/api/items/:id/vote', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { type } = req.body || {};
    if (!['up', 'down'].includes(type)) return res.status(400).json({ error: 'Invalid vote type' });
    const counts = voteItem(id, type);
    if (!counts) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true, ...counts });
  } catch (error) {
    console.error(chalk.red('Vote error:'), error.message);
    res.status(500).json({ error: 'Failed to vote' });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    res.json(getStats());
  } catch (error) {
    console.error(chalk.red('Stats error:'), error.message);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.get('/api/sources/top', (req, res) => {
  try {
    res.json(getTopSources());
  } catch (error) {
    console.error(chalk.red('Top sources error:'), error.message);
    res.status(500).json({ error: 'Failed to get top sources' });
  }
});

app.get('/api/journey', (req, res) => {
  try {
    res.json(getJourneyStats());
  } catch (error) {
    console.error(chalk.red('Journey error:'), error.message);
    res.status(500).json({ error: 'Failed to get journey stats' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on http://localhost:${PORT}`));
});
