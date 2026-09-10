// Quality and approach bar, from the ELC director. Program names keep their own capitalization.
export const ELC_CREDENTIALS = ['APPLE Accredited', 'Oklahoma 5-Star Program', 'Certified Healthy', 'Nature-based', 'Reggio-inspired', 'Conscious Discipline']

// "What makes SquareOne exceptional" cards, from the ELC director. Mirrored in COPY.md.
// Each card shows a photo when public/photos/elc/<photo>.{webp,jpg,jpeg,png} exists.
export interface ElcPillar {
  photo: string
  title: string
  body: string
  alt: string
}

export const ELC_PILLARS: ElcPillar[] = [
  {
    photo: 'nature-based-learning',
    title: 'Nature-based learning',
    body: 'Children learn best when they can touch, move, investigate, and experience the world around them. Nature becomes a teacher as children explore living things, changing seasons, natural materials, and the wonder found outdoors.',
    alt: 'Children exploring outdoors at SquareOne Early Learning Center',
  },
  {
    photo: 'reggio-inspired-curriculum',
    title: 'Reggio-inspired curriculum',
    body: 'We view every child as capable, curious, and full of ideas. Our educators observe children’s interests and questions, then create meaningful projects and experiences that invite them to investigate, problem-solve, and express their thinking.',
    alt: 'A classroom project in progress at SquareOne Early Learning Center',
  },
  {
    photo: 'conscious-discipline',
    title: 'Conscious Discipline',
    body: 'Relationships and emotional safety come before rules and redirection. Through connection, encouragement, and consistent routines, children learn to recognize their emotions, regulate their bodies, solve problems, and care for others.',
    alt: 'A teacher and child together at SquareOne Early Learning Center',
  },
  {
    photo: 'outdoor-classrooms',
    title: 'Outdoor classrooms',
    body: 'Our outdoor spaces are an extension of the classroom, not simply a place for recess. Children build, dig, create, climb, experiment, and take appropriate risks while developing confidence, coordination, creativity, and a lasting connection with nature.',
    alt: 'The outdoor classroom at SquareOne Early Learning Center',
  },
  {
    photo: 'family-partnerships',
    title: 'Family partnerships',
    body: 'Families are an essential part of our School Family and each child’s learning. We build strong partnerships through open communication, shared goals, classroom documentation, and meaningful opportunities for families to participate and connect.',
    alt: 'Families and teachers together at SquareOne Early Learning Center',
  },
  {
    photo: 'educators-who-inspire',
    title: 'Educators who inspire',
    body: 'Our educators do more than supervise. They listen, observe, encourage, and learn alongside each child. Through meaningful relationships and continued professional growth, they create safe, engaging environments where every child feels known, valued, and capable.',
    alt: 'An educator working alongside children at SquareOne Early Learning Center',
  },
]

// Classrooms, youngest to oldest, from the ELC director. Mirrored in COPY.md.
// Each card shows a photo when public/photos/elc/classrooms/<photo>.{webp,jpg,jpeg,png} exists.
export interface ElcClassroom {
  photo: string
  name: string
  ages: string
  body: string
}

export const ELC_CLASSROOMS: ElcClassroom[] = [
  {
    photo: 'snapping-turtles',
    name: 'Snapping Turtles',
    ages: 'Infants',
    body: 'A peaceful, nurturing environment where our youngest learners build secure relationships and explore the world through movement, sensory experiences, and loving interactions.',
  },
  {
    photo: 'scissortails',
    name: 'Scissortails',
    ages: 'Mobile infants and young toddlers',
    body: 'A joyful space where young toddlers strengthen mobility, language, confidence, and curiosity through hands-on exploration and responsive relationships.',
  },
  {
    photo: 'river-otters',
    name: 'River Otters',
    ages: 'Older toddlers',
    body: 'A busy, engaging classroom where growing toddlers develop communication, independence, problem-solving skills, and meaningful connections through play.',
  },
  {
    photo: 'turtle-doves',
    name: 'Turtle Doves',
    ages: 'Younger twos',
    body: 'A supportive environment where children practice making choices, expressing emotions, building friendships, and developing important self-help skills.',
  },
  {
    photo: 'prairie-dogs',
    name: 'Prairie Dogs',
    ages: 'Older twos and threes',
    body: 'A playful community where children grow in independence, cooperation, creativity, and confidence through open-ended experiences and shared discoveries.',
  },
  {
    photo: 'wood-ducks',
    name: 'Wood Ducks',
    ages: 'Preschool',
    body: 'An inquiry-filled classroom where capable young learners investigate big ideas, build life skills, collaborate with others, and develop a lasting love of learning.',
  },
]
