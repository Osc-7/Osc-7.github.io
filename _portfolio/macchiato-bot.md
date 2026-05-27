---
title: "macchiatoBot"
excerpt: "A daemon-first LLM assistant with OS kernel-like scheduling, tool execution, and multi-channel frontends (CLI, Feishu, MCP)."
collection: portfolio
github_url: "https://github.com/Osc-7/macchiatoBot"
link: https://github.com/Osc-7/macchiatoBot
date: 2026-03-01
---

## Project Overview

macchiatoBot is a daemon-first, tool-driven LLM assistant. The daemon owns sessions, scheduling, IPC, tool execution, permissions, memory, and frontend integration; CLI, Feishu, MCP, and automation jobs all enter through that shared runtime.

The design separates **reasoning from execution**: `AgentCore` handles prompts and LLM routing, while `AgentKernel` executes tools, checks permissions, and manages context compression.

## Highlights

* **Daemon-first runtime** with session registry, task queue, and stable IPC
* **Kernel-style scheduling** via `KernelScheduler` and `CorePool`
* **Multi-channel frontends** including CLI, Feishu, MCP, and automation triggers
* **Remote workspace mode** for authorized local tool execution via `macchiato-remote`

## Tech Stack

* Python, `uv`
* LLM providers with pluggable tool-calling loop
* MIT License

Source code and docs: [github.com/Osc-7/macchiatoBot](https://github.com/Osc-7/macchiatoBot)
