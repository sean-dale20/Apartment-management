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

//units display info if clicked

const unitBoxes = document.querySelectorAll('.unit-box');
const unitDetails = document.getElementById('unit-details');

unitBoxes.forEach(box =>{
    box.addEventListener('click', async function(){
        const unitNo = this.dataset.unit;

        const{data: unit, error} = await database
        .from('units')
        .select('*, tenants(*)')
        .eq('unit_no', unitNo)
        .single();

        if(error){
            console.error("Failed to load the unit:", error.message);
       return;
        }
        showUnitDetails(unit);
    });
});


function showUnitDetails(unit){
    if(unit.status === 'occupied' && unit.tenants){
        unitDetails.innerHTML = `
        <h3>Unit ${unit.unit_no} - Occupied</h3>
        <p><strong>Name:</strong> ${unit.tenants.name}</p> 
        <p><strong>Phone: </strong>${unit.tenants.phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${unit.tenants.email}</p> 
        `;
    }else{
        unitDetails.innerHTML = `
        <h3>Unit ${unit.unit_no} - Available </h3>
        <form id="move-in-form">
        <input type="text" id="move-in-name" placeholder="Full name" required/>
        <input type="email" id="move-in-email" placeholder="Email" required />
        <input type="tel" id="move-in-phone" placeholder="Phone" />
        <button type="submit">Move In </button>
        </form>
        `;
        document.getElementById('move-in-form').addEventListener('submit', async function(event){
            event.preventDefault();
            await moveInTenant(unit);
        });

    }
}


//night mode
const nightMode = document.querySelector('#night-mode');
const toggleThumb = document.querySelector('.toggle-thumb');


nightMode.addEventListener('click', function(){
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        toggleThumb.textContent = '☀️';

    }else{
        toggleThumb.textContent = '🌙';
    }

});




//adding new tenant

async function moveInTenant(unit){
    const name = document.getElementById('move-in-name').value;
    const phone = document.getElementById('move-in-phone').value;
    const email = document.getElementById('move-in-email').value;

    const{ data: newTenant, error: tenantError} = await database
        .from('tenants')
        .insert({
            name:name,
            'unit_no.': unit.unit_no,
            phone: phone,
            email: email

        })
        .select()
        .single();

        if(tenantError){
            console.error('Failed to create tenant', tenantError.message);
            return;
        }

        const{ error: unitError } = await database
        .from('units')
        .update({
            status: 'occupied',
            tenant_id: newTenant.id 
        })
        .eq('id', unit.id);

        if(unitError){
            console.error('Failed to update unit:', unitError.message);
            return;
        }
        console.log('moved in:', newTenant);

        loadUnits();
        showUnitDetails({ ...unit, status: 'occupied', tenants: newTenant});
    }

