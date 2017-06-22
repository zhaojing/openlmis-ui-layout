5.0.2 / Current Snapshot
==================

5.0.1 / 2017-05-26
==================

Bug fixes:
* [OLMIS-2428](https://openlmis.atlassian.net/browse/OLMIS-2428): Fixed missing error message for 500 error modal

5.0.0 / 2017-05-08
==================

Compatibility breaking changes:

* [OLMIS-2107](https://openlmis.atlassian.net/browse/OLMIS-2107): Add breadcrumbs to top of page navigation
  * This change requires modification of all the states due to adding a main state.

Dev and tooling updates made in a backwards-compatible manner:

* [OLMIS-1609](https://openlmis.atlassian.net/browse/OLMIS-1609): UI i18N message strings are not standardized
* [OLMIS-1853](https://openlmis.atlassian.net/browse/OLMIS-1853): Separate push and pull Transifex tasks in build
  * Migrated to dev-ui v3.
