---
name: News Pipeline Analysis & Fixes
overview: "Comprehensive analysis and fixes for the news/article pipeline: add health logging, create documentation diagrams, evaluate OpenRouter quality, and implement 2-source requirement with sport separation."
todos:
  - id: todo_1_add_news_to_health_log
    content: Add 'news' pipeline type to pipeline_health_log table and update process-rss-pipeline to log health metrics
    status: completed
  - id: todo_2_analyze_current_news_pipeline
    content: Analyze current news pipeline implementation (fetch-rss-articles, transform-rss-articles, distribute-rss-articles)
    status: completed
  - id: todo_3_create_news_requirements_diagram
    content: Create A_news_requirements.drawio diagram (WHAT news pipeline should do)
    status: completed
  - id: todo_4_create_news_implementation_diagram
    content: Create B_news_implementation.drawio diagram (HOW it actually works, with bottlenecks)
    status: completed
  - id: todo_5_create_fitgap_analysis
    content: Create C_news_fitgap_analysis.md comparing requirements vs implementation
    status: completed
  - id: todo_6_evaluate_openrouter_quality
    content: "Evaluate OpenRouter quality: Check published articles, fact-check accuracy, citation quality"
    status: completed
  - id: todo_7_implement_2_source_requirement
    content: Implement 2-source requirement with sport separation (never mix football/hockey articles)
    status: completed
  - id: todo_8_update_documentation
    content: Update docs/pipeline-analysis/INDEX.md to include news pipeline documentation
    status: completed
isProject: false
---

# News Pipeline Analysis & Fixes

## ✅ Rule Compliance Check

This plan follows `.cursor/rules/1_quick.mdc` and related rule files:

### Critical Rules Applied:

**§0 Absoluta krav (quick.mdc):**

- ✅ All SQL uses schema-qualification (`public.X`, `api_public.Y`)
- ✅ Only additive migrations (no DROP/RENAME)
- ✅ Frontend reads via `api_public` only
- ✅ No manual type generation (will use `npm run types:all`)

**§0.5 Edge Functions (quick.mdc):**

- ✅ JWT forwarding pattern: `createClient(URL, KEY, { global: { headers: { Authorization: authHeader }}})`
- ✅ Schema-qualified queries: `.schema('api_public')`
- ✅ No direct writes to `public` from Edge Functions

**§0.8 MCP Workflow (quick.mdc):**

- ✅ Use MCP tools: `mcp_supabase_AIK_execute_sql`, `mcp_supabase_AIK_apply_migration`, `mcp_supabase_AIK_deploy_edge_function`
- ✅ NEVER use `npx supabase` (requires local Docker)
- ✅ Production = remote only

**§8-9 Migrations (core-rules.mdc):**

- ✅ Migration naming: `YYYYMMDDHHMMSS_descriptive_name.sql`
- ✅ Idempotent: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`
- ✅ BEGIN/COMMIT wrapping
- ✅ Comments explaining purpose

**§5.5 Security Definer Exceptions (core-rules.mdc):**

- ✅ `evaluate_news_publish_gate` uses SECURITY DEFINER (writes to internal tables)
- ✅ `log_pipeline_health` uses SECURITY DEFINER (writes to internal tables)
- ✅ SET search_path for security

### Idempotency Guarantee:

All changes are **fully idempotent** and can be run multiple times safely:

**Migrations:**

- ✅ `DO $$ BEGIN ... END $$` blocks with existence checks
- ✅ `CREATE OR REPLACE FUNCTION` (not `CREATE FUNCTION`)
- ✅ `DROP CONSTRAINT IF EXISTS` before `ADD CONSTRAINT`
- ✅ No `ALTER TABLE ... ADD COLUMN` (column already exists)
- ✅ No `CREATE TABLE` (table already exists)

**Edge Functions:**

- ✅ Code additions are additive (new try-catch blocks)
- ✅ No removal of existing code
- ✅ Can deploy multiple times without breaking

**Documentation:**

- ✅ File creation is idempotent (overwrite if exists)
- ✅ No destructive operations

**Test Queries:**

- ✅ Read-only SELECT statements
- ✅ Can run unlimited times

### Deterministic Implementation:

All steps are **deterministic** and **testable**:

1. Each migration has clear schema-qualified SQL
2. Each Edge Function change has specific file path and code location
3. Each test has expected output that can be verified via SQL query
4. Each git commit has specific message format
5. Each MCP deployment has verification query

### /pusher Workflow Integration:

After each major step:

1. Write code/SQL
2. Deploy via MCP
3. Test via SQL queries
4. Commit to git with descriptive message
5. Push to remote
6. Verify deployment

## Current State

The news pipeline consists of:

- **fetch-rss-articles**: Fetches from 24 RSS feeds (sports + general news)
- **transform-rss-articles**: 3-phase AI processing using OpenRouter Auto
                          - Phase 1: Merge articles (OpenRouter Auto)
                          - Phase 2: Enrich content (OpenRouter Auto)  
                          - Phase 3: Fact-check with citations (OpenRouter Auto)
- **distribute-rss-articles**: Publish gate check → `aik_published_news`
- **process-rss-pipeline**: Orchestrates all 3 phases

**Problems identified:**

1. ❌ No health logging (not in `pipeline_health_log`)
2. ❌ No documentation (no diagrams like YouTube pipeline has)
3. ❓ Unknown OpenRouter quality/effectiveness post-migration
4. ❌ No 2-source requirement (single articles get published)
5. ❌ Risk of mixing sports (football + hockey articles merged)

## Phase 1: Health Logging & Current State Analysis

### 1.1 Add News to Pipeline Health Log

**Migration:** `supabase/migrations/20260120000000_add_news_to_pipeline_health.sql`

```sql
-- Migration: Add 'news' pipeline type to pipeline_health_log
-- Date: 2026-01-20
-- Purpose: Enable health logging for news/article pipeline
-- REGLER (per .cursor/rules/2_core-rules.mdc §0):
-- 1) Endast additiva ändringar
-- 2) Schema-kvalificera alla objekt
-- 3) Idempotent (IF NOT EXISTS, IF EXISTS)

BEGIN;

-- Update CHECK constraint to include 'news'
-- Note: Must DROP and recreate constraint (PostgreSQL limitation)
-- Idempotent: Check if constraint exists before dropping
DO $$
BEGIN
  -- Drop existing constraint if it exists
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'pipeline_health_log_pipeline_type_check'
      AND conrelid = 'public.pipeline_health_log'::regclass
  ) THEN
    ALTER TABLE public.pipeline_health_log 
    DROP CONSTRAINT pipeline_health_log_pipeline_type_check;
  END IF;

  -- Add new constraint (will fail if already exists, but we just dropped it)
  ALTER TABLE public.pipeline_health_log 
  ADD CONSTRAINT pipeline_health_log_pipeline_type_check 
  CHECK (pipeline_type IN ('youtube', 'rss', 'podcast', 'news'));
END $$;

COMMENT ON CONSTRAINT pipeline_health_log_pipeline_type_check ON public.pipeline_health_log IS
'Allowed pipeline types: youtube (video pipeline), rss (legacy RSS), podcast (Spotify), news (article pipeline with OpenRouter AI)';

COMMIT;
```

**Verification Query (via MCP):**

```sql
-- Verify constraint was updated
SELECT 
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.pipeline_health_log'::regclass
  AND conname = 'pipeline_health_log_pipeline_type_check';

-- Expected output: CHECK constraint includes 'news'
```

**Update:** `supabase/functions/process-rss-pipeline/index.ts`

Add health logging at end of pipeline (after line ~183):

```typescript
// After pipeline completes (add before final return statement)
// Log pipeline health (per .cursor/rules/1_quick.mdc §0.8 MCP Workflow)
try {
  const warnings = [];
  const errors = results.errors.map(e => ({ 
    message: e, 
    stage: 'pipeline',
    timestamp: new Date().toISOString()
  }));

  // Schema-qualified RPC call (per §0.5 Edge Functions)
  const { data: healthId, error: healthError } = await supabase
    .rpc('log_pipeline_health', {
      p_pipeline_type: 'news',
      p_trigger_source: trigger_source,
      p_fetch_count: results.step0_fetch?.articlesStored || 0,
      p_transform_count: results.step1_transform?.articlesProcessed || 0,
      p_distribute_count: results.step2_distribute?.articlesPublished || 0,
      p_warnings: warnings,
      p_errors: errors,
      p_duration_seconds: duration,
      p_metadata: results
    });

  if (healthError) {
    console.error('[PIPELINE] Failed to log health:', healthError);
  } else {
    console.log(`[PIPELINE] Health logged with ID: ${healthId}`);
  }
} catch (healthLogError) {
  // Don't fail pipeline if health logging fails
  console.error('[PIPELINE] Health logging exception:', healthLogError);
}
```

**Verification:**

1. Deploy via MCP: `mcp_supabase_AIK_deploy_edge_function('process-rss-pipeline')`
2. Trigger pipeline manually or wait for cron
3. Query: `SELECT * FROM public.pipeline_health_log WHERE pipeline_type = 'news' ORDER BY run_timestamp DESC LIMIT 1;`
4. Expected: Row with fetch_count, transform_count, distribute_count populated

### 1.2 Analyze Current Implementation

Query production data to understand:

- How many articles fetched vs processed vs published?
- What's the rejection rate at publish gate?
- Which OpenRouter models are actually being used?
- Average cost per article?

```sql
-- Check recent pipeline runs
SELECT * FROM public.pipeline_health_log 
WHERE pipeline_type = 'news' 
ORDER BY run_timestamp DESC LIMIT 10;

-- Check OpenRouter usage
SELECT 
  phase1_model, phase2_model, phase3_model,
  COUNT(*) as article_count,
  AVG(total_tokens) as avg_tokens,
  SUM(total_cost_usd) as total_cost
FROM public.aik_news_articles
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY phase1_model, phase2_model, phase3_model;

-- Check publish gate rejection reasons
SELECT 
  gate_fail_reasons->>'reason' as reason,
  COUNT(*) as count
FROM public.aik_news_review_queue
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY gate_fail_reasons->>'reason';
```

## Phase 2: Documentation (Following YouTube Pipeline Pattern)

Create 3 documents in `docs/pipeline-analysis/`:

### 2.1 A_news_requirements.drawio

**WHAT the news pipeline SHOULD do** (requirements-based):

```
[RSS Feeds (24 sources)] 
    ↓
[Fetch Phase]
  - Fetch last 7 days
  - Deduplicate by content_hash
  - Filter by relevance (AIK mentions)
    ↓
[Transform Phase - 3 AI Phases]
  Phase 1 (Merge): Combine overlapping articles
    - Group by topic/event
    - NEVER mix sports (football ≠ hockey)
    - Require ≥2 sources per merged article
    - Copyright check
  Phase 2 (Enrich): Add context
  Phase 3 (Fact-check): Citations + verification
    ↓
[Distribute Phase - Publish Gate]
  ✓ Body not NULL
  ✓ Body not "CANNOT PROVIDE"
  ✓ Length ≥ 200 chars
  ✓ Copyright = 'OK'
  ✓ Citations ≥ 2
  ✓ Relevance ≥ 6
    ↓
[aik_published_news] → Frontend
```

**Requirements notes:**

- 2-source minimum (prevent single-source articles)
- Sport separation (football vs hockey are separate topics)
- Quality gates (copyright, citations, relevance)

### 2.2 B_news_implementation.drawio

**HOW it ACTUALLY works** (with bottlenecks highlighted):

```
[RSS Feeds: 24 sources]
    ↓
[fetch-rss-articles]
  - Fetches all feeds (no AIK filter yet)
  - Stores in articles_staging
  ⚠️ BOTTLENECK 1: Fetches non-AIK articles (wasted bandwidth)
    ↓
[transform-rss-articles]
  Phase 1 (OpenRouter Auto):
    - Merges articles (but HOW? By what criteria?)
    ⚠️ BOTTLENECK 2: No 2-source requirement enforced
    ⚠️ BOTTLENECK 3: May mix football + hockey articles
    - Scrapes full article content (15s timeout)
    ⚠️ BOTTLENECK 4: Sequential scraping (blocking)
  Phase 2 (OpenRouter Auto):
    - Enriches content
  Phase 3 (OpenRouter Auto):
    - Fact-checks with citations
    ⚠️ BOTTLENECK 5: Sequential AI calls (3 × 5-10s = 15-30s per article)
    ↓
[distribute-rss-articles]
  - Runs publish gate checks
  - Publishes to aik_published_news
  - Rejects to aik_news_review_queue
    ↓
[aik_published_news] → Frontend
```

**Bottlenecks identified:**

1. No AIK filter in fetch (fetches all articles)
2. No 2-source requirement in merge phase
3. Sport mixing risk (football + hockey)
4. Sequential article scraping (blocking)
5. Sequential AI processing (3 phases × multiple articles)

### 2.3 C_news_fitgap_analysis.md

**Detailed comparison:** Requirements vs Implementation

Structure:

- Executive Summary (root causes)
- Fetch Phase fit/gap table
- Transform Phase fit/gap table
- Distribute Phase fit/gap table
- Recommended fixes (prioritized P0/P1/P2)
- Testing scenarios
- Success metrics

## Phase 3: OpenRouter Quality Evaluation

### 3.1 Check Published Articles Quality

Query last 50 published articles:

```sql
SELECT 
  pn.id,
  pn.title,
  pn.published_at,
  pn.view_count,
  jsonb_array_length(pn.citations) as citation_count,
  na.relevance_score,
  na.copyright_check,
  na.phase1_model,
  na.phase2_model,
  na.phase3_model,
  na.total_cost_usd
FROM public.aik_published_news pn
JOIN public.aik_news_articles na ON pn.news_article_id = na.id
WHERE pn.published_at > NOW() - INTERVAL '7 days'
ORDER BY pn.published_at DESC
LIMIT 50;
```

**Quality checks:**

- ✓ Are citations real and relevant?
- ✓ Is fact-checking accurate?
- ✓ Is copyright check working? (any false positives?)
- ✓ Are articles well-written and coherent?
- ✓ Do they have proper AIK context?

### 3.2 Check Rejection Rate

```sql
-- Articles in review queue (failed gate)
SELECT 
  gate_fail_reasons,
  COUNT(*) as count
FROM public.aik_news_review_queue
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY gate_fail_reasons;

-- Success rate
SELECT 
  COUNT(CASE WHEN pn.id IS NOT NULL THEN 1 END) as published,
  COUNT(CASE WHEN rq.id IS NOT NULL THEN 1 END) as rejected,
  ROUND(100.0 * COUNT(CASE WHEN pn.id IS NOT NULL THEN 1 END) / COUNT(*), 1) as success_rate
FROM public.aik_news_articles na
LEFT JOIN public.aik_published_news pn ON pn.news_article_id = na.id
LEFT JOIN public.aik_news_review_queue rq ON rq.news_article_id = na.id
WHERE na.created_at > NOW() - INTERVAL '7 days';
```

### 3.3 Cost Analysis

```sql
-- OpenRouter cost breakdown
SELECT 
  DATE(created_at) as date,
  COUNT(*) as articles_processed,
  AVG(total_tokens) as avg_tokens,
  SUM(total_cost_usd) as total_cost_usd,
  AVG(total_cost_usd) as avg_cost_per_article
FROM public.aik_news_articles
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## Phase 4: Implement 2-Source Requirement with Sport Separation

### 4.1 Update Transform Phase 1 Logic

**File:** `supabase/functions/transform-rss-articles/index.ts`

**Current Phase 1 prompt** (needs update):

```typescript
// BEFORE: Merges any overlapping articles
const phase1Prompt = `Merge these articles about AIK...`;
```

**NEW Phase 1 prompt** (with constraints):

```typescript
const phase1Prompt = `
You are merging Swedish news articles about AIK (football or hockey club).

CRITICAL RULES:
1. ONLY merge if you have AT LEAST 2 source articles about the SAME event/topic
2. NEVER mix different sports (football articles ONLY with football, hockey ONLY with hockey)
3. If only 1 article exists on a topic, return "INSUFFICIENT_SOURCES"
4. If articles are about different sports, return "SPORT_MISMATCH"

Articles to merge:
${articles.map(a => `[${a.source_name}] ${a.title}: ${a.summary}`).join('\n\n')}

Sport detection:
- Football keywords: fotboll, allsvenskan, superettan, AIK Fotboll, Friends Arena
- Hockey keywords: hockey, hockeyallsvenskan, SHL, AIK Hockey, Hovet

Output format:
{
  "can_merge": true/false,
  "reason": "INSUFFICIENT_SOURCES" | "SPORT_MISMATCH" | "OK",
  "sport": "football" | "hockey" | "other",
  "source_count": number,
  "merged_article": "...",
  "aik_mentions": [...],
  "copyright_check": "OK" | "CONCERNS_FLAGGED"
}
`;
```

### 4.2 Add Pre-Merge Grouping Logic

**Before calling OpenRouter**, group articles by:

1. Sport (football vs hockey vs other)
2. Topic similarity (using keywords/embeddings)

```typescript
// Group articles by sport
const footballArticles = articles.filter(a => detectSport(a) === 'football');
const hockeyArticles = articles.filter(a => detectSport(a) === 'hockey');

// Only process groups with ≥2 articles
const processableGroups = [
  { sport: 'football', articles: footballArticles },
  { sport: 'hockey', articles: hockeyArticles }
].filter(g => g.articles.length >= 2);

// Process each group separately
for (const group of processableGroups) {
  const result = await callOpenRouter(phase1Prompt, group.articles);
  if (result.can_merge && result.source_count >= 2) {
    // Proceed to Phase 2
  } else {
    // Skip (mark as INSUFFICIENT_SOURCES)
  }
}
```

### 4.3 Update Publish Gate

**Migration:** `supabase/migrations/20260120000001_add_source_count_gate.sql`

```sql
-- Migration: Add 2-source requirement to news publish gate
-- Date: 2026-01-20
-- Purpose: Enforce minimum 2 sources per article (prevent single-source articles)
-- REGLER (per .cursor/rules/2_core-rules.mdc §0):
-- 1) Endast additiva ändringar (CREATE OR REPLACE)
-- 2) Schema-kvalificera alla objekt
-- 3) SECURITY DEFINER för writes till internal tables

BEGIN;

-- Update publish gate to require ≥2 sources
CREATE OR REPLACE FUNCTION api_public.evaluate_news_publish_gate(
  p_news_article_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'api_public', 'pg_temp'
AS $$
DECLARE
  article_record RECORD;
  source_count integer;
BEGIN
  -- Fetch article from operational table (schema-qualified)
  SELECT * INTO article_record
  FROM public.aik_news_articles
  WHERE id = p_news_article_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'ARTICLE_NOT_FOUND',
      'message', 'Article does not exist'
    );
  END IF;

  -- Count sources (NEW: 2-source requirement)
  source_count := jsonb_array_length(COALESCE(article_record.original_sources, '[]'::jsonb));

  IF source_count < 2 THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'INSUFFICIENT_SOURCES',
      'message', format('Article has only %s source(s), minimum 2 required', source_count),
      'source_count', source_count
    );
  END IF;

  -- Existing checks (body, copyright, citations, relevance)
  IF article_record.body IS NULL OR btrim(article_record.body) = '' THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'EMPTY_BODY',
      'message', 'Article body is empty'
    );
  END IF;

  IF article_record.body ILIKE 'CANNOT PROVIDE%' THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'AI_FAILURE',
      'message', 'AI failed to generate article'
    );
  END IF;

  IF length(COALESCE(article_record.body, '')) < 200 THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'BODY_TOO_SHORT',
      'message', format('Article body is %s chars, minimum 200 required', length(article_record.body))
    );
  END IF;

  IF article_record.copyright_check != 'OK' THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'COPYRIGHT_CONCERNS',
      'message', 'Copyright check flagged concerns'
    );
  END IF;

  IF article_record.moderation_flag = true THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'MODERATION_FLAG',
      'message', 'Article flagged by moderation'
    );
  END IF;

  IF article_record.citations IS NULL OR jsonb_array_length(article_record.citations) < 2 THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'INSUFFICIENT_CITATIONS',
      'message', 'Article must have at least 2 citations'
    );
  END IF;

  IF article_record.relevance_score IS NULL OR article_record.relevance_score < 6 THEN
    RETURN jsonb_build_object(
      'can_publish', false,
      'reason', 'LOW_RELEVANCE',
      'message', format('Relevance score %s is below minimum 6', COALESCE(article_record.relevance_score, 0))
    );
  END IF;

  -- All checks passed
  RETURN jsonb_build_object(
    'can_publish', true,
    'reason', 'OK',
    'message', 'Article passed all publish gate checks',
    'source_count', source_count
  );
END;
$$;

REVOKE ALL ON FUNCTION api_public.evaluate_news_publish_gate(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION api_public.evaluate_news_publish_gate(uuid) TO service_role;

COMMENT ON FUNCTION api_public.evaluate_news_publish_gate IS
'Evaluate if news article can be published. Returns jsonb with can_publish (bool) and reason.
NEW: Requires ≥2 sources per article (prevents single-source articles).
SECURITY DEFINER to read from internal aik_news_articles table.';

COMMIT;
```

**Verification Query (via MCP):**

```sql
-- Test with single-source article (should fail)
SELECT api_public.evaluate_news_publish_gate(
  (SELECT id FROM public.aik_news_articles 
   WHERE jsonb_array_length(original_sources) = 1 
   LIMIT 1)
);
-- Expected: {"can_publish": false, "reason": "INSUFFICIENT_SOURCES"}

-- Test with multi-source article (should pass if other checks OK)
SELECT api_public.evaluate_news_publish_gate(
  (SELECT id FROM public.aik_news_articles 
   WHERE jsonb_array_length(original_sources) >= 2 
   LIMIT 1)
);
-- Expected: {"can_publish": true, "reason": "OK"} or other gate failure
```

## Phase 5: Testing & Validation

### Test Scenarios

**Scenario 1: 2 Football Articles (Same Event)**

- Input: 2 articles about "AIK vs Hammarby match"
- Expected: Merged into 1 article, published

**Scenario 2: 1 Football Article (Isolated)**

- Input: 1 article about "AIK signs new player"
- Expected: Skipped (INSUFFICIENT_SOURCES), not published

**Scenario 3: 1 Football + 1 Hockey Article**

- Input: 1 football article + 1 hockey article
- Expected: Both skipped (SPORT_MISMATCH), not merged

**Scenario 4: 3 Hockey Articles (Same Event)**

- Input: 3 articles about "AIK Hockey wins championship"
- Expected: Merged into 1 article, published

## Success Metrics

### Must-Have (Phase 1)

- News pipeline logs to `pipeline_health_log`
- Documentation diagrams created (A, B, C)
- OpenRouter quality evaluated (report generated)

### Must-Have (Phase 2)

- 2-source requirement enforced (no single-source articles published)
- Sport separation working (no football+hockey mixing)
- Publish gate updated with source count check

### Should-Have

- Rejection rate < 30% (most articles pass gate)
- Citation quality verified (real sources)
- Cost per article < $0.10 USD

## Files to Modify

1. `supabase/migrations/20260120000000_add_news_to_pipeline_health.sql` (new)
2. `supabase/migrations/20260120000001_add_source_count_gate.sql` (new)
3. `supabase/functions/process-rss-pipeline/index.ts` (add health logging)
4. `supabase/functions/transform-rss-articles/index.ts` (add 2-source + sport separation)
5. `docs/pipeline-analysis/A_news_requirements.drawio` (new)
6. `docs/pipeline-analysis/B_news_implementation.drawio` (new)
7. `docs/pipeline-analysis/C_news_fitgap_analysis.md` (new)
8. `docs/pipeline-analysis/INDEX.md` (update with news pipeline links)

## Idempotency Checklist

Before executing any step, verify:

### Migration Idempotency:

- Uses `DO $$ BEGIN ... END $$` for conditional logic
- Uses `IF EXISTS` checks before DROP operations
- Uses `CREATE OR REPLACE` for functions/views
- No `CREATE TABLE` without `IF NOT EXISTS`
- No `ALTER TABLE ADD COLUMN` without `IF NOT EXISTS`
- Wrapped in `BEGIN; ... COMMIT;` transaction

### Edge Function Idempotency:

- Code changes are additive only
- No removal of existing functionality
- New code wrapped in try-catch (won't break existing flow)
- Can deploy multiple times to same function

### Test Idempotency:

- All test queries are read-only (SELECT)
- No INSERT/UPDATE/DELETE in tests
- Tests verify state, don't modify state

### Verification:

Run each migration/deployment **twice** to confirm idempotency:

1. First run: Should succeed
2. Second run: Should succeed with no errors
3. State should be identical after both runs

## Implementation Order

### CRITICAL: Follow /therules and /pusher workflow

**Per quick.mdc §0 Absoluta krav:**

- ✅ ALLTID schema-kvalificera (public.X, api_public.Y)
- ✅ Endast additiva ändringar (no DROP/RENAME)
- ✅ Use MCP for production (mcp_supabase_AIK_execute_sql, mcp_supabase_AIK_deploy_edge_function)
- ✅ NEVER use npx supabase (requires local Docker)

**Per quick.mdc §0.8 MCP Workflow:**

1. Write migration SQL files
2. Deploy via MCP: `mcp_supabase_AIK_apply_migration`
3. Deploy Edge Functions via MCP: `mcp_supabase_AIK_deploy_edge_function`
4. Test in production
5. Commit & push to git

### Deterministic Implementation Steps

**Step 1: Add Health Logging (DETERMINISTIC)**

1. Create migration file: `supabase/migrations/20260120000000_add_news_to_pipeline_health.sql`
  - Schema-qualified: `ALTER TABLE public.pipeline_health_log`
  - Additive only: Add 'news' to CHECK constraint
2. Deploy via MCP: `mcp_supabase_AIK_apply_migration`
3. Update `supabase/functions/process-rss-pipeline/index.ts`:
  - Add health logging call at end
  - Schema-qualified RPC: `supabase.rpc('log_pipeline_health', ...)`
4. Deploy via MCP: `mcp_supabase_AIK_deploy_edge_function`
5. Test: Trigger pipeline, verify log entry in `public.pipeline_health_log`
6. Commit & push to git

**Step 2: Analyze Current State (READ-ONLY QUERIES)**

1. Query via MCP: `mcp_supabase_AIK_execute_sql`
  - Check OpenRouter model usage
  - Check rejection rates
  - Check costs
2. Document findings in analysis report
3. No git commit (read-only analysis)

**Step 3: Create Documentation (DETERMINISTIC)**

1. Create `docs/pipeline-analysis/A_news_requirements.drawio`
  - DrawIO XML format (same as YouTube pipeline)
  - Requirements-based flow diagram
2. Create `docs/pipeline-analysis/B_news_implementation.drawio`
  - DrawIO XML format
  - Implementation with bottlenecks highlighted
3. Create `docs/pipeline-analysis/C_news_fitgap_analysis.md`
  - Markdown format
  - Fit/gap table structure
4. Update `docs/pipeline-analysis/INDEX.md`
  - Add news pipeline section
5. Commit & push to git

**Step 4: Evaluate OpenRouter Quality (READ-ONLY + REPORT)**

1. Query published articles via MCP
2. Manual quality review (citations, fact-checking, coherence)
3. Document findings in quality report
4. Commit report to git

**Step 5: Implement 2-Source Requirement (DETERMINISTIC)**

1. Create migration: `supabase/migrations/20260120000001_add_source_count_gate.sql`
  - Schema-qualified: `api_public.evaluate_news_publish_gate`
  - SECURITY DEFINER (per §5.5 exceptions)
  - Add source count check
2. Deploy via MCP: `mcp_supabase_AIK_apply_migration`
3. Update `supabase/functions/transform-rss-articles/index.ts`:
  - Add sport detection function
  - Add pre-merge grouping logic
  - Update Phase 1 prompt with 2-source requirement
  - Schema-qualified queries: `supabase.schema('api_public')`
4. Deploy via MCP: `mcp_supabase_AIK_deploy_edge_function`
5. Test scenarios (1-4 from Phase 5)
6. Commit & push to git

**Step 6: Test & Validate (DETERMINISTIC)**

1. Run test scenario 1: 2 football articles (same event)
  - Expected: Merged, published
2. Run test scenario 2: 1 football article (isolated)
  - Expected: Skipped (INSUFFICIENT_SOURCES)
3. Run test scenario 3: 1 football + 1 hockey
  - Expected: Both skipped (SPORT_MISMATCH)
4. Run test scenario 4: 3 hockey articles (same event)
  - Expected: Merged, published
5. Verify via queries: Check `public.pipeline_health_log`, `public.aik_published_news`
6. Document test results
7. Commit test report to git

### /pusher Workflow (After Each Step)

```bash
# After completing each implementation step:
git add .
git commit -m "feat(news-pipeline): [step description]"
git push origin main

# MCP deployment already done in steps above
# Verify deployment via MCP queries
```

### Success Criteria (DETERMINISTIC CHECKS)

**Must-Have (Phase 1):**

- Query returns rows: `SELECT * FROM public.pipeline_health_log WHERE pipeline_type = 'news'`
- Files exist: `docs/pipeline-analysis/A_news_requirements.drawio`, `B_news_implementation.drawio`, `C_news_fitgap_analysis.md`
- Quality report exists with ≥50 article reviews

**Must-Have (Phase 2):**

- Query returns 0: `SELECT COUNT(*) FROM public.aik_published_news pn JOIN public.aik_news_articles na ON pn.news_article_id = na.id WHERE jsonb_array_length(na.original_sources) < 2`
- Test scenario 2 result: Article NOT published (verify in `public.aik_news_review_queue`)
- Test scenario 3 result: Both articles NOT merged (verify separate entries or skipped)

**Should-Have:**

- Query returns <30%: `SELECT rejection_rate FROM (rejection rate query)`
- Manual review: ≥90% of citations are real and relevant
- Query returns <$0.10: `SELECT AVG(total_cost_usd) FROM public.aik_news_articles WHERE created_at > NOW() - INTERVAL '7 days'`

