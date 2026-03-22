# therules

**Verify implementation follows `.cursor/rules/1_quick.mdc` hierarchical structure.**

---

## Agent Workflow

1. Load `@file .cursor/rules/1_quick.mdc [1, 100]` (INDEX)
2. Identify relevant rules file:
   - **WHAT** (requirements) → `3_requirements.mdc`
   - **HOW** (implementation) → `2_core-rules.mdc` or `4_pipeline-rules.mdc`
   - **WHY** (history) → `5_advanced-rules.mdc`
   - **VISUAL** (diagrams) → `4_pipeline-rules.mdc [801, 1001]` (§DIAGRAMS)
3. Load that file's INDEX (first ~50 lines)
4. Load ONLY relevant section
5. Check compliance, report violations with examples

---

## Critical Rules (Check These)

**Schema Qualification:**
- ❌ `FROM video_segments_feed` 
- ✅ `FROM api_public.video_segments_feed`

**Edge Functions JWT:**
- ❌ `createClient(URL, KEY)`
- ✅ `createClient(URL, KEY, { global: { headers: { Authorization: authHeader }}})`

**Frontend Schema:**
- ❌ `.from('youtube_videos_staging')`
- ✅ `.schema('api_public').from('video_segments_feed')`

**Type Generation:**
- ❌ `npx supabase gen types`
- ✅ `npm run types:all`

**MCP (Production):**
- ❌ `npx supabase db push`
- ✅ `mcp_supabase_AIK_execute_sql`

**Diagrams:**
- ❌ Load .drawio files
- ✅ Load `docs/pipeline-analysis/INDEX.md`

---

## Quick Reference

| Issue | File | Section |
|-------|------|---------|
| Schema errors | 2_core-rules.mdc | §1 |
| RLS | 2_core-rules.mdc | §5 |
| Edge Functions | 2_core-rules.mdc | §0.5 |
| Pipeline | 3_requirements.mdc | §R1 |
| Diagrams | 4_pipeline-rules.mdc | §DIAGRAMS [801-1001] |
| Types | 2_core-rules.mdc | §0.7 |

---

## Output Format

```
✅ Compliance: [list what follows rules]
❌ Violations: [list with code examples]
💡 Fixes: [specific corrections with line refs]
```

---

This command will be available in chat with /therules
