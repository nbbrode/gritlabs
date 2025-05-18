# A Minimalist PM System


## 1. Purpose

A structured, file-based system for sprint-based development and documentation, designed to support traceability, structure, and consistency in interface-aware environments. This workflow defines how to organize and evolve project work in an environment that supports Markdown documents for tracking knowledge, behavior, and structure. It eliminates dependency on external tooling by organizing this material into traceable, time-boxed sprint folders.

---

## 2. Folder and File Layout

The top-level structure assumes a project workspace rooted at a location like:

```
/Work/
```

Each sprint folder is named with a **three-digit numeric prefix** (`001`, `002`, etc.) and contains all relevant documents and subfolders.

#### Example Layout:

```
/Work/
├── 001/
│   ├── _artifacts/
│   ├── _assets/
│   ├── _backlog/
│   ├── _conversations/
│   ├── _recycle-bin/
│   ├── _requests/
│   ├── _scripts/
│   ├── _templates/
│   ├── 01. First Case Study.md
│   └── 02. Second Case Study.md
├── 002/
│   └── ...
```

#### Folder Definitions:

#### Folder Definitions: 

| Folder | Purpose | 
| --- | --- | 
| 001, 002, ... | Time-boxed sprint folders (e.g., one per 2-week sprint). | 
| _artifacts/ | Holds content and documents produced during the sprint as outputs of the process. | 
| _assets/ | Shared templates, scripts, and design assets. | 
| _backlog/ | Staging area for unassigned or future sprint content. | 
| _conversations/ | Informal reasoning, notes, or AI transcripts. | 
| _recycle-bin/ | Deprecated documents preserved for historical traceability. | 
| _requests/ | Contains request documents specifying stakeholder-facing intent. | 
| _scripts/ | Executable helper scripts (e.g., ID generators, scaffolds). | 
| _templates/ | Predefined document and code scaffolds used to standardize structured documents. | 

> **Note:** All folders prefixed with `_` are considered scoped substructures within a sprint.

---

## 3. Sprint Folder Rules

- Sprint folders must be named as **three-digit numeric strings**, starting from `001`.
- Each sprint lasts exactly **2 calendar weeks**, running from **Monday through Sunday**.
- **Sprint 001** begins on **May 5, 2025**.
- **Sprint 002** begins on **May 19, 2025**, and so on—every new sprint starts **14 days after the previous one**.

To compute the start date of any sprint:

```
Sprint N start date = May 5, 2025 + (N - 1) × 14 days
```

Where `N` is the sprint number.  
For example, **Sprint 010** begins on **August 11, 2025**.


> The allowed sprint range is from `001` to `999`.

---

## 4. File Naming and Usage

* Steps taken can be tracked in Markdown documents
* Each markdown document must begin with a **two-digit numeric prefix** (e.g., `01.`, `02.`) indicating ordering within the sprint.
* File names should use human-readable titles for clarity, followed by `.md`.



Examples:

```
01. Initial Setup.md
02. Data Collection Case.md
```

---

## 5. Lifecycle Conventions

#### Sprint Start:

* A new folder is created using the next incremental sprint ID (e.g., `003/`).
* Documents may be copied forward from a previous sprint and renumbered.

#### Sprint In Progress:

* Documents are created or updated.
* Supplemental files are saved in appropriate subfolders.

#### Sprint Close:

* All completed documents remain in place.
* Incomplete items are copied to the next sprint (with new names).
* Obsolete sketches or deprecated content is moved to `_recycle-bin/`.

---

## 6. Validation

Sprint folders and documents must meet the following criteria:

#### Folder Validity

* Must contain `_recycle-bin/`
* May include `_artifacts/`, `_assets/`, `_conversations/`, `_requests/`, `_scripts`, `_templates`


#### File Validity

* Document numbering (`01.`, `02.`, etc.) must reset each sprint
* Validation is semantic — compliance is judged based on structure, not file presence or formatting style


---

## 7. Summary

This folder-based workflow supports:

* Clear sprint separation
* Simple structure with no external tooling required
* Readable, editable files in standard markdown

It is intentionally minimal, durable, and adaptable across different projects or teams.
