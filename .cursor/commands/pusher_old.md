# pusher

**Complete deployment workflow:**

1. **Regenerate TypeScript types** from Supabase schema (`npm run types:all`)
   - Ensures database types are synced with schema changes
   - Catches missing types (e.g., new tables/views/RPCs in api_public)
   
2. **Commit and push** changes to remote GIT repository
   - Standard git add/commit/push workflow
   
3. **Sync changes** from remote git repository
   - Pull latest changes to ensure we're up to date
   
4. **Deploy to Supabase** using MCP tools
   - Deploy migrations: `mcp_supabase_AIK_execute_sql`
   - Deploy Edge Functions: `mcp_supabase_AIK_deploy_edge_function`

**Why types first?**
- TypeScript errors are caught BEFORE commit (not after deployment)
- Prevents build errors that frontend agent (Lovable) has to fix later
- Follows fail-fast principle: fix types → commit → deploy

This command will be available in chat with /pusher
