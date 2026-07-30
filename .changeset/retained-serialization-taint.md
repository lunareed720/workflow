---
'@workflow/core': minor
'workflow': minor
---

Retained-VM boundaries now accept plain data and standard built-ins (`Map`, `Set`, `Date`, `Error`, typed arrays, `URL`, `Headers`, …) as step inputs. Serialization reads through captured intrinsics and reports when it had to execute workflow code (getters, proxies, custom serializers); only those boundaries fall back to ordinary replay.

The `devalue` dependency is pinned to a git commit of upstream `main`, which includes the pluggable stringify operations interface (sveltejs/devalue#172) this feature relies on, until a release ships. This also picks up devalue's DataView-subview fix (sveltejs/devalue#166): 5.8.1 wrote the subview length slot as literal `undefined`, producing unparseable payloads for `DataView` subviews.
