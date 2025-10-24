module.exports = {
  sources: [
    // AI Research Papers
    { name: 'arXiv cs.AI', url: 'https://export.arxiv.org/rss/cs.AI', type: 'rss', category: 'reading' },
    { name: 'arXiv cs.LG', url: 'https://export.arxiv.org/rss/cs.LG', type: 'rss', category: 'reading' },
    { name: 'arXiv cs.CL', url: 'https://export.arxiv.org/rss/cs.CL', type: 'rss', category: 'reading' },
    { name: 'arXiv cs.CV', url: 'https://export.arxiv.org/rss/cs.CV', type: 'rss', category: 'reading' },

    // Industry Labs & Companies
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss/', type: 'rss', category: 'news' },
    { name: 'Google AI Blog', url: 'https://ai.googleblog.com/feeds/posts/default', type: 'rss', category: 'news' },
    { name: 'DeepMind Blog', url: 'https://deepmind.com/blog/feed/basic/', type: 'rss', category: 'news' },
    { name: 'Meta AI Blog', url: 'https://ai.facebook.com/blog/feed/', type: 'rss', category: 'news' },
    { name: 'Microsoft Research Blog', url: 'https://www.microsoft.com/en-us/research/feed/', type: 'rss', category: 'news' },
    { name: 'Anthropic News', url: 'https://www.anthropic.com/index/rss.xml', type: 'rss', category: 'news' },

    // News & Aggregators
    { name: 'Hacker News (AI)', url: 'https://hnrss.org/newest?q=AI+OR+ML', type: 'rss', category: 'news' },
    { name: 'Reddit r/MachineLearning', url: 'https://www.reddit.com/r/MachineLearning/.rss', type: 'rss', category: 'news' },
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', type: 'rss', category: 'news' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', type: 'rss', category: 'news' },
    { name: 'The Batch (deeplearning.ai)', url: 'https://www.deeplearning.ai/the-batch/feed/', type: 'rss', category: 'news' },
    { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed', type: 'rss', category: 'reading' },

    // Tools & Platforms
    { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', type: 'rss', category: 'reading' },
    { name: 'Papers with Code', url: 'https://paperswithcode.com/feeds/latest/', type: 'rss', category: 'reading' },
    { name: 'LangChain Blog', url: 'https://blog.langchain.dev/feed/', type: 'rss', category: 'reading' },
    { name: 'Weights & Biases Blog', url: 'https://wandb.ai/site/blog/feed/', type: 'rss', category: 'reading' }
  ],

  manualResources: [
    {
      title: 'Stanford CS229: Machine Learning',
      url: 'https://cs229.stanford.edu/',
      summary: 'Classic ML course by Andrew Ng',
      source: 'Stanford University',
      category: 'courses',
      date: '2024-01-01T00:00:00Z'
    },
    {
      title: 'MIT 6.S191: Intro to Deep Learning',
      url: 'http://introtodeeplearning.com/',
      summary: 'Practical introduction to deep learning',
      source: 'MIT',
      category: 'courses',
      date: '2024-01-01T00:00:00Z'
    },
    {
      title: 'fast.ai: Practical Deep Learning',
      url: 'https://course.fast.ai/',
      summary: 'Hands-on deep learning course',
      source: 'fast.ai',
      category: 'courses',
      date: '2024-01-01T00:00:00Z'
    },
    {
      title: 'Coursera: Deep Learning Specialization',
      url: 'https://www.coursera.org/specializations/deep-learning',
      summary: 'Curated deep learning series',
      source: 'Coursera',
      category: 'courses',
      date: '2024-01-01T00:00:00Z'
    },
    {
      title: 'Hugging Face NLP Course',
      url: 'https://huggingface.co/learn/nlp-course/',
      summary: 'NLP with Transformers',
      source: 'Hugging Face',
      category: 'courses',
      date: '2024-01-01T00:00:00Z'
    }
  ]
};
