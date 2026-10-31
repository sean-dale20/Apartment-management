# Apartment Management System

A web app for managing a 15-unit apartment building: tracking units, tenants, rent payments, balances, and maintenance issues. Admins manage the whole building, while each tenant logs in to see only their own information.

<!-- Replace with your live demo link once deployed -->

**Live demo:** [your-link-here](#)

<!-- Add a screenshot: save an image in a /screenshots folder and update the path -->

![Dashboard screenshot](screenshots/dashboard.png)

---

## Features

- **Authentication:** email and password sign-up and login with Supabase Auth
- **Units overview:** all 15 units shown as boxes, color-coded as available or occupied
- **Tenant management:** tenants are linked to the unit they occupy
- **Payments:** record a payment and view the payment history
- **Balances:** each tenant's balance updates whenever a payment is recorded
- **Issue reporting:** tenants can submit issues (e.g. repairs) for the admin to see
- **Role-based access:**
  - **Admin** sees all units, tenants, payments, balances, and issues
  - **Tenants** see only their own balance, payments, and issues

<!-- Only keep these if they're working. Delete or move to "Planned" if not. -->

- **Automated rent reminders:** a scheduled job checks for due and overdue rent

---

## Tech Stack

| Part           | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | HTML, CSS, JavaScript             |
| Build tool     | Vite                              |
| Backend        | Supabase                          |
| Database       | PostgreSQL (through Supabase)     |
| Authentication | Supabase Auth                     |
| Security       | Row Level Security (RLS) policies |

---

## Database Structure

| Table      | What it stores                                                        |
| ---------- | --------------------------------------------------------------------- |
| `units`    | Unit number, status (available/occupied), and the tenant living there |
| `tenants`  | Tenant details                                                        |
| `payments` | Payments made by each tenant                                          |
| `balance`  | Each tenant's current balance and when it was last updated            |
| `issues`   | Issues submitted by tenants                                           |

<!-- Change "issues" to your actual table name if it's different -->

Row Level Security (RLS) policies make sure tenants can only read their own rows, while the admin can read everything.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sean-dale20/Apartment-management.git
cd Apartment-management
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Create the tables listed above.
3. Turn on Row Level Security and add the policies.
4. Copy your **Project URL** and **anon key** from _Project Settings → API_.

### 3. Install dependencies

```bash
npm install
```

### 4. Add your Supabase keys

Create a `.env` file in the project's main folder:

<!-- Match these names to the ones your code uses -->

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run it

```bash
npm run dev
```

Then open the link Vite shows in the terminal (usually `http://localhost:5173`).

---

## What I Learned

- How to design related database tables (units, tenants, payments)
- How Row Level Security controls who can see which data
- How to build login and role-based access with Supabase Auth

---

## Planned Improvements

<!-- Add your own ideas here -->

- Deploy the web version online
- Monthly payment reports for the admin
- Email notifications for overdue rent

---

## Author

**Sean Dale**
GitHub: [@sean-dale20](https://github.com/sean-dale20)

<!-- Add your portfolio link and LinkedIn here -->
