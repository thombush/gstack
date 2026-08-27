import { defineHost, CROSS_MODEL_RESOLVERS } from './define-host';

const hermes = defineHost({
  name: 'hermes',
  displayName: 'Hermes',

  // Model-agnostic: Hermes runs whatever model the user points it at (DeepSeek
  // today, GLM tomorrow), so bake the universal generic overlay rather than a
  // model-specific one. Pass --model <family> to regenerate with specific tuning.
  defaultModel: 'generic',

  // Hermes discovers skills by recursively walking ~/.hermes/skills/ (unlike
  // Claude/Codex/Pi, which read skills/<name>/SKILL.md at one level). A
  // whole-repo runtime root symlinked into the skills dir would be followed by
  // that walk and re-discover the committed Claude-format SKILL.md files as
  // duplicate skills. So the runtime root lives OUTSIDE the skills tree, at the
  // recognized ~/.gstack/repos/gstack location (already in gstack-team-init's
  // probe list); only generated gstack-* skills live under ~/.hermes/skills/.
  globalRoot: '.gstack/repos/gstack',

  // Hermes-native frontmatter: name + description (agentskills core) plus the
  // fields Hermes skills carry — version, platforms, and metadata.hermes tags
  // for native categorization. The extraFields serializer JSON-encodes the
  // nested metadata block into valid YAML.
  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    extraFields: {
      version: '2.0.0',
      platforms: ['linux', 'macos', 'windows'],
      metadata: {
        hermes: {
          tags: ['gstack', 'workflow', 'ai-tools'],
        },
      },
    },
  },

  extraPathRewrites: [
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],
  toolRewrites: {
    'use the Bash tool': 'use the terminal tool',
    'use the Write tool': 'use the patch tool',
    'use the Read tool': 'use the read_file tool',
    'use the Edit tool': 'use the patch tool',
    'use the Agent tool': 'use delegate_task',
    'use the Grep tool': 'search for',
    'use the Glob tool': 'find files matching',
    'the Bash tool': 'the terminal tool',
    'the Read tool': 'the read_file tool',
    'the Write tool': 'the patch tool',
    'the Edit tool': 'the patch tool',
  },

  suppressedResolvers: [
    ...CROSS_MODEL_RESOLVERS,
    // GBRAIN_CONTEXT_LOAD and GBRAIN_SAVE_RESULTS are NOT suppressed.
    // The resolvers handle GBrain-not-installed gracefully ("proceed without brain context").
    // If Hermes has GBrain as a mod, brain features activate automatically.
  ],

  coAuthorTrailer: 'Co-Authored-By: Hermes Agent <agent@nousresearch.com>',
});

export default hermes;
