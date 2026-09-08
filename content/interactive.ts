// Interactive zones and event packages, from the brief Matt supplied
// (docs-source/interactive-brief.pdf). Mirrored in content/COPY.md.
// Zone ids match the Interactive app's facilities table so "Reserve" links
// land on the right room and live prices can override the static ones.

export interface Zone {
  id: string
  name: string
  photo: string | null
  photoAlt: string
  body: string[]
  pricing: string[]
  comingSoon?: boolean
  reserve: string // path in the Interactive app
  reserveLabel: string
}

const HOURLY = ['$25 per hour, Monday through Friday 9 am to 5 pm', '$35 per hour, Monday through Friday 5 pm to 10 pm', '$35 per hour, Saturday and Sunday']

export const ZONES: Zone[] = [
  {
    id: 'multiball',
    name: 'MultiBall Zone',
    photo: '/photos/interactive/multiball.webp',
    photoAlt: 'Children throwing balls at a wall-sized interactive game screen in the MultiBall Zone',
    body: [
      'Get ready to move, compete, and play like never before in our MultiBall Zone. This immersive, interactive experience transforms an entire wall into a giant touch-sensitive game, combining sports, fitness, technology, and fun.',
      'With dozens of games to choose from, players can test their speed, accuracy, coordination, and teamwork through challenges that keep everyone engaged. Whether you are scoring goals, popping targets, solving interactive puzzles, or competing for the highest score, every game gets you moving.',
      'Perfect for families, birthday parties, school groups, youth groups, corporate team-building events, and friendly competitions, the MultiBall Zone offers an active experience that is fun for all ages and skill levels.',
    ],
    pricing: HOURLY,
    reserve: '/facilities/multiball',
    reserveLabel: 'Reserve the MultiBall Zone',
  },
  {
    id: 'gaming',
    name: 'Gaming Zone',
    photo: '/photos/interactive/gaming.webp',
    photoAlt: 'Gaming stations, roller coaster simulator seats, and a large screen in the Gaming Zone',
    body: [
      'Step into the Gaming Zone, where the latest technology meets nonstop entertainment. Whether you are a casual player or a serious competitor, this immersive space is designed for memorable experiences with friends, family, and coworkers.',
      'Challenge your group on high-performance gaming stations, experience immersive roller coaster simulators, or battle it out on our giant interactive gaming screen. With multiplayer games, competitive tournaments, and a variety of gaming experiences, there is something for every age and skill level.',
      'Perfect for family game nights, group date nights, birthday parties, youth groups, corporate team-building events, esports competitions, and celebrations, the Gaming Zone is a place where people come together to connect, compete, and create lasting memories.',
    ],
    pricing: HOURLY,
    reserve: '/facilities/gaming',
    reserveLabel: 'Reserve the Gaming Zone',
  },
  {
    id: 'multisport',
    name: 'MultiSport Zone',
    photo: null, // CONFIRM: no MultiSport photo in the brief
    photoAlt: 'Sports simulator lounge in the MultiSport Zone',
    body: [
      'Experience the excitement of your favorite sports in a whole new way in our MultiSport Zone. Powered by simulator technology, this immersive space lets you play and enjoy a variety of interactive sports and games, all indoors, all year long.',
      'Whether you are perfecting your pickleball swing, challenging friends to a bowling competition, or enjoying one of the many available sports and skill games, the MultiSport Zone offers fun for beginners, seasoned athletes, and everyone in between.',
      'Designed with a comfortable lounge atmosphere, it is the perfect place to relax, socialize, and compete. Gather around with family, friends, coworkers, or clients and enjoy an experience that is as entertaining as it is memorable.',
    ],
    pricing: HOURLY,
    reserve: '/facilities/multisport',
    reserveLabel: 'Reserve the MultiSport Zone',
  },
  {
    id: 'party',
    name: 'Party Arcade Zone',
    photo: '/photos/interactive/party-arcade.webp',
    photoAlt: 'Arcade cabinets along the walls and a long party table in the Party Arcade Zone',
    body: [
      'Get ready for nonstop fun in our Party Arcade Zone, the ultimate destination for birthdays, celebrations, and group events. Packed with classic arcade favorites, modern games, and exciting prize opportunities, this vibrant space is designed to bring out the kid in everyone.',
      'Challenge your friends to a game of skee-ball, compete in multiplayer arcade games, or try your luck at winning prizes from our claw machines. With dedicated party seating right in the heart of the action, your group can celebrate together while enjoying unlimited fun just steps away.',
      'Whether you are planning a birthday party, family gathering, youth group event, school celebration, or company outing, the Party Arcade Zone offers an energetic atmosphere where laughter, friendly competition, and lasting memories come naturally.',
    ],
    pricing: ['$175 for a 2-hour party', '$225 for a 3-hour party', 'Party packages are available'],
    reserve: '/facilities/party',
    reserveLabel: 'Reserve the Party Arcade Zone',
  },
  {
    id: 'billiards',
    name: 'Billiards Zone',
    photo: '/photos/interactive/billiards.webp',
    photoAlt: 'Pool tables with blue felt and lounge seating in the Billiards Zone',
    body: [
      'Slow things down and enjoy the timeless game of billiards in our Billiards Zone. Designed with a modern lounge atmosphere, this space combines pool tables, shuffleboard, air hockey, darts, comfortable seating, and a relaxed environment that is perfect for friendly competition and meaningful conversation.',
      'Whether you are a seasoned player looking to sharpen your skills or just learning the game, the Billiards Zone offers the perfect setting to rack up a match, unwind with friends, or enjoy a casual night out. It is an ideal destination for families, coworkers, youth groups, and anyone looking to connect over a classic game.',
      'From one-on-one matches to team tournaments, every visit is an opportunity to have fun, build relationships, and create lasting memories.',
    ],
    pricing: HOURLY,
    reserve: '/facilities/billiards',
    reserveLabel: 'Reserve the Billiards Zone',
  },
  {
    id: 'adventure',
    name: 'Adventure Zone',
    photo: '/photos/interactive/adventure.webp',
    photoAlt: 'Glow-in-the-dark mini golf course with neon lighting in the Adventure Zone',
    body: [
      'Step into the Adventure Zone, where every hole is a new challenge and every round is a memorable experience. Featuring a vibrant glow-themed mini golf course and laser tag area, this immersive attraction combines exciting obstacles, colorful lighting, and interactive fun for guests of all ages.',
      'Whether you are sinking the perfect putt, engaging in a laser tag battle, or simply enjoying the lively atmosphere, the Adventure Zone is designed to bring people together through laughter, friendly competition, and shared memories.',
      'Perfect for families, date nights, birthday parties, youth groups, school outings, and corporate team-building events, the Adventure Zone offers an experience that is as entertaining as it is unique.',
    ],
    pricing: HOURLY,
    comingSoon: true,
    reserve: '/facilities/adventure',
    reserveLabel: 'Reserve the Adventure Zone',
  },
  {
    id: 'gym',
    name: 'Fitness Zone',
    photo: '/photos/interactive/fitness.webp',
    photoAlt: 'Strength-training equipment and cardio machines in the Fitness Zone',
    body: [
      'Reach your goals in the Fitness Zone, a welcoming space designed to support every stage of your fitness. Whether you are building strength, improving endurance, or simply staying active, our well-equipped facility provides everything you need for an effective workout in a comfortable, motivating environment.',
      'Featuring a variety of strength-training equipment, free weights, benches, and functional training areas, the Fitness Zone is ideal for beginners and experienced athletes alike. With plenty of room to train, you will have the freedom to work out at your own pace and focus on achieving your personal goals.',
      'More than just a gym, the Fitness Zone is part of SquareOne’s commitment to building a healthier, stronger community. Every membership helps support the mission of SquareOne Compassion, allowing us to reinvest in programs and services that make a difference in the lives of our neighbors.',
    ],
    pricing: ['$25 per month for an individual membership'],
    reserve: '/memberships',
    reserveLabel: 'Become a member',
  },
]

export interface EventSpace {
  id: string
  name: string
  photo: string
  photoAlt: string
  body: string[]
  pricing: string[]
}

export const EVENT_SPACES: EventSpace[] = [
  {
    id: 'dining',
    name: 'Dining Hall',
    photo: '/photos/interactive/dining-hall.webp',
    photoAlt: 'Long banquet tables with red gingham tablecloths set for an event in the Dining Hall',
    body: [
      'Whether you are hosting an intimate gathering or a large celebration, our Dining Hall provides a flexible, comfortable space designed to bring people together. With an open floor plan, banquet-style seating, and modern amenities, this venue can be customized to fit a wide variety of events.',
      'Perfect for meetings, training sessions, receptions, birthday parties, reunions, fundraisers, holiday celebrations, church events, and community gatherings, the Dining Hall offers the versatility to make your event exactly what you envision.',
      'With plenty of seating, a convenient serving area, audio and visual capabilities, and ample room for dining, presentations, entertainment, or activities, it is an ideal space for both personal and professional events.',
    ],
    pricing: ['$125 for a 2-hour event', '$150 for a 3-hour event'],
  },
  {
    id: 'gym',
    name: 'Gym and Multipurpose Room',
    photo: '/photos/interactive/gym.webp',
    photoAlt: 'Open gym floor with court markings and a stage in the Gym and Multipurpose Room',
    body: [
      'Our Gym and Multipurpose Room is a versatile space designed to bring people together for recreation, celebrations, and community events. With an open floor plan, stage, and flexible layout, this multipurpose venue can easily transform to fit your group’s needs.',
      'Whether you are hosting a basketball or volleyball game, pickleball tournament, youth event, banquet, conference, school function, church gathering, or community celebration, this space provides the room and flexibility to make your event a success.',
      'The built-in stage is perfect for live entertainment, guest speakers, performances, award ceremonies, and presentations, while the large open court offers endless possibilities for sports, games, and activities.',
    ],
    pricing: ['$125 for a 2-hour event', '$150 for a 3-hour event'],
  },
]

export interface Package {
  name: string
  price: string
  items: string[]
}

export const PARTY_PACKAGES: Package[] = [
  { name: 'Package 1', price: '$350', items: ['3-hour party', 'Gym and Multipurpose Room', 'Large inflatable', 'Gaming Zone', '20 roller coaster VR experiences', 'Up to 75 guests', 'Includes 1 hour setup and 30 minute clean-up period'] },
  { name: 'Package 2', price: '$350', items: ['3-hour party', 'Gym and Multipurpose Room', 'Large inflatable', 'Small inflatable', 'Up to 125 guests', 'Includes 1 hour setup and 30 minute clean-up period'] },
  { name: 'Package 3', price: '$250', items: ['3-hour party', 'Dining Hall', 'Gaming Zone', '20 roller coaster VR experiences', 'Up to 100 guests', 'Includes 1 hour setup and 30 minute clean-up period'] },
  { name: 'Package 4', price: '$300', items: ['3-hour party', 'Dining Hall', 'Gaming Zone', 'MultiBall Zone', 'Up to 100 guests', 'Includes 1 hour setup and 30 minute clean-up period'] },
  { name: 'Package 5', price: '$200', items: ['2-hour party', 'Arcade Party Room', '25 photo booth prints', 'Game led by party host', 'Up to 40 guests', 'Includes 30 minute setup and 30 minute clean-up period'] },
  { name: 'Package 6', price: '$225', items: ['2-hour party', 'Arcade Party Room', '25 photo booth prints', 'Up to 40 guests', 'Includes 30 minute setup and 30 minute clean-up period'] },
]

export const CORPORATE_PACKAGES: Package[] = [
  { name: 'Corporate package 1', price: '$450', items: ['Dining Hall', 'Gym', 'Tables and chairs', 'Restrooms', 'Half-day rental period, 8 am to 3 pm or 3 pm to 10 pm'] },
  { name: 'Corporate package 2', price: '$750', items: ['Dining Hall', 'Gym', 'Interactive Zones: gaming, MultiBall, billiards, MultiSport', 'Restrooms', 'Event staff on site', 'Half-day rental period, 8 am to 3 pm or 3 pm to 10 pm'] },
  { name: 'Corporate package 3', price: '$1,000', items: ['Dining Hall', 'Gym', 'Interactive Zones: gaming, MultiBall, billiards, MultiSport', 'Party Arcade Room', 'Restrooms', 'Event staff on site', 'Full-day rental period, 8 am to 10 pm'] },
]

export const CORPORATE_CONTACT = { name: 'Christina Barrington', phone: '918-706-2682' }
