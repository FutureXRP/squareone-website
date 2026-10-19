// "What's new at SquareOne" on the home page. Newest first. Keep each item
// to one or two sentences; link to the page with the details. Dates are
// shown as written. Mirrored in COPY.md.
export interface NewsItem {
  date: string
  title: string
  body: string
  href: string
  linkLabel: string
}

export const NEWS: NewsItem[] = [
  {
    date: 'October 2026',
    title: 'Party packages book online',
    body: 'Six party packages and three corporate packages are listed on the Events page, and the request form in our store sends your date straight to the front desk.',
    href: '/events',
    linkLabel: 'See the packages',
  },
  {
    date: 'September 2026',
    title: 'Early Learning Center photo gallery',
    body: 'From muddy boots to the light table, a new gallery shows everyday life in each of our six classrooms, along with tuition rates for the 2026 to 2027 school year.',
    href: '/early-learning/gallery',
    linkLabel: 'Explore the gallery',
  },
  {
    date: 'September 2026',
    title: 'A new website for the whole campus',
    body: 'squareonecompassion.com now brings the Early Learning Center, the Medical Center, and Interactive together in one place, with tour requests, enrollment interest, and giving all online.',
    href: '/about',
    linkLabel: 'About SquareOne',
  },
]
