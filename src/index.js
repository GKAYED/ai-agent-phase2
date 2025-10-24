const { Command } = require('commander');
const chalk = require('chalk');
const { insertItems, getStats } = require('./db');
const { fetchAllSources } = require('./sources/rssSource');
const config = require('./config');

const program = new Command();
program
  .name('ai-agent')
  .description('CLI for AI News & Learning Resource Aggregator')
  .version('0.2.0');

program
  .command('fetch')
  .description('Fetch new content from all sources')
  .action(async () => {
    const start = Date.now();
    try {
      const { items, errors } = await fetchAllSources(config.sources, config.manualResources);
      const count = insertItems(items);
      const ms = Date.now() - start;
      console.log(chalk.green(`Fetched ${count} new items in ${ms} ms`));
      if (errors.length) {
        console.log(chalk.yellow(`Partial errors (${errors.length}):`));
        errors.slice(0, 5).forEach((e) => console.log(chalk.yellow(`- ${e}`)));
      }
    } catch (e) {
      console.error(chalk.red('Fetch error:'), e.message);
      process.exit(1);
    }
  });

program
  .command('stats')
  .description('Show database statistics')
  .action(() => {
    const s = getStats();
    console.log(chalk.cyan(JSON.stringify(s, null, 2)));
  });

program.parse(process.argv);
