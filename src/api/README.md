# API Reference — Activ Properties

**Base URL:** `https://dev.activ.properties/api`  
**Docs:** `https://dev.activ.properties/v3/api-docs`

All authenticated endpoints require:
- `Authorization: Bearer <token>`
- `X-Tenant-Id: <subdomain>` (agency domain slug, e.g. `acme`)

---

## Auth — `/auth`
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/auth/login` | Basic Auth (Base64 email:password) + X-Tenant-Id → JWT | None |
| POST | `/auth/logout` | Invalidate JWT | Bearer |
| POST | `/auth/otp/send` | Send OTP to email | None |
| POST | `/auth/otp/verify` | Verify OTP → JWT | None |
| POST | `/auth/password/forgot` | Send password reset OTP | None |
| POST | `/auth/password/reset` | Reset password with OTP | None |
| POST | `/auth/onboarding/complete` | Complete invite onboarding | None |

---

## Users & Agency Admin — `/admin`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/users` | List users (filter: roleName, status, search) |
| POST | `/admin/users` | Onboard new user |
| GET | `/admin/users/{id}` | Get user by ID |
| PUT | `/admin/users/{id}` | Update user |
| PATCH | `/admin/users/{id}/status` | Activate / deactivate user |
| PATCH | `/admin/users/{id}/reactivate` | Reactivate user |
| POST | `/admin/users/{id}/profile-image` | Upload profile image |
| GET | `/admin/agency/profile` | Get agency profile |
| PUT | `/admin/agency/profile` | Update agency profile |
| POST | `/admin/agency/logo` | Upload agency logo |

---

## Properties — `/tenant/property`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/tenant/property` | List properties (filter + pageable) |
| POST | `/tenant/property` | Create property |
| GET | `/tenant/property/{id}` | Get property |
| PUT | `/tenant/property/{id}` | Update property |
| DELETE | `/tenant/property/{id}` | Delete property |
| POST | `/tenant/property/{id}/duplicate` | Clone property |
| PATCH | `/tenant/property/{id}/submit` | Submit for approval |
| PATCH | `/tenant/property/{id}/approve` | Approve |
| PATCH | `/tenant/property/{id}/approve-and-publish` | Approve & publish |
| PATCH | `/tenant/property/{id}/publish` | Publish |
| PATCH | `/tenant/property/{id}/unpublish` | Unpublish |
| PATCH | `/tenant/property/{id}/request-change` | Request changes |
| PATCH | `/tenant/property/{id}/reject` | Reject |
| PATCH | `/tenant/property/{id}/archive` | Archive |
| PATCH | `/tenant/property/{id}/unarchive` | Unarchive |
| PATCH | `/tenant/property/{id}/close` | Close |
| POST | `/tenant/property/bulk/publish` | Bulk publish |
| POST | `/tenant/property/bulk/unpublish` | Bulk unpublish |
| POST | `/tenant/property/bulk/delete` | Bulk delete |
| POST | `/tenant/property/bulk/assign-agent` | Bulk assign agent |
| POST | `/tenant/property/bulk/archive` | Bulk archive |
| POST | `/tenant/property/bulk/approve` | Bulk approve |

---

## Leads — `/tenant/lead`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/tenant/lead` | List leads (filter + pageable) |
| POST | `/tenant/lead` | Create lead |
| GET | `/tenant/lead/{id}` | Get lead |
| PUT | `/tenant/lead/{id}` | Update lead |
| DELETE | `/tenant/lead/{id}` | Delete lead |
| POST | `/tenant/lead/{id}/shortlist` | Shortlist a property for lead |
| PATCH | `/tenant/lead/{id}/transfer` | Transfer lead to another agent |
| PATCH | `/tenant/lead/{id}/assign` | Assign lead |
| POST | `/tenant/lead/bulk/transfer` | Bulk transfer |
| POST | `/tenant/lead/bulk/assign` | Bulk assign |

---

## Deals — `/tenant/deals`
| Method | Path | Description |
|--------|------|-------------|
| POST | `/tenant/deals/initiate` | Create / initiate deal |
| PATCH | `/tenant/deals/{id}/seller/approve` | Seller approves |
| PATCH | `/tenant/deals/{id}/seller/reject` | Seller rejects |
| PATCH | `/tenant/deals/{id}/seller/details` | Seller fills details |
| PATCH | `/tenant/deals/{id}/buyer/details` | Buyer fills details |
| PATCH | `/tenant/deals/{id}/finance/approve` | Finance approves |
| PATCH | `/tenant/deals/{id}/finance/reject` | Finance rejects |
| PATCH | `/tenant/deals/{id}/finance/request-change` | Finance requests change |
| PATCH | `/tenant/deals/{id}/admin/approve` | Admin approves |
| PATCH | `/tenant/deals/{id}/admin/reject` | Admin rejects |
| PATCH | `/tenant/deals/{id}/admin/request-change` | Admin requests change |
| PATCH | `/tenant/deals/{id}/close` | Close deal |
| PATCH | `/tenant/deals/{id}/resubmit` | Resubmit deal |
| POST | `/tenant/deals/{id}/revoke/request` | Request revocation |
| PATCH | `/tenant/deals/{id}/revoke/approve` | Approve revocation |
| PATCH | `/tenant/deals/{id}/revoke/reject` | Reject revocation |

---

## Projects — `/projects`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/projects` | List projects |
| POST | `/projects` | Create project |
| GET | `/projects/{id}` | Get project |
| PUT | `/projects/{id}` | Update project |
| DELETE | `/projects/{id}` | Delete project |
| POST | `/projects/{id}/request` | Request access to project |
| DELETE | `/projects/{id}/request` | Withdraw request |
| PATCH | `/projects/requests/{id}/approve` | Approve request |
| PATCH | `/projects/requests/{id}/reject` | Reject request |

---

## Platform (Super Admin) — `/platform/agencies`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/platform/agencies` | List all agencies |
| POST | `/platform/agencies` | Register new agency |
| GET | `/platform/agencies/{id}` | Get agency |
| PUT | `/platform/agencies/{id}` | Update agency |
| PATCH | `/platform/agencies/{id}/status` | Activate / deactivate agency |
| POST | `/platform/agencies/{id}/resend-invite` | Resend invite email |
| POST | `/platform/agencies/{id}/logo` | Upload agency logo |

---

## Attachments — `/tenant/attachments`
| Method | Path | Description |
|--------|------|-------------|
| GET | `/tenant/attachments` | List attachments (module + referenceId required) |
| POST | `/tenant/attachments` | Upload attachment |

---

## Notifications — `/notifications`
| Method | Path | Description |
|--------|------|-------------|
| PATCH | `/notifications/{id}/read` | Mark notification as read |
| PATCH | `/notifications/read-all` | Mark all as read |
