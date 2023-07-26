// console.log('hello');
const targetSelect = document.getElementById('target');


handleChange = async (e) => {
    const selectedTarget = e.target.value;
    console.log(selectedTarget);

    fetch('http://localhost:3000/exerciseData/search?target=' + selectedTarget )
        .then(response => response.json())
        .then(data => {
            // clear the exercise select
            const exerciseSelect = document.getElementById('exercise');
            exerciseSelect.innerHTML = '';
    
            // populate the exercise select with new data
            data.forEach(function(exercise) {
              const option = document.createElement('option');
              option.value = exercise._id;
              option.text = exercise.name;
              exerciseSelect.add(option);
            });
          })
          .catch(err => console.error('Error:', err));
} 

targetSelect.addEventListener('change', handleChange)

// const label = document.querySelector('label');

// label.style.color = 'red';

// targetSelect.style.border = `1px solid red`;