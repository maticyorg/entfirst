# deltasync

**Incrementally sync rules with code changes since last run.**

---

## Agent Workflow

1. **Read sync log:** `@file .cursor/.therules_sync.log`
   - Get last_run timestamp and last_commit hash

2. **Get commits since last run:**
   ```bash
   git log last_commit..HEAD --name-only --pretty=format:"%H|%ai|%s"
   ```

3. **Analyze changed files:**
   - Parse each commit's changed files
   - Apply file mapping rules (see below)
   - Identify affected rules sections

4. **Detect conflicts:**
   - For each affected rules file: `git diff last_commit..HEAD -- .cursor/rules/X.mdc`
   - If rules file modified manually → Show diff, request merge decision
   - If no conflict → Prepare update suggestion

5. **Map changes to rules sections:**
   - Edge Functions → `4_pipeline-rules.mdc` §13
   - Migrations → `2_core-rules.mdc` §8-9
   - Frontend → `2_core-rules.mdc` §12
   - Commands → `1_quick.mdc` QUICK REFERENCE
   - Types → `2_core-rules.mdc` §0.7

6. **Generate update suggestions:**
   - Load affected rules sections
   - Compare with current implementation
   - Suggest specific updates with line numbers

7. **Update sync log:**
   - Add entry to history array
   - Update last_run timestamp
   - Update last_commit hash

---

## File Mapping Rules

| Changed Files | Target Rules | Section | Lines |
|---------------|-------------|---------|-------|
| `supabase/functions/fetch-youtube-videos/*` | 4_pipeline-rules.mdc | §13.5.1 Fetch | 281-380 |
| `supabase/functions/transform-videos/*` | 4_pipeline-rules.mdc | §13.5.2 Transform | 381-520 |
| `supabase/functions/distribute-segments/*` | 4_pipeline-rules.mdc | §13.5.3 Distribute | 521-620 |
| `supabase/functions/transform-rss-articles/*` | 4_pipeline-rules.mdc | News Pipeline | Check §13 |
| `supabase/migrations/*.sql` | 2_core-rules.mdc | §8-9 Migrations | Check §8-9 |
| `src/**/*.tsx` (frontend) | 2_core-rules.mdc | §12 Frontend | Check §12 |
| `.cursor/commands/*.md` | 1_quick.mdc | QUICK REFERENCE | Line ~305 |
| `src/types/supabase.ts` | 2_core-rules.mdc | §0.7 Types | Check §0.7 |

---

## Conflict Detection

**Check for manual edits:**
```bash
git diff last_commit..HEAD -- .cursor/rules/*.mdc
```

**If conflicts found:**
- Show diff with context
- List conflicting sections
- Request merge decision:
  - "Keep manual changes (skip auto-update)"
  - "Apply suggested update (overwrite manual)"
  - "Show me both (manual merge)"

**If no conflicts:**
- Proceed with update suggestions

---

## Output Format

```
## Rules Delta Sync Report

### Sync Window
Last run: [timestamp] (commit: [hash])
Current: [timestamp] (commit: [hash])

### Commits Analyzed ([N] commits)
1. [hash] - [message]
2. [hash] - [message]
...

### Changes Detected

**Edge Functions:**
- fetch-youtube-videos/index.ts (lines X-Y changed)
  → Affects: 4_pipeline-rules.mdc §13.5.1 [281-380]

**Migrations:**
- 20260121000000_*.sql (new migration)
  → Affects: 2_core-rules.mdc §8-9

**Commands:**
- .cursor/commands/fitgap.md (new command)
  → Affects: 1_quick.mdc QUICK REFERENCE [~305]

### Conflicts Detected

⚠️ Manual changes in 2_core-rules.mdc since last sync
   - Lines 145-160 modified
   - Conflict with suggested update to §8
   - Action: Review diff below

### Update Suggestions

📝 1_quick.mdc (Line ~305):
```
ADD to QUICK REFERENCE table:
| **Pipeline harmonization (FITGAP)** | **pipeline-rules.mdc** | **§13 + §DIAGRAMS** | **Ladda INDEX först** |
```

📝 4_pipeline-rules.mdc (Lines 381-520):
```
UPDATE §13.5.2 Transform Stage:
- Add note about [specific change]
- Update code example at line 420
```

### Recommended Actions
1. Review conflicts (if any)
2. Apply suggested updates to rules files
3. Run /therules to verify compliance
4. Commit with /pusher
5. Sync log will update automatically on next run
```

---

## Common Scenarios

| Scenario | Detection | Action |
|----------|-----------|--------|
| New Edge Function deployed | File in `supabase/functions/` | Update 4_pipeline-rules.mdc §13 |
| Migration added | File in `supabase/migrations/` | Update 2_core-rules.mdc §8-9 |
| Frontend pattern changed | File in `src/` | Update 2_core-rules.mdc §12 |
| New command added | File in `.cursor/commands/` | Update 1_quick.mdc table |
| Types regenerated | `src/types/supabase.ts` | Verify 2_core-rules.mdc §0.7 |
| Rules manually edited | `.cursor/rules/*.mdc` | Show diff, request merge |

---

## Before Running

- ✅ Ensure latest code: `git pull`
- ✅ Check sync log exists: `.cursor/.therules_sync.log`
- ✅ Review recent commits: `git log --oneline -10`

---

## After Running

- ✅ Review suggested updates (don't auto-apply)
- ✅ Resolve conflicts if any (manual merge)
- ✅ Apply updates to rules files
- ✅ Verify with `/therules`
- ✅ Commit with `/pusher`
- ✅ Sync log updates automatically on next run

---

This command will be available in chat with /deltasync
