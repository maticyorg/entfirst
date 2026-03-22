# pusher

**Complete deployment: Types → Commit → Push → Deploy**

---

## Agent Workflow

Execute in order:

1. **`npm run types:all`** (catch type errors BEFORE commit)
2. **`git add . && git commit -m "message"`** (descriptive message)
3. **`git push`** (to origin/main)
4. **`git pull`** (sync, skip if just pushed)
5. **Deploy to Supabase via MCP:**
   - Migrations: `mcp_supabase_AIK_apply_migration({ name, query })`
   - Edge Functions: `mcp_supabase_AIK_deploy_edge_function({ name, entrypoint_path: "index.ts", verify_jwt: true, files })`

---

## Critical Rules

**Type Generation:**
- Must include BOTH `public` AND `api_public` schemas
- Use `npm run types:all` (NOT `npx supabase gen types`)

**MCP Deployment:**
- ✅ Use MCP tools (production)
- ❌ Never `npx supabase db push` (requires Docker, local only)

**Edge Functions:**
- Always `verify_jwt: true` (unless custom auth)
- Always forward JWT: `{ global: { headers: { Authorization: authHeader }}}`

---

## Before Running

- ✅ Review: `git status` and `git diff`
- ✅ Check: ReadLints (if applicable)
- ✅ Verify: Edge Function JWT forwarding (if modified)

---

## After Running

- ✅ Verify: Types generated (`src/types/supabase.ts`)
- ✅ Check: Git push succeeded
- ✅ Verify: Supabase deployment (check logs if errors)

---

## Common Errors

| Error | Solution |
|-------|----------|
| Types missing api_public | Use `npm run types:all` |
| Git push rejected | Pull first, resolve conflicts |
| MCP connection failed | Check Supabase project status |
| Edge Function timeout | Check JWT forwarding (core-rules.mdc §0.5) |

---

## Output Format

```
1. ✅ Types generated
2. ✅ Committed: "message"
3. ✅ Pushed to origin/main
4. ✅ Synced
5. ✅ Deployed: [migrations/functions]
✅ Deployment complete!
```

---

This command will be available in chat with /pusher
