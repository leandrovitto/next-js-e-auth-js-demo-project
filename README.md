# Next.js Auth Complete Flow

[Link all'articolo completo e Video](https://rebrand.ly/article_899oze4)

[![image](image.jpeg)](https://rebrand.ly/article_899oze4)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It includes authentication using NextAuth.js and role-based access control.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/leandrovitto/next-js-e-auth-js-demo-project.git
cd next-js-e-auth-js-demo-project
```

## Install Next Auth

```
npm install next-auth
```
Install NodeMailer for provider

```
npm install nodemailer
```

2.Install dependencies:

```
npm install
```

3.Set up environment variables:
Create a .env.local file in the root directory and add the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

Running the Development Server
First, run the development server:

```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

Building for Production
To create an optimized production build:

```
npm run build
npm start
```

Authentication
This project uses NextAuth.js for authentication. To install NextAuth.js:

```
npm install next-auth
```

Email Provider
Install NodeMailer for the email provider:

```
npm install nodemailer
```

Role-Based Access Control
This project includes role-based access control. The roles are defined in an enum:

```
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
```

This hook checks the session and user role:

```
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserRole } from "@/types/roles";

const useRoleSession = (requiredRole: UserRole | null) => {
  const { data: session, status } = useSession();
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    if (!requiredRole || session?.user?.role?.includes(requiredRole)) {
      setHasRole(true);
    } else {
      setHasRole(false);
    }
  }, [session, requiredRole]);

  return { hasRole, user: session?.user, status };
};

export default useRoleSession;
```

Protecting Routes
To protect a route based on user roles, use the useRoleSession hook in your component.