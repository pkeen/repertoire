// console.log('hello');
(() => {

    document.addEventListener('DOMContentLoaded', (event) => {
        // Your code here
        let targetSelectNew = document.getElementById(`targetNew`);
        let equipmentSelectNew = document.getElementById(`equipmentNew`);
        
        let targetValNew;
        let equipmentValNew;
        
        let queryRequestNew = async (targetValNew, equipmentValNew) => {
            let query = []
            if (targetValNew) {
                query.push(`target=${targetValNew}`);
            }
            if (equipmentValNew) {
                query.push(`equipment=${equipmentValNew}`)
            }
        
            // console.log(query.join("&"));
            const endpoint = 'http://localhost:3000/exerciseData/search'
            const url = endpoint + '?' + query.join("&");
        
            try {
                const exerciseData = await fetch(url).then(res => res.json());
        
                // clear existing data in select
                const exerciseSelect = document.getElementById('exerciseNew');
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
        
        let handleTargetChangeNew = (e) => {
        
            targetValNew = e.target.value;
            console.log('targetVal: ', targetValNew)
        
            queryRequestNew(targetValNew, equipmentValNew);
        } 
        
        let handleEquipmentChangeNew = (e) => {
            equipmentValNew = e.target.value;
            queryRequestNew(targetValNew, equipmentValNew)
        }
        
        targetSelectNew.addEventListener('change', handleTargetChangeNew);
        equipmentSelectNew.addEventListener('change', handleEquipmentChangeNew);
      });
})()

