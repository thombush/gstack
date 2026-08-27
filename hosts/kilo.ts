import { defineHost, CROSS_MODEL_RESOLVERS, GBRAIN_RESOLVERS } from './define-host';

const kilo = defineHost({
  name: 'kilo',
  displayName: 'Kilo',
  cliCommand: 'kilo',

  // Kilo's tool names are lowercase (bash/read/write/edit/grep/glob), same set
  // as Claude's but lowercase, so rewrite the prose to match.
  localSkillRoot: '.kilo/skills/gstack',
  hostSubdir: '.kilo',

  extraPathRewrites: [
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],

  toolRewrites: {
    'use the Bash tool': 'use the bash tool',
    'use the Write tool': 'use the write tool',
    'use the Read tool': 'use the read tool',
    'use the Edit tool': 'use the edit tool',
    'use the Grep tool': 'use the grep tool',
    'use the Glob tool': 'use the glob tool',
    'the Bash tool': 'the bash tool',
    'the Read tool': 'the read tool',
    'the Write tool': 'the write tool',
    'the Edit tool': 'the edit tool',
    'the Grep tool': 'the grep tool',
    'the Glob tool': 'the glob tool',
  },

  suppressedResolvers: [...CROSS_MODEL_RESOLVERS, ...GBRAIN_RESOLVERS],
});

export default kilo;
