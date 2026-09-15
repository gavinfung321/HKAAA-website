# GitHub Issues Guide — HKAAA website

> **Feed this file at the start of every new chat.**
> This guide ensures every AI dev agent maintains consistent, disciplined issue tracking across the project lifecycle.
>
> Pair it with `docs/plans/IMPLEMENTATION_PLAN.md`. Issues track the work. The plan checklist records whether that work is verified.
> Local issue briefs live in `docs/issues/`. They do not replace GitHub Issues.

---

## Project Reference

| Field | Value |
| --- | --- |
| **Repository** | `gavinfung321/HKAAA-website` |
| **GitHub URL** | https://github.com/gavinfung321/HKAAA-website |
| **Plan** | `docs/plans/IMPLEMENTATION_PLAN.md` |
| **Issue briefs** | `docs/issues/` |
| **Issue tool** | `gh` CLI (`gh issue …`) |

There is no GitHub MCP server in this workspace. Use `gh`. If `github-mcp-server` is connected later, use the same steps with the MCP tools instead.

---

## Core Philosophy

Every piece of work — no matter how small — must be traceable via a GitHub Issue.

- **Before** you write code → find or create a relevant issue.
- **While** you work → keep the issue status current.
- **After** you finish → close the issue with a summary comment, then tick the matching item in `docs/plans/IMPLEMENTATION_PLAN.md`.

Never silently complete work. Always leave a paper trail.

---

## Issue Lifecycle

```
OPEN  ──►  IN PROGRESS  ──►  DONE (Closed)
           (add comment)      (close + comment)
```

| Stage | Agent Action |
| --- | --- |
| **Starting work** | Add a comment: `"Starting work on this: [brief description of approach]"` |
| **Blocked / paused** | Add a comment explaining what is blocking progress |
| **Done** | Close the issue with a final comment summarising what was done, then update the plan checklist |

---

## Development Workflow

### 1. Tracking (Before Work)

1. Search existing issues. Do not duplicate.
2. Create or reuse an issue using the format below.
3. Assign label(s) and a milestone.
4. Link the issue to the matching `docs/plans/IMPLEMENTATION_PLAN.md` checklist item in **Context**.
5. Add a local brief under `docs/issues/` (`001-short-slug.md`) that points at the GitHub issue and any section plan.
6. Post a starting comment.

### 2. Execution (During Work)

- **Branching**: Create a branch for the issue.
  - *Naming*: `feat/issue-ID-short-description` or `fix/issue-ID-short-description`.
- **Commits**: Every commit message must reference the issue ID.
  - *Format*: `[#ISSUE_ID] Commit message` (e.g., `[#12] Add Web Design to contact dropdown`)

### 3. Completion (End of Task)

1. **Verification**: All Acceptance Criteria are met. For UI work, verify in the browser. For the contact form, confirm a real insert in Supabase when the change touches leads.
2. **Closing comment**: Summarise what changed, how it was verified, and any follow-up issues.
3. **Close**: `gh issue close ISSUE_ID --comment "…"`
4. **Plan**: Tick the matching item(s) in `docs/plans/IMPLEMENTATION_PLAN.md` (and the section plan, if any) and add a line to the Progress log.
5. **Local brief**: Mark the `docs/issues/` brief closed and link the closing comment.

---

## Labels to Use

Always apply at least one label when creating an issue.

| Label | When to Use |
| --- | --- |
| `feature` | New functionality being added |
| `bug` | Something broken that needs fixing |
| `enhancement` | Improvement to existing functionality |
| `design` | UI/UX or visual changes |
| `refactor` | Code restructuring without behaviour change |
| `documentation` | Docs, comments, or guide updates |
| `chore` | Dependency updates, config, tooling |
| `question` | Needs clarification before work can begin |

If a label does not exist yet on the repo, create it before applying it:

```bash
gh label create "feature" --description "New functionality" --color "1D76DB"
```

---

## Milestones

Milestones map to the phases in `docs/plans/IMPLEMENTATION_PLAN.md`. Every issue **must** be assigned to a milestone.

### Rules

1. **Check existing milestones first** before creating a new one.
2. If the work fits a current milestone, assign it — do not create a new one.
3. Only create a new milestone if the work is a clearly new project phase.
4. Update the milestone due date if scope changes.

### Milestone naming

```
v1.0 — Foundation
v1.1 — Tighten the current site
v1.2 — Assets we own
v1.3 — Ship
v1.4 — Ops
v2.0 — Content and SEO
```

| Milestone | Plan phase |
| --- | --- |
| `v1.0 — Foundation` | Phase 0 |
| `v1.1 — Tighten the current site` | Phase A |
| `v1.2 — Assets we own` | Phase B |
| `v1.3 — Ship` | Phase C |
| `v1.4 — Ops` | Phase D |
| `v2.0 — Content and SEO` | Phase E |

Create a missing milestone with:

```bash
gh api repos/gavinfung321/HKAAA-website/milestones -f title="v1.1 — Tighten the current site"
```

---

## Issue Format

### Title

Use:

`[Type]: Short, clear description`

Examples:

- `Feature: Add Web Design, SEO, and Content Creation to contact form`
- `Bug: Hero copy says surcharge leads`
- `Design: Replace Imgur logo with owned asset`
- `Chore: Rewrite README for HKAAA-website`
- `Documentation: Add GitHub Issues Guide`

### Body Template

Every new issue must follow this structure:

```markdown
## Summary
One or two sentences describing what this issue is about.

## Context
Why this is needed. Link to docs/plans/IMPLEMENTATION_PLAN.md checklist items, prior issues, or decisions if relevant.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Notes
Any technical constraints, risks, or considerations.
```

---

## Agent Instructions — Step by Step

Follow this checklist at the **start of every chat session** that involves building or changing the site:

### 1. Understand the Task

Read the user's request and identify:

- What is being built or changed?
- Is this a new feature, a bug fix, an improvement, or documentation?
- Which `docs/plans/IMPLEMENTATION_PLAN.md` phase and checklist item does it belong to?

### 2. Check Existing Issues

Before creating anything:

```bash
gh issue list --repo gavinfung321/HKAAA-website --state open
gh issue list --repo gavinfung321/HKAAA-website --search "KEYWORDS"
```

- If a matching open issue exists → use it. Do not duplicate.
- If a related issue exists but is closed → reference it in a new one.

### 3. Create or Update the Issue

**If creating new:**

```bash
gh issue create --repo gavinfung321/HKAAA-website \
  --title "[Type]: Short, clear description" \
  --label "feature" \
  --milestone "v1.1 — Tighten the current site" \
  --body "$(cat <<'EOF'
## Summary
…

## Context
Checklist: Phase A — …

## Acceptance Criteria
- [ ] …

## Notes
…
EOF
)"
```

Then post a starting comment:

```bash
gh issue comment ISSUE_ID --body "Starting work on this: [approach]"
```

Add `docs/issues/NNN-short-slug.md` pointing at the GitHub issue.

**If updating existing:**

- Post a comment with the intended approach.
- Update labels or milestone if the scope has changed (`gh issue edit`).
- Update the local brief in `docs/issues/` if the decision changed.

### 4. Do the Work

Execute the task. Reference the issue number in commits and in any meaningful decisions.

### 5. Close the Issue

When the task is fully complete:

1. Post a closing summary (what changed, how it was verified, follow-ups).
2. Close the issue:

```bash
gh issue close ISSUE_ID --comment "Done: [summary]. Verified: [how]. Follow-ups: [none / #IDs]."
```

3. Tick the matching plan checklist item(s).
4. Add a Progress log line in the plan.
5. Mark the local brief closed.

---

## Updating Milestones Mid-Sprint

If scope changes during a session:

1. Note the change in a comment on the affected issue.
2. Create new issues for the expanded scope.
3. Reassign to an appropriate milestone.
4. Add the new work to `docs/plans/IMPLEMENTATION_PLAN.md` if it is not already there.
5. Never silently expand scope without updating tracking.

---

## What Agents Must Never Do

- Complete work without creating or referencing an issue.
- Close an issue without a summary comment.
- Create duplicate issues — always search first.
- Leave issues in "open" state when work is done.
- Create issues without a milestone or labels.
- Create a new milestone when an existing one fits.
- Tick a plan checklist without verifying the work.
- Commit `.env` or other secrets.
- Code a section plan that is still marked “do not code until approved.”

---

## Quick Reference Checklist

```
Before starting:
  [ ] Read docs/plans/IMPLEMENTATION_PLAN.md for the matching phase
  [ ] Searched for existing issues
  [ ] Created or identified the relevant issue
  [ ] Issue has: title, body, label, milestone
  [ ] Local brief added under docs/issues/
  [ ] Posted "starting work" comment

During work:
  [ ] Branch named feat/issue-ID-… or fix/issue-ID-…
  [ ] Commits use [#ISSUE_ID] message format
  [ ] Added comments for blockers or pivots

After completing:
  [ ] Posted closing summary comment
  [ ] Issue is closed
  [ ] Matching plan items ticked
  [ ] Progress log updated
  [ ] Local brief marked closed
  [ ] New follow-up issues created if needed
```

---

## `gh` command cheat sheet

```bash
gh issue list --state open
gh issue view ISSUE_ID
gh issue create --title "…" --label "feature" --milestone "v1.1 — Tighten the current site" --body "…"
gh issue comment ISSUE_ID --body "Starting work on this: …"
gh issue edit ISSUE_ID --add-label "design" --milestone "v1.2 — Assets we own"
gh issue close ISSUE_ID --comment "Done: …"
gh label list
gh api repos/gavinfung321/HKAAA-website/milestones
```

---

*This guide is a living document. Update it when conventions change.*
