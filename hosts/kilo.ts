import { defineHost, CROSS_MODEL_RESOLVERS, GBRAIN_RESOLVERS } from './define-host';

const kilo = defineHost({
  name: 'kilo',
  displayName: 'Kilo',
  cliCommand: 'kilo',

  // Kilo's tool names mirror Claude's (Read/Edit/Write/Bash/Grep/Glob), so no
  // tool-name rewrites are needed — only the config paths and AGENTS.md.
  localSkillRoot: '.kilo/skills/gstack',
  hostSubdir: '.kilo',

  extraPathRewrites: [
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],

  suppressedResolvers: [...CROSS_MODEL_RESOLVERS, ...GBRAIN_RESOLVERS],
});

export default kilo;
