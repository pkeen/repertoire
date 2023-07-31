const Workout = require('../models/workout');

module.exports = {
  index
}

async function index(req, res) {
  const newWorkout = new Workout();
  
  res.render("index", {
    title: "Repertoire",
    defaultDate: newWorkout.formatDateForDatetimeLocal()
  });
}
