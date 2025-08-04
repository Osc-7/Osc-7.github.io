---
title: "Schemer"
excerpt: "A compiler for the Scheme language, written entirely in Scheme itself. This project explores the core concepts of compilation, including parsing, semantic analysis, and code generation."
collection: portfolio
github_url: "https://github.com/Osc-7/Schemer"
---

## Project Overview

This project is a self-hosting compiler for a subset of the Scheme programming language, implemented entirely within Scheme. It demonstrates a deep understanding of compiler construction and the powerful meta-circular nature of Lisp-family languages.

The compiler processes Scheme source code and translates it into a target representation, tackling the fundamental stages of modern compilation. Building a compiler in the very language it compiles is a classic challenge in computer science, showcasing both the expressiveness of the language and a solid grasp of theoretical concepts.

## Key Stages & Features

* **Lexical Analysis & Parsing**: The compiler first tokenizes the S-expression-based source code and then parses it into an Abstract Syntax Tree (AST), creating a structured, hierarchical representation of the code's logic.

* **Semantic Analysis**: It analyzes the AST to check for semantic correctness, ensuring that variables are properly defined and procedures are used with the correct arity, effectively building a symbol table and performing type checking.

* **Intermediate Representation (IR)**: The compiler may transform the AST into an intermediate representation, which is often a more streamlined and machine-friendly format, making optimizations easier to implement.

* **Code Generation**: The final stage involves traversing the optimized IR or AST to generate executable code for a target platform (e.g., assembly code, C, or another low-level representation).

## Technology & Concepts

* **Language**: Scheme
* **Core Concepts**: Compilers, Self-Hosting, Bootstrapping, Abstract Syntax Trees (AST), Code Generation, Lexical Scoping, Closures.

This project is a testament to a robust understanding of programming language theory and practice. You can explore the complete source code and design on GitHub.
