# fitgap

**Harmonize pipeline implementation with requirements and refresh fit/gap analysis.**

---

## Agent Workflow

1. **Load pipeline documentation:**
   - `@file .cursor/rules/4_pipeline-rules.mdc [1, 80]` (INDEX)
   - `@file docs/pipeline-analysis/INDEX.md [1, 100]` (Master index)

2. **Identify target pipeline:**
   - YouTube: A1-A3 (requirements), B1-B3 (implementation), C_fitgap_analysis.md
   - News: A_news, B_news, C_news_fitgap_analysis.md

3. **Compare implementation vs requirements:**
   - Load A-series (SHOULD) and B-series (ACTUALLY) diagrams
   - Identify gaps, bottlenecks, violations
   - Check against §13 Pipeline Requirements in 4_pipeline-rules.mdc

4. **Verify 4_pipeline-rules.mdc accuracy:**
   - Load `@file .cursor/rules/4_pipeline-rules.mdc [281, 800]` (implementation sections)
   - Compare with actual Edge Function code
   - Check §DIAGRAMS section [801, 1001] references

5. **Update fit/gap analysis:**
   - Refresh C_fitgap_analysis.md or C_news_fitgap_analysis.md
   - Update bottleneck annotations
   - Recalculate impact metrics (quota, timeout, cost)

6. **Update INDEX.md:**
   - Refresh critical issues list
   - Update status (pending/deployed)
   - Recalculate expected impact

---

## Critical Checks

**Pipeline Requirements (§13 in 4_pipeline-rules.mdc):**
- ✅ Dual-track discovery (keyword + trusted channels)
- ✅ No view/like filtering (minViews = 0)
- ✅ Complete description (`full_description`, not `description`)
- ✅ European language filtering (0.5 threshold)
- ✅ Header-lineitem pattern (1 video → N segments)

**Edge Function Patterns:**
- ✅ SERVICE_ROLE_KEY (not ANON_KEY)
- ✅ Write via api_public RPC (not direct to public schema)
- ✅ JWT forwarding for user operations
- ✅ Schema qualification (always .schema('X'))

**Diagram Accuracy:**
- ✅ A-series matches requirements in 4_pipeline-rules.mdc
- ✅ B-series matches actual Edge Function code
- ✅ C-series fixes reference correct line numbers

---

## Verification Steps

### 1. YouTube Pipeline

**Fetch Phase:**
```
Load: @file supabase/functions/fetch-youtube-videos/index.ts
Compare: docs/pipeline-analysis/B1_fetch_implementation.drawio
Verify: §13.5.1 FETCH Stage requirements
Check: Trusted channels (8 channels), language filter (0.5 threshold)
```

**Transform Phase:**
```
Load: @file supabase/functions/transform-videos/index.ts
Compare: docs/pipeline-analysis/B2_transform_implementation.drawio
Verify: §13.5.2 TRANSFORM Stage requirements
Check: Segment extraction, sport-specific logic (hockey 5+ → 1 segment)
```

**Distribute Phase:**
```
Load: @file supabase/functions/distribute-segments/index.ts
Compare: docs/pipeline-analysis/B3_distribute_implementation.drawio
Verify: §13.5.3 DISTRIBUTE Stage requirements
Check: Materialized view refresh pattern
```

### 2. News Pipeline

**Full Pipeline:**
```
Load: @file supabase/functions/transform-rss-articles/index.ts
Compare: docs/pipeline-analysis/B_news_implementation.drawio
Verify: 2-source requirement, sport separation
Check: OpenRouter integration, quality gates
```

### 3. 4_pipeline-rules.mdc Accuracy

**Section-by-section verification:**
```
§13.1 Decision Tree → Compare with transform-videos logic
§13.2 Data Model → Verify schema matches DB
§13.3 Field Contracts → Check TypeScript interfaces
§13.4 Known Issues → Verify if resolved
§13.5 Stage Requirements → Match Edge Function code
§DIAGRAMS [801-1001] → Verify all paths exist
```

---

## Output Format

```
## Pipeline Harmonization Report

### YouTube Pipeline
✅ Fetch: [compliance status]
   - Bottlenecks: [list with severity]
   - Gaps: [requirements vs implementation]
   
✅ Transform: [compliance status]
   - Bottlenecks: [list with severity]
   - Gaps: [requirements vs implementation]
   
✅ Distribute: [compliance status]
   - Bottlenecks: [list with severity]
   - Gaps: [requirements vs implementation]

### News Pipeline
✅ Status: [compliance status]
   - Bottlenecks: [list with severity]
   - Gaps: [requirements vs implementation]

### 4_pipeline-rules.mdc Verification
✅ §13 Pipeline Requirements: [accurate/outdated]
✅ Edge Function Patterns: [accurate/outdated]
✅ §DIAGRAMS References: [all valid/broken links]

### Fit/Gap Analysis Updates
📝 C_fitgap_analysis.md: [updated sections]
📝 C_news_fitgap_analysis.md: [updated sections]
📝 INDEX.md: [updated metrics]

### Critical Issues (Prioritized)
1. [P0] Issue name - Impact: [quota/timeout/cost]
2. [P1] Issue name - Impact: [quota/timeout/cost]
...

### Recommended Actions
1. Fix [issue] in [file] (lines X-Y)
2. Update [diagram] to reflect [change]
3. Deploy [fix] via /pusher
```

---

## Common Issues

| Issue | Location | Fix |
|-------|----------|-----|
| Outdated bottleneck annotations | B-series diagrams | Refresh with current metrics |
| Resolved bugs still listed | §13.4 Known Issues | Move to resolved section |
| Incorrect line references | C-series fixes | Update with current line numbers |
| Broken diagram paths | §DIAGRAMS [801-1001] | Verify all files exist |
| Mismatched requirements | A-series vs §13 | Harmonize definitions |

---

## Before Running

- ✅ Ensure latest code: `git pull`
- ✅ Check Edge Functions deployed: MCP logs
- ✅ Review recent changes: `git log --oneline -10`

---

## After Running

- ✅ Verify all diagrams referenced exist
- ✅ Check fit/gap analysis has current metrics
- ✅ Ensure 4_pipeline-rules.mdc §13 matches code
- ✅ Update INDEX.md with latest status
- ✅ Use `/pusher` to commit documentation updates

---

This command will be available in chat with /fitgap
