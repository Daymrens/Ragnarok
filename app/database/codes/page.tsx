import { CodesList } from "@/components/CodesList";

export default function CodesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Redeem Codes</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Launch promo codes. Redeem via the Gift Code exchange on the login/account menu.
          Verify expiry in-game.
        </p>
      </div>
      <CodesList />
    </div>
  );
}
