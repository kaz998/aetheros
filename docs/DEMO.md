# AetherOS demo guide

This flow is designed to make the project easy to evaluate in under a minute.

## 1. Orient — Mission Control

The seeded Focus workspace opens with Mission Control, Constellation, and the local terminal already composed as a working desktop. Mission Control frames the current release objective and shows three actions that each connect to a different model boundary:

- **Trace the system** opens the project topology.
- **Run release flow** moves the deterministic scheduler.
- **Capture a checkpoint** demonstrates local recovery.

## 2. Explain — Constellation

Select **Architecture decision**. Its inspector reveals why the desktop is local-first and shows related signals. Click a relationship to move through the graph. Click **Open artifact** to see the corresponding Files preview. The same selected entity now ties together topology, artifact, palette, and terminal behavior.

## 3. Operate — Terminal

The terminal does not evaluate browser code. It exposes an explicit command registry:

```text
help
focus architecture
open observatory
run
status
snapshot
```

Use `run` and then open Observatory. The process table and append-only event list change because the same scheduler state drives both views.

## 4. Recover — snapshots

Capture a checkpoint from Mission Control, Settings, Flow Studio, or the terminal. Change a preference or move a window, then choose **Restore latest** from Settings or run `restore`. This rebuilds the safe persisted workspace payload.

## 5. Navigate — command palette and spaces

Press `⌘ K` / `Ctrl K` to search applications, actions, and actual graph nodes. Use `Build` and `Observe` in the top bar to demonstrate isolated window workspaces. Open any app in a different space and its placement remains local to that space.

## Evaluation talking points

- This is a systems-design UI rather than a desktop skin.
- The domain graph is shared data, not a decorative SVG.
- Workflow state is deterministic, observable, and deliberately non-deceptive.
- Local-first persistence is constrained to user-safe state.
- Visual depth is backed by explicit interaction contracts.
