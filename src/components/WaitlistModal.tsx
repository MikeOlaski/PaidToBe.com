import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  source?: string;
  onClose: () => void;
}

export default function WaitlistModal({ open, source, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) return;

    setLoading(true);
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email: email.trim().toLowerCase(), source: source ?? "homepage" });

    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        // Duplicate — treat as success, don't reveal
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setEmail("");
      setError("");
      setSubmitted(false);
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
            <h2 className="font-serif text-2xl font-bold">You're on the list!</h2>
            <p className="text-muted-foreground leading-relaxed">
              We'll reach out when we launch. Your free first product access ($97 value) is reserved.
            </p>
            <Button onClick={handleClose} className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 w-full">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-primary px-8 py-8 text-primary-foreground text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-accent" />
              <h2 className="font-serif text-2xl font-bold leading-tight [text-wrap:balance]">
                Get your first product free
              </h2>
              <p className="mt-2 text-sm opacity-80">
                Join the waitlist and claim free access to our first product release — a $97 value.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-8">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="h-11 text-base"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 text-base"
              >
                {loading ? "Joining..." : "Join the Waitlist"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                No spam. No credit card. Just early access.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
