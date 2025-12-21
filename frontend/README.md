# Digital Banking Platform Frontend

A modern, colorful fintech UI built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Bold, Modern Design**: Colorful fintech UI with gradients and strong visual hierarchy
- **Responsive Layout**: Desktop-optimized with mobile support
- **Authentication**: Login with JWT token storage
- **Dashboard**: Account overview with balance and recent transactions
- **Transactions**: Full transaction history with pagination
- **Transfer Money**: Send money between accounts with validation
- **Real-time API Integration**: Ready to connect to Spring Boot backend

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Update `NEXT_PUBLIC_API_BASE_URL` to match your backend URL.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The app expects a Spring Boot backend with these endpoints:

- `POST /api/auth/login` - Authentication
- `GET /api/accounts/{accountNumber}` - Account details
- `GET /api/accounts/{accountNumber}/transactions` - Transaction history
- `POST /api/accounts/{accountNumber}/debit` - Transfer money

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── transactions/      # Transactions page
│   ├── transfer/          # Transfer money page
│   └── login/             # Login page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utilities and API client
│   ├── api.ts           # API client
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## Design System

- **Primary Colors**: Indigo, Blue, Purple
- **Accent Colors**: Teal, Cyan, Emerald
- **Typography**: Inter font with strong hierarchy
- **Components**: Rounded corners (xl), soft shadows, gradients
- **Layout**: Sidebar navigation with gradient background

## Build for Production

```bash
npm run build
npm start
```

## Development Notes

- All API calls use the Fetch API (no axios)
- Authentication tokens stored in localStorage
- Toast notifications for user feedback
- Responsive design with mobile-first approach
- Production-ready code with TypeScript strict mode