import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, PiggyBank, Shield, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">FinTrack</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Link href="/login">
              <button className="mr-2 bg-transparent border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
            Take control of your finances today
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Personal Finance
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Track your income, expenses, and budgets with ease. Get insights into your spending habits and achieve your
            financial goals.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you take control of your financial future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-0 shadow-sm p-8 text-center rounded bg-white">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Smart Analytics</h3>
              <p className="text-muted-foreground">
                Get detailed insights into your spending patterns with beautiful charts and reports.
              </p>
            </div>

            <div className="border-0 shadow-sm p-8 text-center rounded bg-white">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Budget Tracking</h3>
              <p className="text-muted-foreground">
                Set monthly budgets and track your progress with real-time notifications.
              </p>
            </div>

            <div className="border-0 shadow-sm p-8 text-center rounded bg-white">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your financial data is encrypted and secure. We never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their financial habits with FinTrack.
          </p>
          <Link href="/signup">
            <button className="text-lg px-8 py-3 rounded bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2">
              Get Started for Free <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PiggyBank className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">FinTrack</span>
          </div>
          <p className="text-muted-foreground">© 2025 FinTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
