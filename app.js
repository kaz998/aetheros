const STORAGE_KEY = "aetheros:workspace:v1";

const accentMap = {
  mint: { value: "#63e6be", rgb: "99, 230, 190", soft: "#a3f4d9" },
  sky: { value: "#7fb2ff", rgb: "127, 178, 255", soft: "#b5d1ff" },
  orchid: { value: "#afa0ff", rgb: "175, 160, 255", soft: "#d0c8ff" },
};

const appManifest = {
  mission: { title: "Mission Control", glyph: "✦", tone: "mint", defaultBounds: { x: 94, y: 25, w: 626, h: 492 } },
  constellation: { title: "Constellation", glyph: "◎", tone: "orchid", defaultBounds: { x: 675, y: 52, w: 560, h: 425 } },
  terminal: { title: "Terminal", glyph: "›_", tone: "terminal", defaultBounds: { x: 155, y: 388, w: 450, h: 238 } },
  files: { title: "Files", glyph: "▰", tone: "blue", defaultBounds: { x: 200, y: 78, w: 775, h: 445 } },
  workflow: { title: "Flow Studio", glyph: "⌘", tone: "orchid", defaultBounds: { x: 185, y: 68, w: 805, h: 480 } },
  observatory: { title: "Observatory", glyph: "◔", tone: "amber", defaultBounds: { x: 230, y: 100, w: 745, h: 452 } },
  notes: { title: "Field Notes", glyph: "✦", tone: "mint", defaultBounds: { x: 285, y: 92, w: 645, h: 456 } },
  settings: { title: "System Settings", glyph: "◐", tone: "blue", defaultBounds: { x: 330, y: 103, w: 605, h: 420 } },
};

const graphNodes = [
  { id: "launch-control", title: "Launch Control", type: "system", x: 302, y: 218, description: "The seeded workspace that connects product intent, runnable flows, and the evidence behind each decision.", tags: ["active", "workspace"], relations: ["event-kernel", "architecture", "delivery-flow", "alpha-release"] },
  { id: "architecture", title: "Architecture decision", type: "decision", x: 172, y: 104, description: "Keep the desktop shell local-first. A small event kernel coordinates every app rather than splitting state across isolated mockups.", tags: ["ADR-004", "approved"], relations: ["launch-control", "event-kernel", "offline-store", "design-system"] },
  { id: "event-kernel", title: "Event kernel", type: "system", x: 303, y: 78, description: "A deterministic event stream turns visible interactions into auditable workspace signals for telemetry, recovery, and activity views.", tags: ["core", "observable"], relations: ["architecture", "launch-control", "telemetry", "recovery"] },
  { id: "design-system", title: "Instrument UI", type: "doc", x: 84, y: 238, description: "A calm visual system for complex information: precise surfaces, clear status, restrained color, and keyboard-forward interactions.", tags: ["design", "accessibility"], relations: ["architecture", "launch-control", "interface-pass"] },
  { id: "offline-store", title: "Local vault", type: "system", x: 505, y: 137, description: "Browser storage preserves layouts, notes, preferences, and the activity trail so the workspace survives a refresh without a login.", tags: ["local-first", "privacy"], relations: ["architecture", "recovery", "delivery-flow"] },
  { id: "telemetry", title: "Observatory", type: "system", x: 528, y: 254, description: "Workspace telemetry, process state, and system events are surfaced as a transparent simulation—not machine-level metrics.", tags: ["signals", "processes"], relations: ["event-kernel", "delivery-flow", "alpha-release"] },
  { id: "delivery-flow", title: "Delivery workflow", type: "task", x: 399, y: 334, description: "A visual, deterministic workflow that validates the release narrative and publishes an evidence-ready project package.", tags: ["flow", "in-progress"], relations: ["launch-control", "offline-store", "telemetry", "alpha-release"] },
  { id: "recovery", title: "Snapshot recovery", type: "decision", x: 188, y: 339, description: "Before every material change, capture a lightweight workspace snapshot so a user can recover context with a single command.", tags: ["resilience", "ADR-007"], relations: ["event-kernel", "offline-store", "alpha-release"] },
  { id: "alpha-release", title: "Alpha release", type: "milestone", x: 304, y: 406, description: "The first recruiter-ready build: shell, constellation, command surface, local persistence, and a documented demo path.", tags: ["milestone", "this-week"], relations: ["launch-control", "delivery-flow", "telemetry", "recovery"] },
  { id: "interface-pass", title: "Interaction pass", type: "task", x: 80, y: 374, description: "Refine focus behavior, keyboard controls, reduced-motion preferences, and small-screen composition across all apps.", tags: ["quality", "next"], relations: ["design-system", "alpha-release"] },
];

const graphLinks = [
  ["launch-control", "event-kernel"], ["launch-control", "architecture"], ["launch-control", "delivery-flow"], ["launch-control", "alpha-release"],
  ["architecture", "event-kernel"], ["architecture", "offline-store"], ["architecture", "design-system"], ["event-kernel", "telemetry"],
  ["event-kernel", "recovery"], ["offline-store", "recovery"], ["offline-store", "delivery-flow"], ["delivery-flow", "telemetry"],
  ["delivery-flow", "alpha-release"], ["telemetry", "alpha-release"], ["recovery", "alpha-release"], ["design-system", "interface-pass"], ["interface-pass", "alpha-release"],
];

const seedFiles = [
  { id: "readme", title: "README.md", type: "doc", kind: "MD", size: "8.4 KB", modified: "2m ago", node: "launch-control", path: "projects / aetheros", excerpt: "A browser-native operating environment for turning complex work into a living, inspectable system." },
  { id: "adr-004", title: "ADR-004-local-first.md", type: "decision", kind: "ADR", size: "3.1 KB", modified: "12m ago", node: "architecture", path: "projects / aetheros / decisions", excerpt: "The shell owns a small persistent model. Applications render distinct lenses over the same system instead of inventing independent state." },
  { id: "event-log", title: "event-kernel.ts", type: "system", kind: "TS", size: "6.8 KB", modified: "19m ago", node: "event-kernel", path: "projects / aetheros / kernel", excerpt: "Events are append-only workspace facts. The Observatory, activity feed, notifications, and terminal all derive from the same stream." },
  { id: "vault", title: "local-vault.ts", type: "system", kind: "TS", size: "4.2 KB", modified: "28m ago", node: "offline-store", path: "projects / aetheros / kernel", excerpt: "A constrained persistence adapter saves safe UI preferences, notes, and workspace layout to browser storage." },
  { id: "flow", title: "release.flow.json", type: "task", kind: "JSON", size: "2.6 KB", modified: "31m ago", node: "delivery-flow", path: "projects / aetheros / flows", excerpt: "The release workflow is a deterministic graph: gather evidence, validate the surface, package artifacts, then publish a checkpoint." },
  { id: "recovery", title: "ADR-007-recovery.md", type: "decision", kind: "ADR", size: "2.0 KB", modified: "44m ago", node: "recovery", path: "projects / aetheros / decisions", excerpt: "Snapshots should restore context, not impersonate a full version-control system. Keep the recovery surface clear and predictable." },
  { id: "system", title: "design-tokens.md", type: "doc", kind: "MD", size: "5.3 KB", modified: "1h ago", node: "design-system", path: "projects / aetheros / design", excerpt: "The visual language treats the interface like a quiet technical instrument: legible hierarchy, deliberate color, and no decorative noise." },
  { id: "release", title: "alpha-checklist.md", type: "task", kind: "MD", size: "1.9 KB", modified: "1h ago", node: "alpha-release", path: "projects / aetheros / release", excerpt: "Proof points for the first public release: interactive graph, local-first shell, runnable workflow, keyboard command surface, and a complete README." },
];

const seedNotes = [
  { id: "north-star", title: "North-star", body: "Build an operating environment that makes complex work feel inspectable rather than overwhelming.\n\nThe project should have one source of truth, not a gallery of disconnected screens.", modified: "just now" },
  { id: "release-story", title: "Recruiter demo", body: "1. Start in Mission Control\n2. Inspect the constellation\n3. Run the delivery flow\n4. Observe the process\n5. Recover a snapshot\n\nEvery step should show a real relationship between the lenses.", modified: "8m ago" },
  { id: "cuts", title: "Scope cuts", body: "No fake kernel. No arbitrary shell. No cloud-sync theatre.\n\nMake the interaction model coherent, durable, and obvious in a 30-second demo.", modified: "21m ago" },
];

function createWindows() {
  const result = {};
  let z = 1;
  for (const [id, app] of Object.entries(appManifest)) {
    result[id] = {
      ...app.defaultBounds,
      open: ["mission", "constellation", "terminal"].includes(id),
      minimized: false,
      maximized: false,
      workspace: "focus",
      z: z++,
    };
  }
  return result;
}

function makeInitialState() {
  const now = Date.now();
  return {
    theme: "dark",
    accent: "mint",
    reducedMotion: false,
    activeWorkspace: "focus",
    activeWindowId: "mission",
    windows: createWindows(),
    selectedNodeId: "architecture",
    selectedFileId: "adr-004",
    selectedNoteId: "north-star",
    selectedFlowNode: "package",
    graphFilter: "all",
    notes: seedNotes.map((note) => ({ ...note })),
    terminalHistory: [],
    activity: [
      { id: "seed-1", title: "Workspace hydrated", detail: "Local workspace state is ready.", type: "success", time: now - 1000 * 60 * 2 },
      { id: "seed-2", title: "Decision linked", detail: "ADR-004 is attached to the launch plan.", type: "success", time: now - 1000 * 60 * 13 },
      { id: "seed-3", title: "Flow checkpoint", detail: "Release workflow is waiting for review.", type: "warning", time: now - 1000 * 60 * 29 },
      { id: "seed-4", title: "Vault snapshot", detail: "A recoverable checkpoint was created.", type: "success", time: now - 1000 * 60 * 47 },
    ],
    processes: [
      { id: "flow-runner", name: "release-flow", detail: "waiting for input", state: "paused" },
      { id: "event-router", name: "event-router", detail: "stream healthy", state: "running" },
      { id: "local-vault", name: "local-vault", detail: "storage synced", state: "running" },
    ],
    workflow: { running: false, progress: 18, phase: "Ready to run" },
    snapshots: [],
  };
}

function safeStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function hydrateState() {
  const fresh = makeInitialState();
  const saved = safeStoredState();
  if (!saved || typeof saved !== "object") return fresh;
  return {
    ...fresh,
    ...saved,
    windows: { ...fresh.windows, ...(saved.windows || {}) },
    notes: Array.isArray(saved.notes) && saved.notes.length ? saved.notes : fresh.notes,
    activity: Array.isArray(saved.activity) && saved.activity.length ? saved.activity.slice(0, 15) : fresh.activity,
    processes: Array.isArray(saved.processes) && saved.processes.length ? saved.processes : fresh.processes,
    workflow: { ...fresh.workflow, ...(saved.workflow || {}) },
    snapshots: Array.isArray(saved.snapshots) ? saved.snapshots.slice(0, 3) : [],
    terminalHistory: Array.isArray(saved.terminalHistory) ? saved.terminalHistory.slice(-60) : [],
  };
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function timeAgo(timestamp) {
  const delta = Math.max(0, Date.now() - Number(timestamp));
  const minutes = Math.floor(delta / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function nodeById(id) {
  return graphNodes.find((node) => node.id === id) || graphNodes[0];
}

function fileById(id) {
  return seedFiles.find((file) => file.id === id) || seedFiles[0];
}

class AetherOS {
  constructor() {
    this.state = hydrateState();
    this.paletteOpen = false;
    this.paletteIndex = 0;
    this.paletteResults = [];
    this.workflowTimer = null;
    this.drag = null;
    this.dom = {
      root: document.documentElement,
      boot: document.getElementById("boot-screen"),
      bootStatus: document.getElementById("boot-status"),
      layer: document.getElementById("window-layer"),
      dock: document.querySelector(".dock"),
      palette: document.getElementById("command-palette"),
      paletteInput: document.getElementById("command-input"),
      paletteContent: document.getElementById("palette-content"),
      launcher: document.getElementById("launcher-panel"),
      launcherGrid: document.getElementById("launcher-grid"),
      notifications: document.getElementById("notification-panel"),
      notificationList: document.getElementById("notification-list"),
      toastStack: document.getElementById("toast-stack"),
      notificationButton: document.getElementById("notification-button"),
    };
    this.bindEvents();
    this.applyPreferences();
    this.renderAll();
    this.startClock();
    window.setTimeout(() => {
      this.dom.bootStatus.textContent = "Workspace telemetry online";
    }, 550);
    window.setTimeout(() => this.dom.boot.classList.add("complete"), 1150);
  }

  persist() {
    try {
      const persistable = {
        theme: this.state.theme,
        accent: this.state.accent,
        reducedMotion: this.state.reducedMotion,
        activeWorkspace: this.state.activeWorkspace,
        activeWindowId: this.state.activeWindowId,
        windows: this.state.windows,
        selectedNodeId: this.state.selectedNodeId,
        selectedFileId: this.state.selectedFileId,
        selectedNoteId: this.state.selectedNoteId,
        selectedFlowNode: this.state.selectedFlowNode,
        graphFilter: this.state.graphFilter,
        notes: this.state.notes,
        terminalHistory: this.state.terminalHistory.slice(-60),
        activity: this.state.activity.slice(0, 15),
        processes: this.state.processes,
        workflow: this.state.workflow,
        snapshots: this.state.snapshots.slice(0, 3),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // The app keeps working when storage is unavailable (e.g. private browsing).
    }
  }

  applyPreferences() {
    const accent = accentMap[this.state.accent] || accentMap.mint;
    this.dom.root.dataset.theme = this.state.theme;
    this.dom.root.dataset.reduceMotion = String(this.state.reducedMotion);
    this.dom.root.style.setProperty("--mint", accent.value);
    this.dom.root.style.setProperty("--mint-rgb", accent.rgb);
    this.dom.root.style.setProperty("--mint-2", accent.soft);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", this.state.theme === "light" ? "#e9f1fa" : "#0a1020");
  }

  bindEvents() {
    document.addEventListener("click", (event) => this.handleClick(event));
    document.addEventListener("dblclick", (event) => this.handleDoubleClick(event));
    document.addEventListener("pointerdown", (event) => this.handlePointerDown(event));
    document.addEventListener("keydown", (event) => this.handleKeydown(event));
    document.addEventListener("submit", (event) => this.handleSubmit(event));
    document.addEventListener("input", (event) => this.handleInput(event));
    this.dom.paletteInput.addEventListener("input", () => {
      this.paletteIndex = 0;
      this.renderPaletteList();
    });
  }

  handleClick(event) {
    const target = event.target.closest("button, [data-action], .graph-node, .flow-node, .file-table tbody tr");
    if (!target) {
      if (this.paletteOpen && !event.target.closest("#command-palette")) this.closePalette();
      if (!event.target.closest("#notification-panel") && !event.target.closest("#notification-button")) this.hidePanel("notifications");
      if (!event.target.closest("#launcher-panel") && !event.target.closest("#launcher-button") && !event.target.closest("#dock-launcher")) this.hidePanel("launcher");
      return;
    }

    const openId = target.dataset.openApp;
    if (openId) {
      this.openApp(openId);
      return;
    }
    if (target.id === "launcher-button" || target.id === "dock-launcher") return this.togglePanel("launcher");
    if (target.id === "search-button") return this.togglePalette();
    if (target.id === "notification-button") return this.togglePanel("notifications");
    if (target.id === "theme-button") return this.setTheme(this.state.theme === "dark" ? "light" : "dark");
    if (target.id === "clear-notifications") {
      this.state.activity = [];
      this.persist();
      this.renderNotifications();
      this.renderWindows();
      return;
    }
    if (target.id === "open-settings") return this.openApp("settings");
    if (target.dataset.closePanel) return this.hidePanel(target.dataset.closePanel.replace("-panel", ""));
    if (target.dataset.workspace) return this.switchWorkspace(target.dataset.workspace);

    if (target.dataset.windowAction) {
      const windowId = target.closest(".window")?.dataset.windowId;
      if (windowId) this.windowAction(windowId, target.dataset.windowAction);
      return;
    }
    if (target.dataset.paletteIndex !== undefined) {
      const entry = this.paletteResults[Number(target.dataset.paletteIndex)];
      if (entry) entry.run();
      return;
    }
    if (target.dataset.theme) return this.setTheme(target.dataset.theme);
    if (target.dataset.accent) return this.setAccent(target.dataset.accent);
    if (target.dataset.setting === "reduced-motion") return this.toggleReducedMotion();
    if (target.dataset.graphFilter) {
      this.state.graphFilter = target.dataset.graphFilter;
      this.persist();
      this.renderWindows();
      return;
    }
    if (target.dataset.node) return this.selectNode(target.dataset.node);
    if (target.dataset.file) return this.selectFile(target.dataset.file);
    if (target.dataset.note) return this.selectNote(target.dataset.note);
    if (target.dataset.flowNode) {
      this.state.selectedFlowNode = target.dataset.flowNode;
      this.persist();
      this.renderWindows();
      return;
    }
    if (target.dataset.processAction) return this.processAction(target.dataset.processAction, target.dataset.processId);

    const action = target.dataset.action;
    if (!action) return;
    if (action === "run-workflow") return this.runWorkflow();
    if (action === "open-constellation") return this.openApp("constellation");
    if (action === "open-flow") return this.openApp("workflow");
    if (action === "open-terminal") return this.openApp("terminal");
    if (action === "open-files") return this.openApp("files");
    if (action === "snapshot") return this.createSnapshot();
    if (action === "restore") return this.restoreSnapshot();
    if (action === "new-note") return this.newNote();
    if (action === "clear-terminal") return this.clearTerminal();
  }

  handleDoubleClick(event) {
    const titlebar = event.target.closest(".window-titlebar");
    if (!titlebar || event.target.closest(".window-controls")) return;
    const windowId = titlebar.closest(".window")?.dataset.windowId;
    if (windowId) this.windowAction(windowId, "maximize");
  }

  handlePointerDown(event) {
    const windowElement = event.target.closest(".window");
    if (!windowElement) return;
    const id = windowElement.dataset.windowId;
    if (id) this.focusWindow(id, false);
    const titlebar = event.target.closest(".window-titlebar");
    if (!titlebar || event.target.closest(".window-controls") || event.button !== 0) return;
    const win = this.state.windows[id];
    if (!win || win.maximized || window.matchMedia("(max-width: 680px)").matches) return;
    event.preventDefault();
    const rect = windowElement.getBoundingClientRect();
    const layerRect = this.dom.layer.getBoundingClientRect();
    this.drag = { id, el: windowElement, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, layerRect };
    windowElement.setPointerCapture?.(event.pointerId);
    const move = (moveEvent) => {
      if (!this.drag) return;
      const current = this.state.windows[this.drag.id];
      const x = this.clamp(moveEvent.clientX - this.drag.layerRect.left - this.drag.offsetX, -current.w + 130, this.drag.layerRect.width - 130);
      const y = this.clamp(moveEvent.clientY - this.drag.layerRect.top - this.drag.offsetY, 0, this.drag.layerRect.height - 46);
      current.x = Math.round(x);
      current.y = Math.round(y);
      this.drag.el.style.left = `${current.x}px`;
      this.drag.el.style.top = `${current.y}px`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (!this.drag) return;
      this.persist();
      this.drag = null;
      this.renderWindows();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }

  handleKeydown(event) {
    const commandModifier = event.metaKey || event.ctrlKey;
    if (commandModifier && event.key.toLowerCase() === "k") {
      event.preventDefault();
      this.togglePalette();
      return;
    }
    if (commandModifier && event.key === "`") {
      event.preventDefault();
      this.openApp("terminal");
      window.setTimeout(() => document.querySelector("#terminal-input")?.focus(), 0);
      return;
    }
    if (event.key === "Escape") {
      if (this.paletteOpen) return this.closePalette();
      this.hidePanel("notifications");
      this.hidePanel("launcher");
      return;
    }
    if (!this.paletteOpen) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const increment = event.key === "ArrowDown" ? 1 : -1;
      this.paletteIndex = (this.paletteIndex + increment + this.paletteResults.length) % Math.max(1, this.paletteResults.length);
      this.renderPaletteList();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      this.paletteResults[this.paletteIndex]?.run();
    }
  }

  handleSubmit(event) {
    if (event.target.id !== "terminal-form") return;
    event.preventDefault();
    const input = event.target.querySelector("input");
    const command = input.value.trim();
    if (!command) return;
    this.executeTerminal(command);
    input.value = "";
  }

  handleInput(event) {
    if (!event.target.matches("[data-note-field]")) return;
    const note = this.state.notes.find((item) => item.id === this.state.selectedNoteId);
    if (!note) return;
    note[event.target.dataset.noteField] = event.target.value;
    note.modified = "just now";
    this.persist();
    const status = document.querySelector(".note-save-status");
    if (status) status.textContent = "Saved locally";
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  renderAll() {
    this.applyPreferences();
    this.renderWindows();
    this.renderDock();
    this.renderLauncher();
    this.renderNotifications();
    this.renderWorkspaceSwitcher();
    if (this.paletteOpen) this.renderPaletteList();
  }

  renderWindows() {
    const windows = Object.entries(this.state.windows)
      .filter(([, win]) => win.open && win.workspace === this.state.activeWorkspace)
      .sort(([, a], [, b]) => a.z - b.z);
    this.dom.layer.innerHTML = windows.map(([id, win]) => this.renderWindow(id, win)).join("");
    this.renderDock();
  }

  renderWindow(id, win) {
    const app = appManifest[id];
    const active = this.state.activeWindowId === id;
    const maxWidth = Math.max(310, this.dom.layer.clientWidth - 20 || win.w);
    const width = this.clamp(win.w, 310, maxWidth);
    const maxHeight = Math.max(230, this.dom.layer.clientHeight - 10 || win.h);
    const height = this.clamp(win.h, 230, maxHeight);
    const style = `left:${win.x}px;top:${win.y}px;width:${width}px;height:${height}px;z-index:${win.z};`;
    const toneClass = `${app.tone}-glyph`;
    return `
      <section class="window ${active ? "active" : ""} ${win.minimized ? "minimized" : ""} ${win.maximized ? "maximized" : ""}" data-window-id="${id}" style="${style}" aria-label="${app.title} window">
        <header class="window-titlebar">
          <div class="window-title">
            <span class="title-icon ${toneClass}">${app.glyph}</span>
            <strong>${app.title}</strong>
            <span class="window-state"><i></i>${id === "terminal" ? "local shell" : id === "observatory" ? "live signals" : "local-first"}</span>
          </div>
          <div class="window-controls" aria-label="Window controls">
            <button data-window-action="minimize" aria-label="Minimize ${app.title}">−</button>
            <button data-window-action="maximize" aria-label="Maximize ${app.title}">${win.maximized ? "↙" : "□"}</button>
            <button data-window-action="close" aria-label="Close ${app.title}">×</button>
          </div>
        </header>
        <div class="window-content">${this.renderApp(id)}</div>
      </section>`;
  }

  renderApp(id) {
    const renderers = {
      mission: () => this.renderMission(),
      constellation: () => this.renderConstellation(),
      files: () => this.renderFiles(),
      workflow: () => this.renderWorkflow(),
      observatory: () => this.renderObservatory(),
      terminal: () => this.renderTerminal(),
      notes: () => this.renderNotes(),
      settings: () => this.renderSettings(),
    };
    return renderers[id]?.() || "";
  }

  renderMission() {
    const activity = this.state.activity.slice(0, 4).map((entry) => `
      <div class="activity-item"><i></i><div><strong>${escapeHTML(entry.title)}</strong><span>${escapeHTML(entry.detail)} · ${timeAgo(entry.time)}</span></div></div>`).join("");
    const progress = this.state.workflow.running ? this.state.workflow.progress : 72;
    return `<div class="app-shell mission">
      <div class="mission-head">
        <div><small>FOCUS SPACE / PROJECT 01</small><h1>Make complex work feel <em>legible.</em></h1><p>AetherOS turns plans, decisions, files, and running workflows into one inspectable operating environment.</p></div>
        <span class="status-pill">workspace nominal</span>
      </div>
      <div class="mission-grid">
        <section class="mission-card focus-card">
          <div class="focus-label"><i></i> NOW IN FOCUS</div>
          <h2>Ship an evidence-rich alpha release.</h2>
          <p>Connect the product story to its underlying decisions, then demonstrate it through a runnable delivery flow.</p>
          <div class="focus-stats"><div><strong>${Math.max(1, Math.round(progress / 19))}</strong><span>active threads</span></div><div><strong>10</strong><span>linked entities</span></div><div><strong>94%</strong><span>signal clarity</span></div></div>
          <div class="now-actions">
            <button class="now-action" data-action="open-constellation"><span class="action-index">01</span><span class="action-copy"><strong>Trace the system</strong><span>Explore the connected constellation</span></span><span class="action-arrow">→</span></button>
            <button class="now-action" data-action="run-workflow"><span class="action-index">02</span><span class="action-copy"><strong>${this.state.workflow.running ? "Monitor release flow" : "Run release flow"}</strong><span>${this.state.workflow.running ? `${this.state.workflow.progress}% through the workflow` : "Execute the deterministic delivery graph"}</span></span><span class="action-arrow">→</span></button>
            <button class="now-action" data-action="snapshot"><span class="action-index">03</span><span class="action-copy"><strong>Capture a checkpoint</strong><span>Protect the current operating context</span></span><span class="action-arrow">→</span></button>
          </div>
        </section>
        <section class="mission-card"><header><h3>PROJECT TRAJECTORY</h3><span class="status-pill neutral">7 days</span></header><div class="trajectory">
          <svg viewBox="0 0 310 135" preserveAspectRatio="none" aria-label="Project trajectory chart">
            <defs><linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1"><stop stop-color="var(--mint)" stop-opacity=".23"/><stop offset="1" stop-color="var(--mint)" stop-opacity="0"/></linearGradient></defs>
            <path class="chart-grid" d="M0 28H310M0 67H310M0 106H310"/><path class="chart-fill" d="M0 102 C25 92 38 99 61 82 S101 77 123 81 S163 42 188 57 S223 44 244 35 S278 46 310 15 L310 135 L0 135Z"/><path class="chart-line" d="M0 102 C25 92 38 99 61 82 S101 77 123 81 S163 42 188 57 S223 44 244 35 S278 46 310 15"/><circle class="chart-dot" cx="310" cy="15" r="4"/>
          </svg><div class="chart-labels"><span>MON</span><span>WED</span><span>FRI</span><span>NOW</span></div>
        </div></section>
        <section class="mission-card"><header><h3>LIVE SIGNALS</h3><button data-action="open-terminal">Inspect →</button></header><div class="signal-wrap">
          <div class="signal-item"><span>Story coherence</span><strong>94 / 100</strong><div class="signal-progress"><i style="width:94%"></i></div></div>
          <div class="signal-item"><span>Workflow coverage</span><strong>${this.state.workflow.running ? `${this.state.workflow.progress}%` : "72%"}</strong><div class="signal-progress"><i style="width:${this.state.workflow.running ? this.state.workflow.progress : 72}%"></i></div></div>
          <div class="signal-item"><span>Decision latency</span><strong class="warn">1 open</strong><div class="signal-progress"><i class="warn" style="width:31%"></i></div></div>
        </div></section>
        <section class="mission-card"><header><h3>ACTIVITY STREAM</h3><button data-action="open-terminal">View logs →</button></header><div class="activity-list">${activity}</div></section>
        <section class="mission-card onboarding-card"><span class="onboarding-mark">⌘</span><div><h4>Explore the operating model</h4><p>Use <kbd>⌘ K</kbd> to open anything, or inspect the constellation to trace a decision across the workspace.</p></div><button class="small-button" data-action="open-constellation">Open graph</button></section>
      </div>
    </div>`;
  }

  renderConstellation() {
    const selected = nodeById(this.state.selectedNodeId);
    const filter = this.state.graphFilter;
    const visible = (node) => filter === "all" || node.type === filter;
    const connectedIds = new Set([selected.id, ...selected.relations]);
    const links = graphLinks.map(([a, b]) => {
      const source = nodeById(a); const target = nodeById(b);
      const related = a === selected.id || b === selected.id;
      const dim = !visible(source) || !visible(target) || (filter === "all" && !related && selected.id !== "launch-control");
      const controlX = (source.x + target.x) / 2 + (source.y - target.y) * .06;
      const controlY = (source.y + target.y) / 2 + (target.x - source.x) * .06;
      return `<path class="link ${related ? "related" : ""} ${dim ? "dim" : ""}" d="M${source.x} ${source.y} Q${controlX.toFixed(0)} ${controlY.toFixed(0)} ${target.x} ${target.y}"/>`;
    }).join("");
    const nodes = graphNodes.map((node) => {
      const isSelected = node.id === selected.id;
      const dim = !visible(node) || (filter === "all" && !connectedIds.has(node.id) && selected.id !== "launch-control");
      const labelAnchor = node.x < 135 ? "start" : node.x > 470 ? "end" : "middle";
      const labelX = node.x < 135 ? 12 : node.x > 470 ? -12 : 0;
      return `<g class="graph-node ${isSelected ? "selected" : ""} ${dim ? "dim" : ""}" data-node="${node.id}" data-type="${node.type}" tabindex="0" role="button" aria-label="Inspect ${escapeHTML(node.title)}" transform="translate(${node.x} ${node.y})"><circle class="node-halo" r="16"/><circle class="node-pulse" r="7" ${isSelected ? "" : "style=\"display:none\""}/><circle class="node-dot" r="${isSelected ? 8 : 6}"/><text class="node-label" x="${labelX}" y="${node.y > 370 ? -13 : 22}" text-anchor="${labelAnchor}">${escapeHTML(node.title)}</text></g>`;
    }).join("");
    const relations = selected.relations.slice(0, 4).map((id) => `<button class="relation" data-node="${id}">${escapeHTML(nodeById(id).title)}</button>`).join("");
    const typeLabel = selected.type === "doc" ? "document" : selected.type;
    return `<div class="app-shell constellation">
      <section class="graph-area">
        <div class="graph-toolbar"><div class="filter-chips"><button class="chip ${filter === "all" ? "active" : ""}" data-graph-filter="all">All</button><button class="chip ${filter === "task" ? "active" : ""}" data-graph-filter="task">Tasks</button><button class="chip ${filter === "doc" ? "active" : ""}" data-graph-filter="doc">Docs</button><button class="chip ${filter === "system" ? "active" : ""}" data-graph-filter="system">Systems</button></div><span class="graph-legend"><i></i> ${filter === "all" ? "select a signal" : `${filter}s only`}</span></div>
        <svg class="constellation-svg" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid meet" aria-label="Project constellation graph">
          <circle class="orbit" cx="302" cy="218" r="80"/><circle class="orbit" cx="302" cy="218" r="145"/><circle class="orbit" cx="302" cy="218" r="205"/>
          ${links}${nodes}
        </svg>
      </section>
      <aside class="inspector"><header><small>SELECTED SIGNAL</small><h3>${escapeHTML(selected.title)}</h3></header><div class="inspector-body"><span class="node-type"><i></i>${typeLabel}</span><p>${escapeHTML(selected.description)}</p><section class="inspector-section"><h4>Related signals</h4><div class="relation-list">${relations}</div></section><section class="inspector-section"><h4>Tags</h4><div class="tag-row">${selected.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div></section></div><footer class="inspector-actions"><button class="small-button" data-action="open-files">Open artifact</button><button class="small-button primary" data-action="open-flow">Trace flow →</button></footer></aside>
    </div>`;
  }

  renderFiles() {
    const file = fileById(this.state.selectedFileId);
    const rows = seedFiles.map((item) => `<tr data-file="${item.id}" class="${item.id === file.id ? "selected" : ""}"><td><span class="file-name"><i class="file-kind ${item.type}">${item.kind}</i>${escapeHTML(item.title)}</span></td><td>${escapeHTML(item.path.split(" / ").at(-1))}</td><td>${item.size}</td><td>${item.modified}</td></tr>`).join("");
    const node = nodeById(file.node);
    const sample = file.id === "event-log" ? "emit({ type: 'workspace.signal',\n  source: 'event-kernel',\n  payload: { audit: true }\n})" : file.id === "flow" ? "gather → validate → package → publish\n                ↘ snapshot ↗" : `# ${file.title}\n\n${file.excerpt}`;
    return `<div class="app-shell files">
      <aside class="file-sidebar"><small>SPACES</small><button class="side-item active"><span>◫</span> AetherOS <span class="count">8</span></button><button class="side-item"><span>⌘</span> Decisions <span class="count">2</span></button><button class="side-item"><span>◌</span> Flows <span class="count">1</span></button><button class="side-item"><span>✦</span> Design <span class="count">1</span></button><div class="storage-meter"><span><b>Local vault</b><b>22%</b></span><i></i></div></aside>
      <section class="file-main"><div class="breadcrumb"><span>root</span><span>›</span><span>projects</span><span>›</span><strong>aetheros</strong></div><table class="file-table"><thead><tr><th>Name</th><th>Location</th><th>Size</th><th>Modified</th></tr></thead><tbody>${rows}</tbody></table></section>
      <aside class="file-preview"><header class="preview-head"><strong>${escapeHTML(file.title)}</strong><span>${file.size} · synced locally</span></header><div class="preview-body"><h3>${escapeHTML(node.title)}</h3><p>${escapeHTML(file.excerpt)}</p><pre class="preview-code">${escapeHTML(sample)}</pre><div class="preview-meta"><div><span>Linked to</span><strong>${escapeHTML(node.type)}</strong></div><div><span>State</span><strong>tracked</strong></div></div></div></aside>
    </div>`;
  }

  renderWorkflow() {
    const nodes = [
      { id: "gather", type: "input", title: "Gather evidence", subtitle: "Collect linked context", x: 60, y: 112 },
      { id: "validate", type: "quality", title: "Validate surface", subtitle: "Check interaction paths", x: 255, y: 67 },
      { id: "package", type: "build", title: "Package release", subtitle: "Create deliverable", x: 455, y: 162 },
      { id: "publish", type: "output", title: "Publish checkpoint", subtitle: "Commit the narrative", x: 652, y: 89 },
    ];
    const nodeMarkup = nodes.map((node) => `<article class="flow-node ${this.state.selectedFlowNode === node.id ? "selected" : ""}" data-flow-node="${node.id}" style="left:${node.x}px;top:${node.y}px"><div class="flow-node-type"><span>${node.type}</span><i></i></div><h4>${node.title}</h4><p>${node.subtitle}</p><div class="ports"><i></i><i></i></div></article>`).join("");
    const statusText = this.state.workflow.running ? `${this.state.workflow.phase} · ${this.state.workflow.progress}%` : this.state.workflow.phase;
    return `<div class="app-shell workflow"><header class="app-toolbar"><div class="toolbar-copy"><strong>release.flow</strong><span>4 nodes · deterministic run</span></div><div class="toolbar-actions"><button class="small-button" data-action="snapshot">Snapshot</button><button class="small-button primary" data-action="run-workflow">${this.state.workflow.running ? "Running…" : "Run workflow"}</button></div></header><section class="workflow-canvas"><svg class="flow-connections" viewBox="0 0 820 360" preserveAspectRatio="none"><path class="flow-connection" d="M206 155 C232 155, 226 116, 255 116"/><path class="flow-connection" d="M401 116 C425 116, 427 211, 455 211"/><path class="flow-connection" d="M601 211 C628 211, 624 138, 652 138"/></svg>${nodeMarkup}</section><footer class="workflow-footer"><span class="workflow-run-state ${this.state.workflow.running ? "running" : ""}"><i></i>${statusText}</span><div class="run-progress"><i style="width:${this.state.workflow.progress}%"></i></div></footer></div>`;
  }

  renderObservatory() {
    const running = this.state.processes.filter((process) => process.state === "running").length;
    const activity = this.state.activity.slice(0, 6).map((entry) => `<div class="log ${entry.type === "warning" ? "warn" : ""}"><time>${timeAgo(entry.time).padStart(4, " ")}</time><b>${entry.type === "warning" ? "WARN" : "EVENT"}</b><span>${escapeHTML(entry.title)} — ${escapeHTML(entry.detail)}</span></div>`).join("");
    const processes = this.state.processes.map((process) => `<div class="process ${process.state === "paused" ? "paused" : ""}"><i></i><div><strong>${escapeHTML(process.name)}</strong><span>${escapeHTML(process.detail)}</span></div><button data-process-action="toggle" data-process-id="${process.id}">${process.state === "running" ? "pause" : "resume"}</button></div>`).join("");
    const dynamic = this.state.workflow.running ? this.state.workflow.progress : 38;
    return `<div class="app-shell observatory"><header class="app-toolbar"><div class="toolbar-copy"><strong>Workspace telemetry</strong><span>transparent simulation · local only</span></div><div class="toolbar-actions"><span class="status-pill">streaming</span><button class="small-button" data-action="clear-terminal">Export log</button></div></header><div class="telemetry-grid"><section class="metric-card"><span>Active processes</span><strong>${running}</strong><em>+1 listening</em></section><section class="metric-card"><span>Event throughput</span><strong>${12 + Math.round(dynamic / 6)}<small>/m</small></strong><em>stable signal</em></section><section class="metric-card"><span>Checkpoint health</span><strong>${this.state.snapshots.length ? "100" : "84"}%</strong><em class="${this.state.snapshots.length ? "" : "warn"}">${this.state.snapshots.length ? "recoverable" : "snapshot advised"}</em></section></div><div class="observatory-main"><section class="telemetry-card"><header><strong>EVENT DENSITY</strong><span>last 12 minutes</span></header><div class="telemetry-chart"><svg viewBox="0 0 440 130" preserveAspectRatio="none"><defs><linearGradient id="telemetry-gradient" x1="0" x2="0" y1="0" y2="1"><stop stop-color="var(--orchid)" stop-opacity=".28"/><stop offset="1" stop-color="var(--orchid)" stop-opacity="0"/></linearGradient></defs><path class="chart-grid" d="M0 25H440M0 65H440M0 105H440"/><path fill="url(#telemetry-gradient)" d="M0 103 L35 96 L70 102 L105 73 L140 84 L175 55 L210 70 L245 42 L280 51 L315 24 L350 48 L385 30 L440 ${Math.max(15, 104 - dynamic)} L440 130 L0 130Z"/><path class="chart-line" style="stroke:var(--orchid)" d="M0 103 L35 96 L70 102 L105 73 L140 84 L175 55 L210 70 L245 42 L280 51 L315 24 L350 48 L385 30 L440 ${Math.max(15, 104 - dynamic)}"/></svg></div></section><section class="telemetry-card"><header><strong>PROCESS TABLE</strong><span>${running} alive</span></header><div class="process-list">${processes}</div></section><section class="telemetry-card"><header><strong>EVENT LOG</strong><span>append-only</span></header><div class="log-list">${activity || `<div class="log"><span>No recent signals.</span></div>`}</div></section></div></div>`;
  }

  renderTerminal() {
    const history = this.state.terminalHistory.map((entry) => {
      if (entry.kind === "input") return `<div class="terminal-line"><span class="prompt">aether@focus:~$</span><span>${escapeHTML(entry.text)}</span></div>`;
      return `<div class="terminal-line output ${entry.error ? "error" : ""}">${escapeHTML(entry.text)}</div>`;
    }).join("");
    return `<div class="terminal"><div class="terminal-output"><div class="terminal-welcome"><b>AetherOS local shell</b> · workspace-safe commands only\nType <span class="mint">help</span> to inspect the command surface.</div>${history}</div><form id="terminal-form" class="terminal-form"><label for="terminal-input">aether@focus:~$</label><input id="terminal-input" autocomplete="off" spellcheck="false" aria-label="Terminal command" autofocus /></form></div>`;
  }

  renderNotes() {
    const selected = this.state.notes.find((note) => note.id === this.state.selectedNoteId) || this.state.notes[0];
    const items = this.state.notes.map((note) => `<button class="note-item ${note.id === selected.id ? "active" : ""}" data-note="${note.id}"><strong>${escapeHTML(note.title || "Untitled note")}</strong><span>${escapeHTML(note.body.split("\n")[0] || "Empty note")}</span></button>`).join("");
    return `<div class="app-shell notes"><aside class="note-list"><header><small>FIELD NOTES</small><button data-action="new-note" aria-label="New note">+</button></header>${items}</aside><section class="note-editor"><header class="note-editor-header"><span>LOCAL / ${escapeHTML(selected.modified)}</span><span class="note-save-status">Saved locally</span></header><input class="note-title" data-note-field="title" value="${escapeHTML(selected.title)}" aria-label="Note title"/><textarea class="note-body" data-note-field="body" aria-label="Note content">${escapeHTML(selected.body)}</textarea></section></div>`;
  }

  renderSettings() {
    return `<div class="app-shell settings"><small>SYSTEM PREFERENCES</small><h2>Make the shell yours.</h2><p>Preferences are stored only in this browser’s local workspace.</p><section class="settings-section"><header><strong>Appearance</strong></header><div class="setting-row"><div><h4>Interface theme</h4><p>Switch the instrument between dim and bright modes.</p></div><div class="theme-options"><button class="theme-option ${this.state.theme === "dark" ? "active" : ""}" data-theme="dark" aria-label="Use dim theme"></button><button class="theme-option light ${this.state.theme === "light" ? "active" : ""}" data-theme="light" aria-label="Use bright theme"></button></div></div><div class="setting-row"><div><h4>Signal accent</h4><p>Reserve color for important state.</p></div><div class="accent-options">${Object.keys(accentMap).map((accent) => `<button class="accent ${this.state.accent === accent ? "active" : ""}" data-accent="${accent}" style="--accent:${accentMap[accent].value}" aria-label="Use ${accent} accent"></button>`).join("")}</div></div></section><section class="settings-section"><header><strong>Comfort</strong></header><div class="setting-row"><div><h4>Reduced motion</h4><p>Respect a quieter visual environment.</p></div><button class="toggle ${this.state.reducedMotion ? "on" : ""}" data-setting="reduced-motion" role="switch" aria-checked="${this.state.reducedMotion}"><i></i></button></div><div class="setting-row"><div><h4>Workspace snapshot</h4><p>${this.state.snapshots.length ? `${this.state.snapshots.length} local checkpoint${this.state.snapshots.length > 1 ? "s" : ""} available` : "No checkpoint has been captured yet."}</p></div><button class="small-button" data-action="${this.state.snapshots.length ? "restore" : "snapshot"}">${this.state.snapshots.length ? "Restore latest" : "Capture now"}</button></div></section><div class="privacy-callout"><i>◈</i><span><b>Local-first by design.</b> This prototype writes its demo workspace only to browser storage. It makes no network calls and collects no telemetry.</span></div></div>`;
  }

  renderDock() {
    document.querySelectorAll(".dock-app[data-open-app]").forEach((button) => {
      const id = button.dataset.openApp;
      const win = this.state.windows[id];
      button.classList.toggle("active", Boolean(win?.open && win.workspace === this.state.activeWorkspace && !win.minimized));
    });
  }

  renderLauncher() {
    this.dom.launcherGrid.innerHTML = Object.entries(appManifest).map(([id, app]) => `<button class="launcher-app" data-open-app="${id}"><span class="launch-icon ${app.tone}-glyph">${app.glyph}</span><span>${app.title}</span></button>`).join("");
  }

  renderNotifications() {
    const entries = this.state.activity.slice(0, 7);
    this.dom.notificationList.innerHTML = entries.length ? entries.map((entry) => `<article class="notification ${entry.type === "warning" ? "warning" : ""}"><i class="event-dot"></i><div><strong>${escapeHTML(entry.title)}</strong><p>${escapeHTML(entry.detail)}</p></div><time>${timeAgo(entry.time)}</time></article>`).join("") : `<div class="empty-state"><span>Signals cleared.<br/>New workspace events will arrive here.</span></div>`;
    this.dom.notificationButton.querySelector(".notification-dot")?.classList.toggle("hidden", entries.length === 0);
  }

  renderWorkspaceSwitcher() {
    document.querySelectorAll(".workspace").forEach((button) => button.classList.toggle("active", button.dataset.workspace === this.state.activeWorkspace));
  }

  commands() {
    const apps = Object.entries(appManifest).map(([id, app]) => ({ group: "Applications", icon: app.glyph, label: `Open ${app.title}`, detail: "Launch in current workspace", key: id === "terminal" ? "⌘ `" : "", run: () => this.openApp(id) }));
    const actions = [
      { group: "Actions", icon: "⌘", label: "Run release workflow", detail: "Start the deterministic delivery graph", key: "", run: () => this.runWorkflow() },
      { group: "Actions", icon: "◈", label: "Capture workspace snapshot", detail: "Save a recoverable local checkpoint", key: "", run: () => this.createSnapshot() },
      { group: "Actions", icon: "◐", label: `Switch to ${this.state.theme === "dark" ? "bright" : "dim"} theme`, detail: "Toggle the system appearance", key: "", run: () => this.setTheme(this.state.theme === "dark" ? "light" : "dark") },
    ];
    const nodes = graphNodes.map((node) => ({ group: "Signals", icon: node.type === "system" ? "◔" : node.type === "decision" ? "◆" : "○", label: `Focus ${node.title}`, detail: node.description, key: "", run: () => this.selectNode(node.id) }));
    return [...apps, ...actions, ...nodes];
  }

  renderPaletteList() {
    const needle = this.dom.paletteInput.value.trim().toLowerCase();
    this.paletteResults = this.commands().filter((entry) => `${entry.label} ${entry.detail}`.toLowerCase().includes(needle));
    this.paletteIndex = Math.min(this.paletteIndex, Math.max(0, this.paletteResults.length - 1));
    let lastGroup = "";
    this.dom.paletteContent.innerHTML = this.paletteResults.length ? this.paletteResults.map((entry, index) => {
      const heading = entry.group !== lastGroup ? `<div class="palette-group-label">${entry.group}</div>` : "";
      lastGroup = entry.group;
      return `${heading}<button class="palette-item ${index === this.paletteIndex ? "selected" : ""}" data-palette-index="${index}"><span class="palette-icon">${entry.icon}</span><span class="palette-copy"><strong>${escapeHTML(entry.label)}</strong><span>${escapeHTML(entry.detail)}</span></span>${entry.key ? `<kbd>${entry.key}</kbd>` : ""}</button>`;
    }).join("") : `<div class="empty-state"><span>No matching system surface.<br/>Try “workflow”, “terminal”, or “architecture”.</span></div>`;
    this.dom.paletteContent.querySelector(".selected")?.scrollIntoView({ block: "nearest" });
  }

  togglePalette() {
    if (this.paletteOpen) return this.closePalette();
    this.hidePanel("launcher");
    this.hidePanel("notifications");
    this.paletteOpen = true;
    this.dom.palette.classList.remove("hidden");
    this.dom.paletteInput.value = "";
    this.paletteIndex = 0;
    this.renderPaletteList();
    window.setTimeout(() => this.dom.paletteInput.focus(), 0);
  }

  closePalette() {
    this.paletteOpen = false;
    this.dom.palette.classList.add("hidden");
  }

  togglePanel(name) {
    const panel = name === "launcher" ? this.dom.launcher : this.dom.notifications;
    const other = name === "launcher" ? this.dom.notifications : this.dom.launcher;
    this.closePalette();
    other.classList.add("hidden");
    panel.classList.toggle("hidden");
  }

  hidePanel(name) {
    const panel = name === "launcher" ? this.dom.launcher : this.dom.notifications;
    panel.classList.add("hidden");
  }

  focusWindow(id, render = true) {
    const win = this.state.windows[id];
    if (!win) return;
    this.state.activeWindowId = id;
    win.z = Math.max(...Object.values(this.state.windows).map((item) => item.z)) + 1;
    this.persist();
    if (render) this.renderWindows();
    else {
      document.querySelectorAll(".window").forEach((windowElement) => windowElement.classList.toggle("active", windowElement.dataset.windowId === id));
      const element = document.querySelector(`.window[data-window-id="${id}"]`);
      if (element) element.style.zIndex = win.z;
    }
  }

  openApp(id) {
    const win = this.state.windows[id];
    if (!win) return;
    win.open = true;
    win.minimized = false;
    win.workspace = this.state.activeWorkspace;
    this.focusWindow(id, false);
    this.pushEvent(`Opened ${appManifest[id].title}`, "The application joined the current workspace.", "success", true);
    this.hidePanel("launcher");
    this.hidePanel("notifications");
    this.closePalette();
    this.persist();
    this.renderAll();
  }

  windowAction(id, action) {
    const win = this.state.windows[id];
    if (!win) return;
    if (action === "close") {
      win.open = false;
      this.pushEvent(`Closed ${appManifest[id].title}`, "The window remains available from the launcher.", "success", true);
      const fallback = Object.entries(this.state.windows).find(([, item]) => item.open && item.workspace === this.state.activeWorkspace)?.[0] || "mission";
      this.state.activeWindowId = fallback;
    }
    if (action === "minimize") {
      win.minimized = true;
      this.pushEvent(`Minimized ${appManifest[id].title}`, "The application is still running in this workspace.", "success", true);
    }
    if (action === "maximize") {
      if (!win.maximized) win.restoreBounds = { x: win.x, y: win.y, w: win.w, h: win.h };
      win.maximized = !win.maximized;
      if (!win.maximized && win.restoreBounds) Object.assign(win, win.restoreBounds);
      this.focusWindow(id, false);
    }
    this.persist();
    this.renderAll();
  }

  switchWorkspace(workspace) {
    if (workspace === this.state.activeWorkspace) return;
    this.state.activeWorkspace = workspace;
    const candidate = Object.entries(this.state.windows).filter(([, win]) => win.open && win.workspace === workspace && !win.minimized).sort(([, a], [, b]) => b.z - a.z)[0];
    this.state.activeWindowId = candidate?.[0] || "mission";
    this.pushEvent(`Switched to ${workspace} space`, "Window layouts stay isolated by workspace.", "success", true);
    this.persist();
    this.renderAll();
  }

  selectNode(id) {
    const node = nodeById(id);
    this.state.selectedNodeId = node.id;
    const linkedFile = seedFiles.find((file) => file.node === node.id);
    if (linkedFile) this.state.selectedFileId = linkedFile.id;
    this.openApp("constellation");
    this.pushEvent(`Focused ${node.title}`, "The linked artifacts and relationships are now in view.", "success", true);
    this.persist();
    this.renderAll();
  }

  selectFile(id) {
    const file = fileById(id);
    this.state.selectedFileId = id;
    this.state.selectedNodeId = file.node;
    this.pushEvent(`Inspected ${file.title}`, "The artifact is linked back to the project constellation.", "success", true);
    this.persist();
    this.renderAll();
  }

  selectNote(id) {
    this.state.selectedNoteId = id;
    this.persist();
    this.renderWindows();
  }

  newNote() {
    const note = { id: `note-${Date.now()}`, title: "Untitled note", body: "", modified: "just now" };
    this.state.notes.unshift(note);
    this.state.selectedNoteId = note.id;
    this.pushEvent("Created field note", "A local note was added to the workspace.", "success", true);
    this.persist();
    this.renderAll();
    window.setTimeout(() => document.querySelector(".note-title")?.focus(), 0);
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.applyPreferences();
    this.pushEvent(`Theme set to ${theme === "light" ? "bright" : "dim"}`, "The appearance preference was saved locally.", "success", true);
    this.persist();
    this.renderAll();
  }

  setAccent(accent) {
    if (!accentMap[accent]) return;
    this.state.accent = accent;
    this.applyPreferences();
    this.pushEvent("Signal accent updated", `The ${accent} accent now marks important state.`, "success", true);
    this.persist();
    this.renderAll();
  }

  toggleReducedMotion() {
    this.state.reducedMotion = !this.state.reducedMotion;
    this.applyPreferences();
    this.pushEvent(this.state.reducedMotion ? "Reduced motion enabled" : "Motion restored", "The preference applies across the desktop shell.", "success", true);
    this.persist();
    this.renderAll();
  }

  pushEvent(title, detail, type = "success", silent = false) {
    this.state.activity.unshift({ id: `event-${Date.now()}-${Math.random().toString(16).slice(2)}`, title, detail, type, time: Date.now() });
    this.state.activity = this.state.activity.slice(0, 15);
    if (!silent) this.showToast(title, detail);
  }

  showToast(title, detail) {
    const element = document.createElement("article");
    element.className = "toast";
    element.innerHTML = `<span>✓</span><div><strong>${escapeHTML(title)}</strong><p>${escapeHTML(detail)}</p></div>`;
    this.dom.toastStack.append(element);
    window.setTimeout(() => element.remove(), 3600);
  }

  createSnapshot() {
    const snapshot = {
      id: `snapshot-${Date.now()}`,
      time: Date.now(),
      label: `Checkpoint ${this.state.snapshots.length + 1}`,
      payload: {
        theme: this.state.theme,
        accent: this.state.accent,
        reducedMotion: this.state.reducedMotion,
        activeWorkspace: this.state.activeWorkspace,
        activeWindowId: this.state.activeWindowId,
        windows: JSON.parse(JSON.stringify(this.state.windows)),
        selectedNodeId: this.state.selectedNodeId,
        selectedFileId: this.state.selectedFileId,
        selectedNoteId: this.state.selectedNoteId,
        notes: JSON.parse(JSON.stringify(this.state.notes)),
      },
    };
    this.state.snapshots.unshift(snapshot);
    this.state.snapshots = this.state.snapshots.slice(0, 3);
    this.pushEvent("Workspace checkpoint captured", "A recoverable local snapshot is ready.");
    this.persist();
    this.renderAll();
  }

  restoreSnapshot() {
    const snapshot = this.state.snapshots[0];
    if (!snapshot) {
      this.showToast("No checkpoint yet", "Capture a local snapshot before restoring context.");
      return;
    }
    Object.assign(this.state, JSON.parse(JSON.stringify(snapshot.payload)));
    this.pushEvent("Checkpoint restored", `${snapshot.label} returned the workspace to a known state.`);
    this.persist();
    this.renderAll();
  }

  runWorkflow() {
    if (this.state.workflow.running) {
      this.showToast("Release flow already running", `${this.state.workflow.progress}% complete — watch it in Observatory.`);
      return;
    }
    this.state.workflow = { running: true, progress: 0, phase: "Gathering evidence" };
    const process = this.state.processes.find((item) => item.id === "flow-runner");
    if (process) Object.assign(process, { state: "running", detail: "gathering evidence" });
    this.pushEvent("Release workflow started", "The deterministic delivery graph is now executing.");
    this.persist();
    this.renderAll();
    const stages = ["Gathering evidence", "Validating surface", "Packaging release", "Publishing checkpoint"];
    this.workflowTimer = window.setInterval(() => {
      this.state.workflow.progress = Math.min(100, this.state.workflow.progress + 8);
      const stage = Math.min(stages.length - 1, Math.floor(this.state.workflow.progress / 26));
      this.state.workflow.phase = stages[stage];
      if (process) process.detail = `${this.state.workflow.phase.toLowerCase()} · ${this.state.workflow.progress}%`;
      if ([24, 48, 72].includes(this.state.workflow.progress)) this.pushEvent(stages[stage], "Workflow advanced to the next deterministic checkpoint.", "success", true);
      if (this.state.workflow.progress >= 100) {
        window.clearInterval(this.workflowTimer);
        this.workflowTimer = null;
        this.state.workflow = { running: false, progress: 100, phase: "Release checkpoint published" };
        if (process) Object.assign(process, { state: "paused", detail: "checkpoint published" });
        this.pushEvent("Release checkpoint published", "The flow completed and the workspace is ready for review.");
      }
      this.persist();
      this.renderAll();
    }, 480);
  }

  processAction(action, id) {
    const process = this.state.processes.find((item) => item.id === id);
    if (!process || action !== "toggle") return;
    process.state = process.state === "running" ? "paused" : "running";
    process.detail = process.state === "running" ? "resumed locally" : "paused by operator";
    this.pushEvent(`${process.name} ${process.state}`, "The process table reflects an explicit local action.");
    this.persist();
    this.renderAll();
  }

  clearTerminal() {
    this.state.terminalHistory = [];
    this.pushEvent("Terminal history cleared", "The local command buffer was reset.");
    this.persist();
    this.renderAll();
  }

  executeTerminal(command) {
    const [verb = "", ...args] = command.toLowerCase().split(/\s+/);
    const argument = args.join(" ");
    this.state.terminalHistory.push({ kind: "input", text: command });
    let response = "";
    let error = false;
    if (verb === "help") {
      response = "help                 show safe workspace commands\nls                   list linked local artifacts\nopen <app|graph>     bring an application into focus\nfocus <signal>       inspect a constellation signal\nrun                  start the release workflow\nstatus               print workspace health\nsnapshot | restore   capture or restore a local checkpoint\ntheme [dim|bright]   change interface appearance\nclear                clear this terminal buffer";
    } else if (verb === "ls") {
      response = seedFiles.map((file) => `${file.kind.padEnd(5)} ${file.title}`).join("\n");
    } else if (verb === "open") {
      const aliases = { graph: "constellation", constellation: "constellation", flow: "workflow", workflow: "workflow", files: "files", terminal: "terminal", notes: "notes", observatory: "observatory", mission: "mission", settings: "settings" };
      const app = aliases[argument];
      if (!app) { response = `open: unknown surface '${argument || ""}'`; error = true; } else { this.openApp(app); response = `opened ${appManifest[app].title} in ${this.state.activeWorkspace} space`; }
    } else if (verb === "focus") {
      const match = graphNodes.find((node) => node.id.includes(argument.replace(/\s+/g, "-")) || node.title.toLowerCase().includes(argument));
      if (!match) { response = `focus: no signal matched '${argument || ""}'`; error = true; } else { this.selectNode(match.id); response = `focused ${match.title} and linked artifact`; }
    } else if (verb === "run") {
      this.runWorkflow(); response = "release workflow dispatched";
    } else if (verb === "status") {
      const running = this.state.processes.filter((item) => item.state === "running").length;
      response = `workspace: nominal\nprocesses: ${running} running\nflow: ${this.state.workflow.running ? `${this.state.workflow.progress}% / ${this.state.workflow.phase}` : this.state.workflow.phase}\nlocal vault: ${this.state.snapshots.length ? "checkpoint available" : "no checkpoint yet"}`;
    } else if (verb === "snapshot") {
      this.createSnapshot(); response = "workspace checkpoint captured locally";
    } else if (verb === "restore") {
      if (!this.state.snapshots.length) { response = "restore: no checkpoint available"; error = true; } else { this.restoreSnapshot(); response = "latest workspace checkpoint restored"; }
    } else if (verb === "theme") {
      if (["bright", "light"].includes(argument)) { this.setTheme("light"); response = "appearance set to bright"; } else if (["dim", "dark"].includes(argument)) { this.setTheme("dark"); response = "appearance set to dim"; } else { response = "theme: use 'theme dim' or 'theme bright'"; error = true; }
    } else if (verb === "clear") {
      this.state.terminalHistory = [];
      this.persist();
      this.renderWindows();
      return;
    } else {
      response = `${verb || "command"}: not found. Try 'help'.`;
      error = true;
    }
    this.state.terminalHistory.push({ kind: "output", text: response, error });
    this.state.terminalHistory = this.state.terminalHistory.slice(-60);
    this.persist();
    this.renderAll();
    window.setTimeout(() => {
      const output = document.querySelector(".terminal-output");
      if (output) output.scrollTop = output.scrollHeight;
      document.querySelector("#terminal-input")?.focus();
    }, 0);
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const time = document.getElementById("clock-time");
      const date = document.getElementById("clock-date");
      if (time) time.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      if (date) date.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
    };
    update();
    window.setInterval(update, 20000);
  }
}

new AetherOS();
