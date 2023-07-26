// console.log('hello');
const targetSelect = document.getElementById('target');
const equipmentSelect = document.getElementById('equipment');

let targetVal;
let equipmentVal;



const queryRequest = async (targetVal, equipmentVal) => {
    let query = []
    if (targetVal) {
        query.push(`target=${targetVal}`);
    }
    if (equipmentVal) {
        query.push(`equipment=${equipmentVal}`)
    }

    // console.log(query.join("&"));
    const endpoint = 'http://localhost:3000/exerciseData/search'
    const url = endpoint + '?' + query.join("&");

    try {
        const exerciseData = await fetch(url).then(res => res.json());

        // clear existing data in select
        const exerciseSelect = document.getElementById('exercise');
        exerciseSelect.innerHTML = '';

        // poplate with new data
        exerciseData.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise._id;
            option.text = exercise.name;
            exerciseSelect.append(option);
        })

    } catch (err) {
        console.log(err);
    }
}

const handleTargetChange = (e) => {

    targetVal = e.target.value;
    console.log('targetVal: ', targetVal)

    queryRequest(targetVal, equipmentVal);

    // const selectedTarget = e.target.value;
    // console.log(selectedTarget);

    // fetch('http://localhost:3000/exerciseData/search?target=' + selectedTarget )
    //     .then(response => response.json())
    //     .then(data => {
    //         // clear the exercise select
    //         const exerciseSelect = document.getElementById('exercise');
    //         exerciseSelect.innerHTML = '';
    
    //         // populate the exercise select with new data
    //         data.forEach(function(exercise) {
    //           const option = document.createElement('option');
    //           option.value = exercise._id;
    //           option.text = exercise.name;
    //           exerciseSelect.add(option);
    //         });
    //       })
    //       .catch(err => console.error('Error:', err));
} 

const handleEquipmentChange = (e) => {
    equipmentVal = e.target.value;
    queryRequest(targetVal, equipmentVal)
}

targetSelect.addEventListener('change', handleTargetChange);
equipmentSelect.addEventListener('change', handleEquipmentChange);

// const label = document.querySelector('label');

// label.style.color = 'red';

// targetSelect.style.border = `1px solid red`;