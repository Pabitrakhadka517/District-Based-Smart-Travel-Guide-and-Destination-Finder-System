import { Button } from "@/components/ui/button";

export function SocialAuth() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" disabled title="Coming soon">
          Google
        </Button>
        <Button variant="outline" type="button" disabled title="Coming soon">
          Facebook
        </Button>
      </div>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with email <span className="h-px flex-1 bg-border" />
      </div>
    </>
  );
}
