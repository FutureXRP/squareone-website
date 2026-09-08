/** Renders an unresolved [CONFIRM: ...] placeholder from COPY.md as-is. Grep for CONFIRM. */
export function Confirm({ children }: { children: React.ReactNode }) {
  return <span className="text-muted">[CONFIRM: {children}]</span> // CONFIRM
}
