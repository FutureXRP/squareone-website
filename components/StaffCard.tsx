export function StaffCard({ name, role, bio }: { name: string; role: string; bio?: string }) {
  return (
    <div className="border-l-4 border-accent pl-5">
      <p className="text-lg font-semibold text-ink">{name}</p>
      <p className="text-muted">{role}</p>
      {bio ? <p className="mt-3 max-w-prose">{bio}</p> : null}
    </div>
  )
}
