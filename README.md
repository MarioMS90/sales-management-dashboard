# Sales Management Dashboard


A **Next.js 15** sales management dashboard using PostgreSQL, styled with Tailwind CSS, and deployed on Vercel.

**[Full documentation](https://github.com/MarioMS90/a-safe-technical-test/wiki/A%E2%80%90Safe-Technical-Test-%E2%80%90-Documentation)**

**[Deployed version](https://a-safe-technical-test-roan.vercel.app/)**


## Overview

The app provides a summary dashboard, a table of invoices, and a table view of sellers, with optimized handling of large datasets. User authentication is managed by **NextAuth.js**, and **Kysely** is used for database interactions.

### Key Technologies

- **Framework**: Next.js 15 with App Router.
- **Database**: PostgreSQL (managed with Kysely).
- **Authentication**: NextAuth.js v5.
- **UI**: shadcn/ui components and Tailwind CSS.
- **Testing**: Cypress and Jest.
- **Deployment**: Vercel.

### Project Structure

The main folders in the project structure are:

- **Root Folder**:
	- `__tests__`: Unit tests.
	- `cypress`: E2E tests.
	- `public`: Public assets.
	- `src`: Application logic and source code.

- **Inside `src` Folder**:
    - `src/app`: Defines the routing structure, and layouts.
    - `src/components`: All application components.
    - `src/components/ui`: For UI components.
    - `src/hooks`: Custom hooks.
    - `src/lib`: Server actions, database access functions, and utilities.
    - `src/schemas`: Zod schemas for validation.
    - `src/types`: Type definitions.

## Running the Project

1. Ensure **Node.js** (version 18.17 or above) and **pnpm** are installed on your system.
    
    - If not installed, download **Node.js** from [nodejs.org](https://nodejs.org/) and install **pnpm** globally using:
        
        ```shell
        npm install -g pnpm
        ```
        
2. Clone the repository:
    
    ```shell
    git clone https://github.com/MarioMS90/a-safe-technical-test
    cd a-safe-technical-test
    ```
    
3. Install project dependencies:
    
    ```shell
    pnpm install
    ```
    
4. Start the local development server:
    
    ```shell
    pnpm run dev
    ```
    
5. To reset the database and seed it with new test data, visit: [http://localhost:3000/seed](http://localhost:3000/seed)
    
    Default user for login:
    
    - **Email**: `user@gmail.com`
    - **Password**: `123456`

6. To run the tests, use the following commands:
    
    ```shell
    pnpm run test
    pnpm run cypress:open
    ```
    
The `.env.local` file is included in the repository to facilitate testing without additional setup.
