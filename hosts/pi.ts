import { defineHost, CROSS_MODEL_RESOLVERS, GBRAIN_RESOLVERS } from './define-host';

const pi = defineHost({
  name: 'pi',
  displayName: 'Pi',
  cliCommand: 'pi',
  defaultModel: 'deepseek',

  // Pi follows the Agent Skills standard and reads skills from `.pi/skills/`
  // (project) and `~/.pi/agent/skills/` (global). Emit to a Pi-specific
  // subdir so its tool-name rewrites stay independent of the shared
  // `.agents/skills/` tree that Codex also reads.
  globalRoot: '.pi/agent/skills/gstack',
  localSkillRoot: '.pi/skills/gstack',
  hostSubdir: '.pi',

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.pi/agent/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.pi/skills/gstack' },
    { from: '.claude/skills', to: '.pi/skills' },
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],

  // Pi's built-in tools are lowercase read/write/edit/bash/grep/find/ls.
  toolRewrites: {
    'use the Bash tool': 'use the bash tool',
    'use the Write tool': 'use the write tool',
    'use the Read tool': 'use the read tool',
    'use the Edit tool': 'use the edit tool',
    'use the Grep tool': 'use the grep tool',
    'use the Glob tool': 'use the find tool',
    'the Bash tool': 'the bash tool',
    'the Read tool': 'the read tool',
    'the Write tool': 'the write tool',
    'the Edit tool': 'the edit tool',
    'the Grep tool': 'the grep tool',
    'the Glob tool': 'the find tool',
  },

  suppressedResolvers: [...CROSS_MODEL_RESOLVERS, ...GBRAIN_RESOLVERS],
});

export default pi;
