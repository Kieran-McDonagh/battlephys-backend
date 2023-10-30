const featuredWorkouts = [
  {
    title: "Ultrafit",
    createdAt: new Date().toString(),
    body: {
      description: "circuit: complete one exercise then move onto the next",
      row: { 'distance(m)': 750 },
      "30kg OHP": { reps: 40 },
      situps: { reps: 85 },
      pullups: { reps: 20 },
      burpees: { reps: 60 },
      "40kg kb swings": { reps: 40 },
      "20kg step ups": { reps: 60 },
      "70kg farmers carry": { 'distance(m)': 100 },
      run: { 'distance(m)': 800 },
      "50kg bench": { reps: 40 },
    },
    author: "kieran",
  },
];

module.exports = featuredWorkouts;
