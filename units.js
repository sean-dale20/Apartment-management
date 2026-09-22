///////////////////////////////////////////////////////////////////////////////////////////////////

//units display
async function loadUnits() {
    
    const{data: units, error} = await database
    .from('units')
    .select('*')
   


    if(error){
        console.error('failed to load units:', error.message);
        return;
    }

   units.forEach(unit => {
    const box = document.querySelector('.unit-box[data-unit="' + unit.unit_no + '"]');


    if(box){
        box.classList.remove('available', 'occupied');
        box.classList.add(unit.status);
        
            
        


        //key icon part
        const existingKey = box.querySelector('.key-icon');

       

        if(unit.status === 'occupied'){
            if(!existingKey){

            box.insertAdjacentHTML(
                'beforeend', '<span class="key-icon">🔑</span>');
            };
        }
    
        else{
            if(existingKey)
             
                existingKey.remove();
                }

                 //check status
                 const checkIcon = box.querySelector('.check-icon');
                if(unit.status === 'available'){
                    if(!checkIcon){
                    box.insertAdjacentHTML(
                        'beforeend', '<span class="check-icon">✅</span>'
                    );
                }
                }
                    else{
                        if(checkIcon)

                            checkIcon.remove();

                }
        
        
        
    }
   });
}
loadUnits();













    async function loadStats() {
        const { data, error}= await database
        .from('units')
        .select('*');



        if(error){
            console.error("error fetching units data", error.message)
            return;
        }

        let occupiedCount = 0;
        let availableCount = 0;


        data.forEach(unit =>{
            if(unit.status === 'occupied'){
                occupiedCount = occupiedCount + 1;

            }
            else if(unit.status === 'available'){
                availableCount = availableCount + 1;
            }
            
        });
        document.getElementById('occupied-count').textContent = occupiedCount;
        document.getElementById('available-units').textContent = availableCount;
        document.getElementById('total-count').textContent = data.length;




        
    }
    loadStats();

    