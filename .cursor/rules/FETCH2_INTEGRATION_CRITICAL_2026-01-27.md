# CRITICAL: fetch2 Integration Requirements
## ALWAYS READ THIS BEFORE WORKING ON YOUTUBE PIPELINE

**Created:** 2026-01-27 14:45 UTC  
**Priority:** CRITICAL - Missing Feature  
**Status:** Documented, awaiting implementation

---

## QUICK SUMMARY

**fetch2 (`fetch-youtube-deep-fetch`) is NOT integrated into pipeline!**
- Function EXISTS (deployed, works)
- 15 channels configured with deep_fetch=true
- Inngest workflow does NOT call it
- Result: Missing ALL content from trusted channels

---

## TWO FETCH MODES (MUST UNDERSTAND)

### fetch1: Keyword Search
- Edge Function: `fetch-youtube-videos`
- Search: "AIK" keywords across ALL YouTube
- Incremental: Global timestamp (simple)
- Excludes: deep_fetch channels (no duplicates)
- Output: `discovery_method='keyword'`

### fetch2: Deep-Fetch Trusted
- Edge Function: `fetch-youtube-deep-fetch`
- Search: ALL videos from 15 specific channels
- Incremental: PER-CHANNEL timestamp (prevents gaps)
- NO keyword requirement (captures implicit mentions)
- Output: `discovery_method='deep_fetch'`

---

## youtube_channel_config IS AN EXCEPTION LIST

**NOT a whitelist restricting search!**

```
Channel NOT in config:
  → Process normally (filters apply)

Channel IN config with is_rejected=TRUE:
  → Block immediately

Channel IN config with deep_fetch=TRUE:
  → fetch1 skips it, fetch2 fetches ALL its content
```

---

## PER-CHANNEL INCREMENTAL (fetch2 ONLY)

**fetch1:** Global timestamp (last video from ANY channel) ✅

**fetch2:** Individual timestamp per channel ✅
```
Fotbollsmorgon: 2026-01-20 (last from THIS channel)
AIK Fotboll: 2026-01-27 (last from THIS channel)
SVT Sport: 2026-01-23 (last from THIS channel)
```

**Why?** Prevents missing content gaps when channels have different schedules.

---

## IMPLEMENTATION CHECKLIST

- [ ] Create RPC: `api_public.get_channel_last_published(channel_ids[])`
- [ ] Modify fetch2 to query per-channel timestamps
- [ ] Add Step 1.5 to Inngest: Call `fetch-youtube-deep-fetch`
- [ ] Test: Verify 15 channels populated with discovery_method='deep_fetch'
- [ ] Update A1_fetch_requirements.drawio to match user draft

---

## VALIDATION QUERY

```sql
-- After integration, ALL 15 channels should show videos
SELECT 
  ycc.channel_name,
  COUNT(yvs.*) as videos,
  MAX(yvs.published_at) as last_video
FROM public.youtube_channel_config ycc
LEFT JOIN public.youtube_videos_staging yvs 
  ON yvs.youtube_channel_id = ycc.youtube_channel_id
  AND yvs.discovery_method = 'deep_fetch'
WHERE ycc.deep_fetch = true
GROUP BY ycc.channel_name;
```

Expected: All 15 channels have recent videos.

---

## DETAILED DOCS

Full requirements: `docs/FETCH2_INTEGRATION_REQUIREMENTS_2026-01-27.md`  
Implementation plan: `c:\Users\matic\.cursor\plans\integrate_fetch2_deep_fetch_b045f5b7.plan.md`  
User draft (source of truth): `docs/pipeline-analysis/user_draft_aik_youtube_video_pipeline.drawio`
