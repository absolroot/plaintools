---
name: plain-tools-feature-orchestration
description: Orchestrate several independent PlainTool features through parallel Git worktrees and subagents while protecting shared registries, locale bundles, and unrelated work. Use when a request contains multiple tools or feature groups that can be built concurrently and then integrated by one root session.
---

# PlainTool Feature Orchestration

Use one root session as the integration owner. Delegate only bounded feature groups that can be implemented and tested without concurrent edits to the same shared files.

## Establish the boundary

Before spawning agents:

1. Read `ARCHITECTURE.md`, repository `AGENTS.md` files, the current status, worktree list, recent commits, registries, locale entrypoints, representative feature code, and test commands.
2. Inspect other worktrees read-only when their uncommitted work defines a structure this run must preserve. Never edit or commit another session's work.
3. Record a run ledger under `.codex/orchestration/`. Include base commit, integration branch, worktree paths, branch owners, owned paths, forbidden shared paths, dependencies, commit hashes, test results, and next integration action.
4. Group features by code ownership and shared semantics, not merely by feature count. Keep shared registries, routes, locale bundles, dependency reconciliation, SEO publication state, and final QA with the root owner unless one integration agent owns them exclusively.

## Create the branch tree

Use a separate Git worktree and branch for each parallel agent. `scripts/new-feature-worktrees.ps1` can create the initial set from one explicit base commit. Never ask agents to switch branches in the same worktree.

Give every agent:

- its exact worktree and branch;
- the feature outcomes and behavioral edge cases;
- owned and forbidden paths;
- the component or data contract expected by integration;
- required focused tests and commit message;
- an instruction to commit and return the hash, changed paths, tests, and caveats.

Keep one slot for the root orchestrator. A child may create a deeper subtree only when its task itself contains multiple independent owned areas and available concurrency remains. Record that subtree in the ledger before delegation.

## Protect shared structure

Treat a concurrent locale migration as exclusively owned. Feature branches should expose typed copy props and behavioral contracts without changing locale bundles, the central locale assembler, RTL metadata, or locale inventories. After the migration owner commits, integrate feature copy through the finished structure once, from the root branch.

Do not publish new tools merely because implementation exists. New routes remain preview/noindex until locale, SEO, metadata, FAQ, render, and publication evidence gates pass.

When dependencies are added by multiple branches, merge source commits first and reconcile root manifests and the lockfile once. Regenerate the lockfile from the final manifest instead of hand-merging incompatible lock sections.

## Survive compaction

Update the run ledger whenever a branch starts, commits, fails a gate, is integrated, or changes ownership. After context compaction, read the ledger, verify every recorded commit and worktree against Git, list live agents, and continue from the first unfinished integration action. The ledger is evidence, not authority; current Git state wins.

Send short user updates when branches start, a meaningful branch completes, integration begins, or a real blocker appears. Do not stream routine command output.

## Integrate and verify

Read [references/integration-checklist.md](references/integration-checklist.md) before the first cherry-pick or merge. Inspect each branch diff before integrating it. Reject out-of-scope shared-file edits and repair them on the feature branch.

Integrate one branch at a time into the root branch, resolve contracts deliberately, then run focused tests. After all branches are present, wire routes, registry/catalog entries, 17-locale copy, SEO/FAQ schema, RTL and technical-input direction, and shared QA from the root branch.

Finish with the repository's full unit, type, lint, formatting, build, network, desktop, and mobile browser gates. Verify the actual tool surface and at least one meaningful round trip per feature family before reporting completion.
