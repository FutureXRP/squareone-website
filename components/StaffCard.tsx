import Image from 'next/image'

export function StaffCard({ name, role, bio, photo }: { name: string; role: string; bio?: string; photo?: string | null }) {
  return (
    <div className="flex gap-5 border-l-4 border-accent pl-5">
      {photo ? (
        <Image src={photo} alt={name} width={112} height={112} className="h-24 w-24 shrink-0 object-cover md:h-28 md:w-28" />
      ) : null}
      <div>
        <p className="text-lg font-semibold text-ink">{name}</p>
        <p className="text-muted">{role}</p>
        {bio ? <p className="mt-3 max-w-prose">{bio}</p> : null}
      </div>
    </div>
  )
}
