# Retention and deletion policy

Version: 27 August 2026

| Category | Retention rule | Deletion implementation |
|---|---|---|
| Child profile, birth inputs, timezone, natal chart | While user keeps profile | Delete Child or Delete all |
| Latitude/longitude | Calculation only | Removed before profile persistence; existing profiles migrated on use |
| Notes | Until note, child or all-data deletion | Note delete; child cascade; all-data delete |
| Normal guide history | Maximum 90 days | Automatic prune on read/write; manual clear; child/all cascade |
| Sensitive/restricted prompt | Zero | Blocked before analytics/history/calculation |
| Tarot | No history is stored | Nothing to delete |
| Parent Scent result (adult parents/partners only) | Maximum 90 days | Automatic expiry; regeneration or all-data deletion clears it |
| Local analytics aggregate | Until all-data deletion | Delete all |
| GA consent | Until changed/all-data deletion | Settings or Delete all |
| Optional GA cookies | Up to 180 days | Withdrawal attempts removal for current domain |
| GA event and user data | 2 months in the GA property | Google-managed expiry; retention reset on new user activity is disabled |
| Adult confirmation | Until all-data deletion | Delete all |
| Child-specific authority record | While that child profile exists | Delete Child or Delete all |
| User-created JSON backup | Until the user deletes the downloaded file | Controlled by the user; import replaces existing portable local data only after confirmation |

There is no application backend or operator-held backup. The user may download and later import a local JSON backup. The import does not restore analytics consent or the separate general 18+ confirmation. Browser/device backups are controlled by the user’s platform and are outside the app’s technical control; deleted app data must not be reintroduced by the operator because the operator never possesses it.

## Cascade requirements

Deleting a child removes the child record, linked notes, that child’s guide history and selected-child pointer. Parent Scent is independent and contains only adult data, so deleting a child does not affect it. Deleting all clears only known Child Astrology keys and analytics cookies; it does not wipe unrelated browser storage. The obsolete `familyScentCodeV1` value is deleted automatically when the adult-only module starts.
