# AetherOS architecture

AetherOS uses a deliberately small runtime model so the behavior remains explainable from the source. It treats an interface action as a workspace fact and lets independent visual lenses render that fact.

## System model

```text
Browser event
    │
    ├─ command palette / dock / graph / terminal / window chrome
    ▼
Intent handler
    │
    ├─ validates a safe operation
    ├─ updates shared workspace state
    ├─ appends an activity event
    └─ persists safe fields to localStorage
    ▼
Renderer
    │
    ├─ Desktop shell          — active workspace, dock indicators, panels
    ├─ Window manager         — z-order, minimized/maximized geometry
    ├─ Mission Control        — focus and recent activity
    ├─ Constellation          — selected node and relationships
    ├─ Files                  — linked artifact preview
    ├─ Flow Studio            — scheduler phase and progress
    ├─ Observatory            — process table and event log
    └─ Terminal / Notes       — command buffer and local authoring
```

## State boundaries

The browser-local state is intentionally split by concern even though the prototype keeps it in one module:

| Boundary | Examples | Consumers |
| --- | --- | --- |
| Shell | `activeWorkspace`, `activeWindowId`, window geometry | Top bar, dock, window layer |
| Domain graph | graph nodes, links, selected signal/file | Constellation, Files, palette, terminal |
| Runtime | processes, workflow progress, phases | Flow Studio, Observatory, Mission Control |
| User data | notes, theme, accent, reduced motion | Notes, Settings, CSS variables |
| Audit trail | activity events, snapshots, terminal history | Mission Control, Observatory, notifications |

Only safe serializable data is persisted. Timers, DOM references, palette focus, and drag state are deliberately ephemeral.

## Application manifest

Each app has an identifier, display metadata, and default geometry. The shell reads that manifest to build the launcher, dock, command surface, and title rails. That removes a common source of UI drift: adding an app does not mean editing four unrelated navigation lists.

```js
const appManifest = {
  constellation: {
    title: "Constellation",
    glyph: "◎",
    tone: "orchid",
    defaultBounds: { x: 675, y: 52, w: 560, h: 425 }
  }
};
```

## Deterministic workflow scheduler

The release workflow is a UI-level finite staged scheduler. It is not an attempt to execute arbitrary user code. `runWorkflow()` moves through four visible phases, updates the flow-runner process, emits audit events at checkpoints, and finishes in a published state.

```text
Ready
  └─ Gather evidence
       └─ Validate surface
            └─ Package release
                 └─ Publish checkpoint
```

Because all derived applications read the same runtime state, a workflow run is observable in several places immediately: the Mission Control action copy, Flow Studio progress bar, Observatory process table, activity stream, notifications, and terminal `status` output.

## Recovery semantics

A snapshot is a shallow local checkpoint of intentionally selected state: preferences, workspaces, window geometry, selected context, and field notes. It is **not** a version-control replacement and does not attempt to capture files or browser-wide state. The restore action replaces that safe payload and adds a new audit event.

This decision makes recovery behavior visible and easy to reason about while still showing a meaningful resilience pattern.

## Accessibility and responsive behavior

- Title rails, controls, graph signals, command palette, and inputs have explicit labels.
- The command palette has a focused text input and keyboard navigation.
- `Escape` closes transient surfaces.
- At narrow widths, windows become full-screen application sheets rather than shrinking into unusable overlaps.
- The reduced-motion setting applies through a root data attribute and honors the platform preference as a fallback.

## Trade-offs

The project avoids framework dependencies to keep the demo cloneable and inspectable. In production, the same boundaries could be migrated to typed modules, a reducer/store, IndexedDB, an actual worker-based scheduler, and automated browser tests without changing the conceptual architecture.
