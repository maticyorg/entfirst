# waterfall

**Execute a full waterfall CR cycle using subagents.**

You are now the **Project Manager**. Read your full instructions from
`.cursor/agents/project-manager.md` FIRST, then execute the waterfall below.

---

## IMMEDIATE ACTION: Execute this sequence

You MUST use the **Task tool** to delegate to subagents. Each phase launches a
subagent, waits for its result, inspects the deliverable, then proceeds or sends back.

### Step 0: Parse the CR

Read the user's CR/requirement provided after this command.
If they reference a plan file, read that file.
Summarize the requirement in 2-3 sentences.

### Step 1: ARCHITECT

Use the Task tool to delegate to the architect subagent:

```
Task tool call:
  subagent_type: "architect"
  description: "Architecture and design for CR"
  prompt: |
    You are the architect. Read your instructions from .cursor/agents/architect.md.

    CR REQUIREMENT:
    <paste the parsed requirement here>

    YOUR TASK:
    1. Read .cursor/rules/1_quick.mdc and relevant rule files
    2. Search current dev docs for all components involved
    3. Assess current database state via MCP (list_tables, execute_sql)
    4. Produce: impact analysis + design document + migration plan
    5. Check rule compliance
    6. Return your complete design to the Project Manager
```

**INSPECT** the architect's response:
- Does the design solve the requirement?
- Is the impact analysis complete?
- Does it comply with /therules?

If insufficient → use Task tool to **resume** the architect with corrections.
If approved → proceed to Step 2.

### Step 2: DEVAGENT

Use the Task tool to delegate to the devagent subagent:

```
Task tool call:
  subagent_type: "devagent"
  description: "Implement the approved design"
  prompt: |
    You are the devagent. Read your instructions from .cursor/agents/devagent.md.

    APPROVED DESIGN:
    <paste the architect's approved design here>

    ORIGINAL REQUIREMENT:
    <paste the requirement>

    YOUR TASK:
    1. Read .cursor/rules/1_quick.mdc and relevant rule files
    2. Search current dev docs for all components you will touch
    3. Implement the design: migrations, Edge Functions, frontend changes
    4. All changes must be non-destructive and idempotent
    5. Deploy via MCP (apply_migration, deploy_edge_function, etc.)
    6. Verify deployed objects exist and work (quick SELECT, list_migrations, etc.)
    7. Return: what was changed, deploy status, verification output
```

**INSPECT** the devagent's response:
- Does implementation match the approved design?
- Schema-qualified SQL? JWT forwarding? MCP only?
- Did they verify the objects exist?

If insufficient → use Task tool to **resume** the devagent with corrections.
If approved → proceed to Step 3.

### Step 3: TESTER

Use the Task tool to delegate to the tester subagent:

```
Task tool call:
  subagent_type: "tester"
  description: "Test the implementation"
  prompt: |
    You are the tester. Read your instructions from .cursor/agents/tester.md.

    WHAT WAS IMPLEMENTED:
    <paste the devagent's implementation report>

    ORIGINAL REQUIREMENT:
    <paste the requirement>

    APPROVED DESIGN:
    <paste key design points>

    YOUR TASK:
    1. Plan positive tests, negative tests, and regression tests
    2. Execute all tests using MCP tools (execute_sql, get_logs, etc.)
    3. Show actual query output as evidence
    4. Return: test plan + results (pass/fail with evidence)
```

**INSPECT** the tester's response:
- Did they test all three categories?
- Are tests meaningful (not superficial)?
- Did they show real output?

If tests FAIL → use Task tool to **resume** devagent with the failures, then re-test.
If tests PASS → proceed to Step 4.

### Step 4: DEPLOYMENT LEAD

Use the Task tool to delegate to the deployment-lead subagent:

```
Task tool call:
  subagent_type: "deployment-lead"
  description: "Final deployment and compliance"
  prompt: |
    You are the deployment lead. Read your instructions from .cursor/agents/deployment-lead.md.

    IMPLEMENTATION REPORT:
    <paste devagent report>

    TEST RESULTS:
    <paste tester report>

    YOUR TASK:
    1. Verify all tests passed
    2. Git add, commit (descriptive message), push
    3. Verify all MCP deployments succeeded (list_migrations, list_edge_functions)
    4. Run get_advisors (security) and get_advisors (performance)
    5. Regenerate types if schema changed (generate_typescript_types)
    6. Check if any .cursor/rules/ files need updating
    7. Verify traceability: requirement → design → build → test → deploy
    8. Return: deployment report with git commit hash, MCP status, traceability check
```

**INSPECT** the deployment-lead's response:
- Git pushed?
- MCP deployments successful?
- Security advisors clean?
- Traceability consistent?
- Rules sync addressed?

If incomplete → use Task tool to **resume** with specifics.
If approved → proceed to Step 5.

### Step 5: DELIVER TO USER

Report the final result to the User:

```
DELIVERY REPORT
═══════════════
Requirement: <what was requested>
Status: COMPLETE / PARTIAL / BLOCKED

Architecture: <design summary>
Implementation: <what was built>
Test Results: <pass/fail counts with key evidence>
Deployment: <git commit hash, MCP status>
Rules Sync: <deltasync/fitgap results>

Quality notes: <any rework that was needed>
Follow-up items: <remaining work or warnings>
```

---

## Key Rules

- NEVER skip a phase
- ALWAYS inspect before proceeding
- SEND BACK with specific feedback when quality is insufficient
- Use Task tool `resume` parameter to send follow-up to the same subagent
- All subagents must search current dev docs before working (never stale knowledge)
- All code must be non-destructive, idempotent, SEO/GEO optimized, and follow /therules

---

This command will be available in chat with /waterfall
