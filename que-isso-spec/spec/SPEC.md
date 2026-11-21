---
title: "QuE IssO — Project Spec"
slug: "que-isso"
version: "1.0.0"
status: "draft"
stack:
  - React
  - Vite
  - TypeScript
  - React Router
  - Context API
  - useReducer
  - React Hook Form
  - Zod
  - styled-components
tags:
  - ecommerce
  - coffee
  - spa
  - spec-driven-development
---

# QuE IssO — Spec Entry Point

## Purpose

This is the entry point for the QuE IssO project specification package. The detailed academic deliverables remain in `docs/` to match the project brief.

## Canonical documents

- Product requirements: `./docs/PRD_SPEC.md`
- Technical architecture: `./docs/TECH_SPEC.md`
- Implementation tasks: `./docs/TASKS_SPEC.md`
- Agent operating rules: `./AGENTS.md`
- AI usage evidence: `./AGENTS.md` (section 13)

## Operating contract

1. Read the root `AGENTS.md` and all canonical documents before changing code.
2. Treat the PRD as the source for product behavior and acceptance criteria.
3. Treat the TECH_SPEC as the source for architecture and technical contracts.
4. Treat the TASKS_SPEC as the execution backlog.
5. Implement one approved task at a time.
6. Verify behavior with tests and update task evidence.
7. Stop and request human clarification when specifications conflict or a required decision is unresolved.
8. Do not claim that tests, commits, visual inspection, or deployment occurred unless verified.

## Workflow

`PRD → TECH_SPEC → TASKS_SPEC → one-task implementation → tests/review → documentation update`

Human approval is required before moving from specification to implementation and before broad architectural changes.
