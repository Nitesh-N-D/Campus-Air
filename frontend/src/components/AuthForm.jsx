import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function AuthForm({
  badge,
  title,
  description,
  googleLabel,
  onGoogle,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#f3eee2_0%,_#f8f5ef_45%,_#fcfbf8_100%)] px-6 py-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-16 h-72 w-72 rounded-full bg-teal-200/35 blur-3xl" />
        <div className="absolute bottom-10 right-[10%] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <Badge className="border-white/70 bg-white/80 text-teal-700 hover:bg-white/80">
            Campus Air
          </Badge>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            Modern authentication for a polished campus workspace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Secure sign in with email or Google, verification email support, password reset, and a cleaner SaaS-style experience across every auth screen.
          </p>
        </section>

        <Card className="rounded-[32px] border-white/70 bg-white/84 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <CardHeader>
            {badge ? (
              <Badge variant="outline" className="w-fit">
                {badge}
              </Badge>
            ) : null}
            <CardTitle className="mt-3 text-3xl">{title}</CardTitle>
            <CardDescription className="text-sm leading-7">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-2xl"
              onClick={onGoogle}
            >
              {googleLabel}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.22em] text-slate-400">
                <span className="bg-white px-3">or continue with email</span>
              </div>
            </div>

            {children}

            {footerText && footerLinkLabel && footerLinkTo ? (
              <p className="text-center text-sm text-slate-500">
                {footerText}{" "}
                <Link to={footerLinkTo} className="font-semibold text-teal-700 hover:text-teal-800">
                  {footerLinkLabel}
                </Link>
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AuthForm;
