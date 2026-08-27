# Retention and deletion policy

Version: 26 August 2026

| Category | Retention rule | Deletion implementation |
|---|---|---|
| Child profile, birth inputs, timezone, natal chart | While user keeps profile | Delete Child or Delete all |
| Latitude/longitude | Calculation only | Removed before profile persistence; existing profiles migrated on use |
| Notes | Until note, child or all-data deletion | Note delete; child cascade; all-data delete |
| Normal guide history | Maximum 90 days | Automatic prune on read/write; manual clear; child/all cascade |
| Sensitive/restricted prompt | Zero | Blocked before analytics/history/calculation |
| Tarot | No history is stored | Nothing to delete |
| Family Scent result | Maximum 90 days | Automatic expiry; regenerated/child/all deletion clears it |
| Local analytics aggregate | Until all-data deletion | Delete all |
| GA consent | Until changed/all-data deletion | Settings or Delete all |
| Optional GA cookies | Up to 180 days | Withdrawal attempts removal for current domain |
| Adult confirmation | Until all-data deletion | Delete all |
| Child-specific authority record | While that child profile exists | Delete Child or Delete all |

There is no application backend or application backup. Browser/device backups are controlled by the user’s platform and are outside the app’s technical control; deleted app data must not be reintroduced by the operator because the operator never possesses it.

## Cascade requirements

Deleting a child removes the child record, linked notes, that child’s guide history, selected-child pointer and any Family Scent result that may contain the nickname. Deleting all clears only known Child Astrology keys and analytics cookies; it does not wipe unrelated browser storage.
