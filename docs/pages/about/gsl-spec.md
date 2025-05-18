

# GSL Specification (Version 1.0)

## GSL v1.0

Grit Structured Language (GSL) defines a structural interface for documenting intent, behavior, and verification across technical systems.

It is designed for use within `case-study` and `request` documents, which serve as the primary vehicles for structured reasoning and traceable documentation.  
- `case-study` documents are authored by **Feature Implementers**, who investigate problems, design solutions, and deliver working behavior.  
- `request` documents are authored by **Feature Requesters**, who define intended behavior and expected outcomes through structured use cases and test cases.  

All other document types—`artifact` and `conversation`—are intentionally unstructured. They may be referenced within a case-study by time and subject matter but do not participate directly in GSL structural elements.


This specification defines the canonical tags, structural contracts, semantic rules, and philosophical principles that govern GSL. It includes interface layer mappings, compliance rules, extensibility boundaries, and the structural hierarchy required for valid usage.




## Section 1: Formal Principles

This section defines the core principles that govern GSL’s structure, semantics, extensibility, and operational boundaries.  
Each is assigned a unique `GSL‑###` ID and considered authoritative within the system.



### GSL-01: Crimeless Consequence Principle

> Violations of GSL rules are not punished. They are either treated as **system leakage** — invalid but structurally recognizable — or as **outside the system**, never having engaged with GSL at all.  
> In both cases, the result is the same: exclusion from structural participation.

GSL defines a clear structural boundary: it declares, with precision, what **is** part of GSL and what **is not**.

Content that does not follow GSL’s required structure, tags, or rules is **not rejected** — but it is **excluded from GSL structural participation**.

Though not well-formed or structured, some of this content may use GSL features for improvement — for example, documents that attempted GSL formatting but failed validation. These are treated as **system leakage** until corrected.


Other content exists entirely **outside** the GSL boundary. This includes: 

- Ad hoc notes and informal sketches    

- Undocumented tests or raw outputs 

- External documentation or specifications  

- Third-party libraries 

- Vendor frameworks, tools, or platforms    

These are treated as **blackbox components**: present in the environment, but structurally invisible to GSL.

Whether invalid or external, such artifacts are not subject to parsing, validation, or traceability.




#### Key Distinctions:

#### ✅ **Fully Compliant**
- Structured using GSL tags
- Valid use of structural elements
- Participates in traceability and compliance

#### ⚠️ **System Leakage**
- **Attempted** to follow GSL structure
- **Invalid** use of tags, nesting, or formatting


#### ❌ **Outside the System**
- Not authored with GSL tags at all
- Defined by preexisting components: tools, frameworks, libraries, or documents not governed by GSL
- **Never attempted** to be part of GSL
- Ignored by structural rules and compliance mechanisms
- Treated as a blackbox by the system


> **System leakage = structurally invalid inside the boundary**  
> **Outside the system = never entered the boundary**








#### 🔁 Compliance Flow Diagram

```text
       +------------------+
       |GSL Element Usage?|
       +--------+---------+
                | Yes
                v
     +----------v-----------+
     |  Valid Structure?    |
     +----------+-----------+
                |
         +------+------+   
         |             |   
       Yes            No   
         |             |   
+--------v--+      +---v---------+   
| Fully     |      | System      |   
| Compliant |      | Leakage     |   
+-----------+      +-------------+   

                ^
                |
              No
                |
       +--------v---------+
       | Outside the      |
       | GSL System       |
       +------------------+

```

#### 📐 The Crimeless Consequence Principle’s Effect on Automated Testing

`GSL-01` reshapes expectations around **what kinds of tests matter**, **where they belong**, and **how they relate to structural participation**.

Test cases written against GSL-structured inputs (such as `request` documents, acceptance criteria, and use cases) can be tested for **structural validity**. These tests trace to GSL elements and can be audited as formal evidence of intent and coverage. In this context, **more tests improve quality** — because each test reinforces a declared behavior and contributes to completeness in a controlled system.




However, not all systems are built entirely from GSL-defined components. Many real-world systems rely on:

- Prebuilt libraries  
- External tools and platforms  
- Third-party APIs or frameworks  
- Legacy modules outside the GSL boundary  

These components are treated as **blackbox artifacts**. GSL does not (and cannot) structurally validate their internals.

> In these cases, **the smallest meaningful testable unit is the integration point** — not the internal implementation.

Classic unit testing targets the smallest testable unit. In GSL, that unit is redefined as the **integration point** — the boundary between declared structure and external dependency.


Attempting to test internal logic of blackbox components results in what Grit Labs calls **phantom tests** — tests that appear to increase quality, but in practice add no traceable value and can obscure what actually matters.

- GSL encourages **fewer, higher-value automated tests**.  
- It treats **integration points as the smallest valid testable unit** in systems that incorporate external components.  
- It discourages the notion of internally testing third-party libraries and vendor frameworks.  
- It treats automated tests as **evidence of contract fulfillment**, not as a substitute for clarity.  
- In high-composition systems, **confidence comes from testing the seams**, not the internals.

> In GSL, the most meaningful unit test may be an integration test — because that's where structure becomes real.

---
### GSL-02: Documentation Structure Rule

> In GSL, there are four document types: `case-study`, `request`, `artifact`, and `conversation`.

- `case-study` and `request` documents are the **only** types that use **GSL canonical structure**.
- `artifact` and `conversation` documents are intentionally **unstructured**. They must not use canonical GSL tags, but may still be referenced.

Unstructured documents may be **contextually linked** to a structured document by:

- **Time alignment** — appearing in the same `sprint`
- **Topical relevance** — addressing the same subject area
- **Explicit reference** — cited in a timeline, cross-linked by declaration, or mentioned in prose

This structure keeps GSL lightweight where formality isn’t needed, while enabling precise traceability through structured documents.

---

### GSL-03: Interface Layer Mapping Principle

GSL adopts the interface worldview defined in [Grit Labs – An Interface Perspective](interface-perspective.md), which organizes systems into three layers: **Knowledge Interfaces**, **Behavior Interfaces**, and **Integration Interfaces**.


Each layer maps to specific GSL structures and applies differently depending on the document type.



#### Knowledge Interfaces

Define how understanding is captured and made traceable.

- Represented by the overall structure of the document.
- Applies to: `case-study`, `request`
- Key elements:
  - `<gsl-document>` — document wrapper
  - `doc-type` — declares whether it is a `case-study` or a `request`
  - `declaration-id`, `<gsl-title>`, `<gsl-owner>`


#### Behavior Interfaces

Define what the system should do — expressed as observable behavior and testable outcomes.

#### In `case-study` documents:

Behavior is expressed as a traceable sequence of engineering phases:

- `<gsl-problem>` — Identifies a condition, bug, or constraint requiring resolution.
- `<gsl-analysis>` — Explores root causes, contributing factors, or background context.
- `<gsl-design>` — Proposes a structured or strategic response to the problem.
- `<gsl-implementation>` — Records what was actually done; the actions taken, code written, or configuration deployed.

These elements are siblings — they do not nest structurally within each other.  
Each plays a distinct role in documenting the evolution of a system from problem to resolution.

Tests associated with a case-study are typically expressed as **automated unit tests** or implementation-level validation, and are not represented using `<gsl-test-case>`.

**Case-Study Behavioral Phases:**

```
<gsl-problem>
<gsl-analysis>
<gsl-design>
<gsl-implementation>
```


#### In `request` documents:

Behavior is modeled through the testable intent of the Feature Requester:


- `<gsl-product>` → `<gsl-feature>` → `<gsl-use-case>`  
  → (containing one or more of:)
  - `<gsl-user-story>`
  - `<gsl-acceptance-criteria>`
  - `<gsl-scenario>`

Each of these may contain:
- `<gsl-test-case>` — required for behavior to be validated
- All behavior elements must include `<gsl-title>` and `<gsl-details>`

**Request Document Behavior Hierarchy:**

```
Product
  └── has-a → Product   (recursive; e.g., platform → module)
        └── has-a → Feature
              └── has-a → Use Case
                    ├── has-a → User Story*
                    │       └── has-a → Test Case*
                    ├── has-a → Acceptance Criteria*
                    │       └── has-a → Test Case*
                    └── has-a → Scenario*
                            └── has-a → Test Case*
```

(* indicates 0 to many allowed)



#### Integration Interfaces

Define the structure of GSL documents — not the application under development.

These interfaces establish how structural elements are declared, validated, and extended within the GSL specification itself. They form the internal grammar and shape of GSL — the contract that governs how documents are interpreted.

- Enforce structural containment, formatting, and extensibility rules  
- Define the core schema and validation model for GSL-compliant documents  
- Enable consistency across knowledge, behavior, and integration layers  

#### Core model primitives include:
- `<gsl-title>` — defines the title of a section or document  
- `<gsl-details>` — contains descriptive freeform content  
- `<gsl-label>` — assigns a display name to a structural element  

#### Extensibility
- Extension is permitted beneath `<gsl-use-case>` in `request` documents  
- Future extensions must preserve compatibility with the GSL structural validator




#### Document-Specific Structural Schemas


| Document Type | Required Structure                                                                 | Test Expression                      |
|---------------|--------------------------------------------------------------------------------------|--------------------------------------|
| `case-study` | `<gsl-problem>` → ... → `<gsl-implementation>` | Implementation-level validation (e.g., unit tests) |
| `request`     | `<gsl-product>` → `<gsl-feature>` → `<gsl-use-case>` → intent + `<gsl-test-case>`   | Written, structured test cases       |



> `artifact` and `conversation` documents remain unstructured, but may be linked by time and subject matter.

This layered architecture ensures that GSL documents remain both structurally sound and purpose-aligned — enabling testability without enforcing uniformity.


GSL operates within a minimalist, folder-based working environment where each time-boxed sprint is represented by a three-digit folder (e.g., `001`, `002`, `003`).  

Inside each sprint folder, the following subfolders are conventionally used:

- `_artifacts/` — Holds content and documents **produced** during the sprint as outputs of the process.
- `_assets/` — Stores supporting files such as diagrams, templates, or code snippets.
- `_backlog/` (root-level) — Stages future work not yet assigned to a sprint.
- `_conversations/` — Contains informal transcripts, Q&A, or brainstorming notes.
- `_recycle-bin/` — Preserves deprecated content for traceability.
- `_requests/` — Contains `request` documents.
- `_scripts/`  — Executable helper scripts that auto-generate or validate structured values (e.g., `declaration-id`).
- `_templates/` — Predefined document and code scaffolds used to standardize structured documents.






GSL documents (especially case-studies) may also appear directly in the root of the sprint folder, numbered sequentially (e.g., `01. Using BuildKit to Speed Up Builds in Docker.md`, `02. Global Exception Handling & Basic Middlewares.md`).

This environment provides a lightweight alternative to external project management tools and is designed for version control, traceability, and human readability.

#### Primitive Elements

Integration Interfaces define the structure of GSL itself — not the application. These are responsible for encoding semantic meaning, metadata, and traceability.

They include the following primitive elements:

- `<gsl-title>` — A short, human-readable title of the section.
- `<gsl-details>` — A narrative body describing the context, intent, or implementation (required).
- `<gsl-label>` — Contains the display name of the element.
- `<gsl-owner>` — A required element indicating the responsible party for the document.
- `<gsl-time-clock>` — An optional element used to track working time, often supplemented with `<gsl-manual-time>` and `<missed-time>`.

These primitives are foundational to traceability and are required or allowed according to the document’s structure and purpose.

---

### GSL-04: Testing Philosophy

> The universe of possible tests is infinite. Whether to include a test is a judgment call by the test writer and/or test taker.

- Tests may exist at any granularity — from high-level system behavior to individual units of code.
- Tests are entirely optional in GSL. Their absence does not invalidate a document.

    **However:**

- **Automated Unit Tests** must reference the entity they validate using `linked-ref`. These are typically used in `case-study` documents, anchored to `<gsl-implementation>` or its related phases.
- **Structured Test Cases** must be expressed as `<gsl-test-case>` elements nested beneath `<gsl-user-story>`, `<gsl-acceptance-criteria>`, or `<gsl-scenario>`. These are used in `request` documents and anchored via the Product hierarchy.

> For a test to be considered GSL-compliant, it must be properly anchored to its surrounding structure — either by reference (`linked-ref`) or by containment within a defined context.

Unanchored or undocumented tests may still serve internal or exploratory purposes, but they fall **outside the boundary of GSL**.



---



### GSL-05: Coordinated Convention Principle

> A bad convention followed by everyone is a good convention.

GSL favors alignment and consistency over theoretical correctness — shared language builds operational clarity.

This principle extends beyond surface-level naming or syntax. In GSL, **rules, definitions, structures, and conventions** are expected to be:

- Coordinated
- Durable
- Carefully evolved

Whenever a new element, tag, pattern, rule, or meaning is introduced, it must be added in a way that:

- Does **not break existing usage**
- Follows the spirit of the Open-Closed Principle (OCP):  
  > *“Open for extension, closed for modification.”*


GSL is a long-lived system. Change is allowed — but it is slow, explicit, and always structured.

---

### GSL-06: Structured Flexibility Principle

> GSL allows flexible, context-specific expression, so long as they do not violate the fixed structures.

The **structural schema** defines the non-negotiable structural rules of GSL. It includes:

1. **Document-level infrastructure**
2. **Content-level structural tags**
3. **Integration interface primitives**
4. **GSL Folder-based Workflow**

Everything else — including extensions, formatting, and domain-specific expressions — is flexible.



#### Structural Schema Constraints

**Document-level Schema:**

- `<gsl-document>` — required root element in all GSL-compliant case-studies
  - Must include `doc-type="case-study"` or `doc-type="request"`
  - Must include a valid `declaration-id`
  - Must be assigned to a `sprint`
- `<gsl-owner>` — required child of `<gsl-document>`, identifying the responsible party

**Content-level Schema:**

- `<gsl-product>` → must own one or more `<gsl-feature>`
- `<gsl-feature>` → must own one or more `<gsl-use-case>`
- `<gsl-use-case>` → must include `<gsl-title>` and `<gsl-details>`
- `<gsl-user-story>`, `<gsl-acceptance-criteria>`, `<gsl-scenario>` → optional children of `<gsl-use-case>`, each must include `<gsl-title>` and `<gsl-details>`
- `<gsl-test-case>` → may appear under any of the above, and must include `<gsl-title>` and `<gsl-details>`
- `case-study` lifecycle elements (`<gsl-problem>`, `<gsl-analysis>`, `<gsl-design>`, `<gsl-implementation>`) must link properly and follow the required event sequence if used

**Integration Interface Primitives:**

- `<gsl-title>` — title useful for most structural elements
- `<gsl-details>` — descriptive body useful for most narrative elements
- `<gsl-label>` — useful to display the element name in documentation

Only these three elements may contain free-form text.  
All narrative content must be expressed within them.



You may **extend around the structural schema**, but never break it.  

---

### GSL-07: Situational Anchoring Principle

> A test-case is only meaningful in GSL when it is anchored to a defined context.

In GSL, that context is established structurally: every `<gsl-test-case>` must be nested within one of the following:

- `<gsl-user-story>`
- `<gsl-acceptance-criteria>`
- `<gsl-scenario>`

These, in turn, must be contained within a `<gsl-use-case>`.

This nesting forms the structural anchor that gives the test meaning, traceability, and lifecycle relevance.

Tests that are not anchored through this structure are **outside the system**.  
They are not rejected, but they are not GSL.


---


### GSL-08: Undocumentability Principle 


> Some tests, actions, and behaviors are inherently undocumentable. GSL acknowledges that total coverage is impossible and does not attempt to enforce it.


---

### GSL-09: Manual Resolution of Principle Conflict

> Principles do not resolve themselves.

As GSL grows, new principles may unintentionally conflict with prior ones. These conflicts are not self-healing and cannot be resolved through automation, tooling, or inference alone.

There is a common misconception that structured rule systems can evolve safely through trial-and-error, and that existing principles will adjust automatically with no consequences. GSL rejects this view.

Conflicts between principles must be surfaced, inspected, and resolved **by humans**. This requires careful reading of all adopted principles and deliberate, versioned intervention.

Principles do not adjust on their own—they must be revised deliberately when they conflict.

> ⚠ **Note:**  GSL encourages high cohesion and loose coupling to promote clarity—but even well-structured principles can come into conflict.
>
> These conflicts often arise when **dependencies between components (documents, rules, or interfaces) are left unresolved** .
>
> GSL must be actively curated to prevent circularity and entanglement. Dependencies must be surfaced and resolved—not deferred or assumed harmless.
> 
> **Principles are not reactive code. They do not resolve themselves. They remain in conflict until deliberately amended.**

---

### GSL-10: The Grand Division

> GSL supports two primary structural workflows: one for Feature Implementers, and one for Feature Requesters.

These workflows are distinguished by how they interpret structure and how they anchor their verification:

#### Case-Study Workflow  
- Driven by `<gsl-problem>` → `<gsl-analysis>` → `<gsl-design>` → `<gsl-implementation>`
- Tests are implicit: implemented and verified through automated (often unit) tests
- Primarily serves engineers and internal teams

#### Request Workflow  
- Driven by `<gsl-product>` → `<gsl-feature>` → `<gsl-use-case>` → (via `<gsl-user-story>`, `<gsl-acceptance-criteria>`, or `<gsl-scenario>`) with structured `<gsl-test-case>` elements. 
- Tests are explicit: documented and structured for Feature Requester validation
- Primarily serves Feature Requesters, QA, and cross-functional teams

As of this version, GSL now supports **two structured document types**:
- `case-study` — for internal, exploratory, or lifecycle-driven development
- `request` — for structured Feature Requester intent and behavioral confirmation

Each workflow has different incentives, audiences, and test strategies—but both are valid and supported within the GSL structural schema.

---

### GSL-11: Pre-Version-1 Flexibility Principle

> Any versioned system is fully malleable before version 1.0.

Before reaching version 1.0, a system—whether a specification, software library, interface, or protocol—is considered experimental and provisional. This includes:

- Reordering or reassigning identifiers
- Removing or rewriting features
- Renaming concepts or structures
- Rethinking the model entirely

No backward compatibility is expected, and no external dependency should be assumed. Feature requesters and implementers must treat anything prior to 1.0 as **subject to change without notice**.

The purpose of this phase is **clarity and correctness**, not stability. Rigid governance begins only at version 1.0.

> Before version 1, everything is changeable.  
> After version 1, everything is accountable.

---

### GSL-012: Declaration ID Rule 


> In GSL, all uniquely referenceable elements must include both a `declaration-id` and an `id-instance`.

These two fields form a **compound identity key** , enabling precise traceability across time and structure.





**Required On:** 
 
- `<gsl-document>`

- `<gsl-problem>`
 
- `<gsl-product>`
 
- `<gsl-feature>`
 

These elements are structurally anchored and do **not**  require explicit declaration identifiers.





#### Rules

1. Any GSL element that declares a `declaration-id` **must also include an `id-instance`**.  
   This ensures that all declarations are uniquely identifiable and traceable across time.

2. A given `declaration-id` may be reused across sprints, but only when paired with a new `id-instance`.  
   This denotes continuity or evolution of the same concept in a different time context.

3. The combination of `declaration-id` and `id-instance` must be **globally unique** across the GSL system.

4. **No more than one element per sprint may carry a given `declaration-id`.**  
   This prevents collisions and ensures clean linkage in time-tracked systems.  
   _Example: Only one `<gsl-document>` per sprint may carry a given `declaration-id`._




This identity model supports:

 
- Version-aware traceability
 
- Cross-document linking
 
- Partial inheritance of meaning over time
 
- System-wide uniqueness without redundancy at lower levels


It ensures that major elements can be referenced, validated, and reused without overburdening the document with IDs at every depth.

---

## Section 2: Glossary and Terminology Definitions  

This glossary defines key terms and constructs that are specific to GSL. Definitions are scoped to GSL’s structural model and are intended to ensure consistency across roles, documents, and tooling.













#### Artifact:


A manually authored document produced as a result of engaging with the GSL process. Artifacts are considered **output**, not input — they are not structurally tagged and are not subject to GSL validation. Artifacts typically include content deliverables, writeups, summaries, or other materials created during implementation. They reside in the `_artifacts/` folder and represent the tangible outcomes of fulfilling a request or completing a case-study.



#### The `case-study` Attribute:   
A GSL document type used for engineering-driven development.

It supports structured lifecycle elements (`<gsl-problem>`, `<gsl-analysis>`, `<gsl-design>`, `<gsl-implementation>`) and typically validates behavior using implementation-level tests (e.g. unit tests.) Case Study documents are located in the root of a GSL sprint folder (e.g. `001\01. This is a case study.md`).


#### Conversation:
An unstructured document used for informal reasoning, brainstorming, or Feature Requester communication.

Like artifacts, conversations are not governed by GSL structure but may be contextually linked to a structured document. Conversations are located in the `_conversations` folder in a GSL environment's sprint folder (e.g. `001\_conversations`).





#### The `declaration-id` Attribute:
A globally meaningful, human-readable identifier that declares the identity of a GSL element (e.g., product, problem, implementation).

It is used in combination with `id-instance` to support version-aware tracking and reuse.





#### The `id-instance` Attribute:
A numeric or semantic token that distinguishes one occurrence of a `declaration-id` in a particular sprint.

Together, `declaration-id` and `id-instance` form a globally unique identity key within GSL.

#### Feature Implementer: 

A Feature Implementer  is the responsible author of system behavior that satisfies a defined request.

They translate intent into action through code, configuration, or system design, as documented in GSL `case-study` elements.


They are responsible for:

 
- Investigating and addressing problems or constraints via:

 
  - `<gsl-problem>`, `<gsl-analysis>`, `<gsl-design>`, `<gsl-implementation>`
 
- Delivering working behavior that aligns with the expectations authored by the **Feature Requester**
 
- Optionally linking to validation mechanisms:

 
  - Automated unit tests (via `linked-ref`)
 
  - System-level checks recorded in `<gsl-implementation>`

- *Feature Implementers do not define desired behavior.* 

    They **interpret, structure, and deliver**  it through engineering actions.
    
    - May include developers, integrators, infrastructure engineers, or technical operators — depending on the system domain.
     
    - Typically operate in the context of `case-study` documents but may also review `request` documents to scope or clarify feasibility.
     
    - The Feature Implementer is responsible for ensuring that their contributions comply with the GSL structural schema when used.



#### Feature Requester: 
A Feature Requester  is the originator and narrative author of desired system behavior, typically expressed within a GSL `request` document.


They are responsible for:

 
- Defining **intent**  through structured elements:
 
  - `<gsl-product>`, `<gsl-feature>`, `<gsl-use-case>`
 
- Providing **behavioral expectations** :
 
  - `<gsl-user-story>`, `<gsl-acceptance-criteria>`, or `<gsl-scenario>`
 
- Validating system behavior through:

 
  - Explicit `<gsl-test-case>` elements
 
  - Review or sign-off aligned with GSL’s behavioral interface model

- *Feature Requesters are not Feature Implementers.* 

    They define **what**  the system should do, not **how**  it should be done.
    
    - In some organizations, this role may be filled by a product manager, subject matter expert, customer, or operator.
     
    - A single GSL request document may be authored by one or more Feature Requesters.
     
    - This term replaces the broader and more ambiguous term **“stakeholder”**  to clarify origin and scope.


#### The `gsl-test-case` Element:
A formal GSL structure (`<gsl-test-case>`) used to document explicit, human-readable tests for user-facing behavior.

Test cases must be structurally anchored inside a `<gsl-user-story>`, `<gsl-acceptance-criteria>`, or `<gsl-scenario>`.




#### The `linked-ref`Attribute:
A reference field used in automated unit tests (typically in `case-study` documents) to indicate which GSL element the test validates.

Used when tests are not written as `<gsl-test-case>` elements.





#### Outside the System:
Any content that was never structured using GSL tags and does not participate in the GSL model. Rather than being rejected, it is treated as a blackbox component with undefined traceability. See `GSL‑01`.

Examples include ad hoc notes, undocumented tests, or real-world decisions not captured formally. 



#### The `request` Attribute:
A GSL document type used for capturing Feature Requester intent and expected behavior.

It defines products, features, and use cases with narrative descriptions and associated test cases written in structured form. Request documents are located in the `_requests` folder in a GSL environment's sprint folder (e.g. `001\_requests`).


#### Situational Anchoring:
The rule that test cases are only meaningful when structurally linked to a containing use case scenario, story, or acceptance criteria.

Unanchored tests are considered outside the system. See `GSL‑07`.

#### Structural Schema

The Structural Schema defines the minimal set of required elements, tag relationships, and containment rules that a GSL document must follow in order to be considered structurally valid.

It serves as GSL’s **structural contract** — governing which elements must appear, how they must be organized, and where semantic primitives are allowed.

- **Key Properties:**
    - **Optional to use** — a GSL document is not required to invoke the structural schema.
    - **Mandatory to follow if used** — once invoked, it must be followed precisely for the document to be GSL-compliant.

- **Applies To:**
    - `case-study` documents (e.g., `<gsl-problem>` → `<gsl-implementation>`)
    - `request` documents (e.g., `<gsl-product>` → `<gsl-use-case>` → `<gsl-test-case>`)

- **Defined By:**
    - Tag containment rules
    - Required primitives (`<gsl-title>`, `<gsl-details>`)
    - Document identity structure (`declaration-id` + `id-instance`)
    - Compliance constraints for validation, anchoring, and traceability

> The structural schema is what separates informal structure from traceable structure.  
> If violated, the document becomes **system leakage**.

#### System Leakage:
An artifact or behavior that exists inside the GSL system boundary but fails to follow GSL structure.




















