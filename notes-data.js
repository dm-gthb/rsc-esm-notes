const notes = [
  {
    id: 1,
    title: 'Cookies Recipe',
    text: 'The secret to chewy cookies: melt the butter first, use brown sugar, and chill the dough for 24 hours. Bake at 375°F for exactly 12 minutes.',
    createdAt: '2025-06-15',
  },
  {
    id: 2,
    title: 'Morning Routine Ideas',
    text: 'Start with 10 minutes of meditation, followed by a glass of water with lemon. Quick stretch routine helps wake up the body. No phone for the first hour.',
    createdAt: '2025-06-01',
  },
  {
    id: 3,
    title: 'Tokyo Travel Tips',
    text: 'Get a Pasmo card for trains. Must-visit: Tsukiji Market for breakfast, Shinjuku Gyoen for cherry blossoms. Learn basic phrases like "Arigatou" and "Sumimasen".',
    createdAt: '2025-05-20',
  },
  {
    id: 4,
    title: 'Home Organization Tips',
    text: 'One in, one out rule for new purchases. Use clear containers for pantry items. Sunday evening: 15-minute quick cleanup of each room.',
    createdAt: '2025-06-10',
  },
  {
    id: 5,
    title: 'Summer Garden Planning',
    text: 'Plant tomatoes and basil together. Water deeply but less frequently to encourage strong roots. Mulch helps retain moisture and prevent weeds.',
    createdAt: '2025-05-01',
  },
  {
    id: 6,
    title: 'Books to Read 2025',
    text: 'Fiction: "The Midnight Library", Non-fiction: "Atomic Habits". Reading goal: one book per month. Join local book club for discussions.',
    createdAt: '2025-01-01',
  },
  {
    id: 7,
    title: 'Homemade Pizza Secrets',
    text: 'Let dough rest overnight in fridge. Preheat oven to max temperature with pizza stone. Less is more with toppings. Finish with fresh basil.',
    createdAt: '2025-06-12',
  },
  {
    id: 8,
    title: 'Weekly Meal Prep',
    text: "Sunday: prep vegetables and cook grains. Mason jar salads stay fresh all week. Make extra dinner for next day's lunch.",
    createdAt: '2025-06-16',
  },
  {
    id: 9,
    title: 'Indoor Plant Care Guide',
    text: 'Snake plants and pothos are hard to kill. Water when top inch of soil is dry. North-facing windows need low-light plants.',
    createdAt: '2025-04-15',
  },
  {
    id: 10,
    title: 'Productivity Techniques',
    text: 'Pomodoro method: 25 minutes work, 5 minutes break. Keep a done list instead of just a to-do list. Plan tomorrow evening before.',
    createdAt: '2025-06-05',
  },
  {
    id: 11,
    title: 'Weekend in Paris Itinerary',
    text: 'Day 1: Louvre in morning (book ahead), picnic in Tuileries, evening Seine cruise. Day 2: Montmartre walk, then Eiffel Tower at sunset.',
    createdAt: '2025-05-30',
  },
  {
    id: 12,
    title: 'Simple Workout Routine',
    text: '20 minutes daily: 10 pushups, 20 squats, 30-second plank. Gradually increase reps. Take walks during phone calls.',
    createdAt: '2025-06-18',
  },
  {
    id: 13,
    title: 'Coffee',
    text: 'Midnight Roasters has best espresso. Corner Cafe great for working - fast wifi. The Bean Scene does amazing pastries.',
    createdAt: '2025-06-14',
  },
  {
    id: 14,
    title: 'Monthly Budget Template',
    text: '50/30/20 rule: 50% needs, 30% wants, 20% savings. Track expenses in app. Review and adjust every month.',
    createdAt: '2025-06-01',
  },
  {
    id: 15,
    title: 'Natural Cleaning Solutions',
    text: 'Vinegar + water for windows. Baking soda + lemon for sinks. Essential oils in diffuser for fresh air. Microfiber cloths reduce paper waste.',
    createdAt: '2025-06-08',
  },
  {
    id: 16,
    title: 'Photography Tips',
    text: 'Golden hour is just before sunset. Rule of thirds for composition. Get closer instead of zooming. Edit lightly.',
    createdAt: '2025-06-17',
  },
  {
    id: 17,
    title: 'Favorite Podcasts 2025',
    text: 'Monday: True crime series. Tuesday: Science news. Wednesday: Interview show. Great for commute entertainment.',
    createdAt: '2025-01-15',
  },
  {
    id: 18,
    title: 'Relaxation Techniques',
    text: '4-7-8 breathing exercise. Progressive muscle relaxation before bed. Regular screen-free evenings. Sunday digital detox.',
    createdAt: '2025-06-18',
  },
  {
    id: 19,
    title: 'Sustainable Living Tips',
    text: 'Bring reusable bags and water bottle. Compost kitchen scraps. Buy local when possible. Repair instead of replace.',
    createdAt: '2025-06-11',
  },
  {
    id: 20,
    title: 'Creative Writing Prompts',
    text: "Write about your childhood home. Describe a stranger's day. What if you could time travel? Write for 10 minutes every morning.",
    createdAt: '2025-06-13',
  },
];
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getNotes() {
  await delay();
  return [...notes];
}

export async function getNote(id) {
  await delay(1000);
  const note = notes.find((note) => note.id === Number(id));
  if (!note) throw new Error(`Note with id ${id} not found`);
  return { ...note };
}

export async function updateNote(id, { title, text }) {
  await delay();
  const index = notes.findIndex((note) => note.id === Number(id));
  if (index === -1) throw new Error(`Note with id ${id} not found`);

  notes[index] = {
    ...notes[index],
    title: title ?? notes[index].title,
    text: text ?? notes[index].text,
  };
  return { ...notes[index] };
}
