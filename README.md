# Grit Labs

**Build with clarity. Reason with structure. Document what matters.**

This repository is the authoritative source for Grit Labs specifications and documentation. It defines the structure, language, and organizational patterns used to coordinate development across documents, sprints, and systems.

The live documentation site is available at **[gritlabs.net](https://www.gritlabs.net)**.

## 📂 Repository Layout

```
gritlabs/
├── docs/
│   ├── mkdocs.yml         — Site configuration
│   ├── pages/             — Structured source content
│   └── site/              — Build output (excluded from Git)
├── LICENSE                — AGPL 3.0 + custom Grit Labs terms
├── .github/workflows/     — Deployment automation
```


## 🛠 Local Development

To preview the documentation site locally:

```
cd docs
pip install mkdocs-material
mkdocs serve
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.



## 🔐 License

All content in this repository is licensed under the **GNU Affero General Public License v3.0 (AGPL)**.

> The Grit Structured Language (GSL), including its syntax, structure, and semantics, is proprietary to Grit Labs. Any reuse, adaptation, or integration requires express permission unless covered by AGPL compliance.

See `LICENSE` for full terms.

---

## 📬 Contact

For licensing, questions, or collaboration inquiries:
Open an issue or contact [nbbrode](https://github.com/nbbrode) on GitHub.
