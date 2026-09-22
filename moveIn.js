//units display info if clicked

const unitBoxes = document.querySelectorAll('.unit-box');
const unitDetails = document.getElementById('unit-details');

unitBoxes.forEach(box =>{
    box.addEventListener('click', async function(){
        const unitNo = this.dataset.unit;


       const clickedUnit = document.querySelector('.click-to');
      clickedUnit.style.display = "none";

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


async function showUnitDetails(unit){
    if(unit.status === 'occupied' && unit.tenants){

const adminStatus = await isAdmin();

        unitDetails.innerHTML = `
        <h3>Unit ${unit.unit_no} - Occupied</h3>
        <div class="units-container">
        <p><strong>Name:</strong> ${unit.tenants.name}</p> 
        <p><strong>Phone: </strong>${unit.tenants.phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${unit.tenants.email}</p> 
        <p><strong>Date moved in: </strong> ${new Date(unit.tenants.created_at).toLocaleDateString('en-US', {year: 'numeric' , month: 'long', day: 'numeric' })}</p>
        <div class="btn-container">
        ${adminStatus ? '<button id="edit-btn">Edit</button> <button id="delete-btn">Delete</button>': ''}
        </div>
          </div>
        `;
        if(adminStatus){
            document.getElementById('edit-btn').addEventListener('click' ,function(){
                editdata(unit.tenants.id, unit);

});

                document.getElementById('delete-btn').addEventListener('click', function(){
                    deleteTenant(unit.tenants);
                })
            
        }

return;
    

    }else{
        const adminStatus = await isAdmin();

        if(!adminStatus){
            unitDetails.innerHTML = `
            <h3>Unit ${unit.unit_no} - Available</h3>
            `;

            return;
        }


        unitDetails.innerHTML = `
        <h3>Unit ${unit.unit_no} - Available </h3>
        <form id="move-in-form">
        <input type="text" id="move-in-name" placeholder="Full name" required/>
        <input type="email" id="move-in-email" placeholder="Email" required />
        <input type="tel" id="move-in-phone" placeholder="Phone" />
        <button type="submit">Move In </button>
        </form>
        `;
       

    }




//---------------THE SUBMITTING
    document.getElementById('move-in-form').addEventListener('submit', async function(event){
        event.preventDefault();

const name = document.getElementById('move-in-name').value;
const email = document.getElementById('move-in-email').value;
const phone = document.getElementById('move-in-phone').value;

const success = await moveInTenant(unit, name, phone, email);
    
//if inserting failed

if(!success){
    unitDetails.innerHTML = `
    <h2 class="success-error-message">OOPS SOMETHING WENT WRONG</h2>
    <button id="backT">Back</button>`;

    


    const backToUnitDetails = document.getElementById('backT');
backToUnitDetails.addEventListener('click', async function(){
    showUnitDetails(unit.tenants.id, unit);

});
       return;
}

    unitDetails.innerHTML = `
        <h2 class="success-error-message">Successfully added the new tenant</h2>
        <button id="backT">Back</button>`;

 const backToUnitDetails = document.getElementById('backT');
backToUnitDetails.addEventListener('click', async function(){
    showUnitDetails(unit);
});




});
            
        
      
}








//start of payment




//inserting the datas inside the database
async function moveInTenant(unit, name, phone, email) {

    const{ data, error} = await database
    .from('tenants')
    .insert({
        name: name,
        email: email,
        phone: phone,
        'unit_no.': unit.unit_no

    })
    .select()
    .single();
    if(error){
        console.error('There was a problem inserting your data', error.message);
    return false;
    }

    const{error:unitError} = await database
    .from('units')
    .update({
        status: 'occupied',
        tenant_id: data.id
    })
    .eq('id', unit.id);
    if(unitError){
        console.error('Failed to update unit' , unitError.message)
        return false;
    }
    console.log('move in:' , data);
loadUnits();
return true;
}



//-----------------------inserting the datas inside the database
async function editdata(tenantId, unit) {

    const { data, error } =await database
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();
    


    if(error){
        console.error('There was a problem editing your data', error.message);
        return;
    }
    
        unitDetails.innerHTML = `
    <form id="edit-form">
    <input type="text" id="name" value="${data.name}">
    <input type="text" id="email" value="${data.email}">
   
    <input type="number" id="phone" value="${data.phone}">


    <button>Save</button>
    <button type="button" id="cancel-btn">Cancel</button>
    </form>
    `;

    const sub = document.getElementById('edit-form')
    


    sub.addEventListener('submit', async function(event){
event.preventDefault();




   

    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    const newNumber = document.getElementById('phone').value;
 const succcess = await submitEdit(tenantId, newName, newEmail, newNumber)

 if(!succcess){
    console.error('There seems to be an error' )
    unitDetails.innerHTML = `<h2>OOPS SOMETHING WENT WRONG</h2>`
    
 }
else{
    unitDetails.innerHTML = `<h2>Tenant info updated</h2>

    <button id="backToUnits">Back</button>
`

document.getElementById('backToUnits').addEventListener('click', function(){
    showUnitDetails(unit);

});



}
}); 
   document.getElementById('cancel-btn').addEventListener('click', function(){
    showUnitDetails(unit);
});
}


    async function submitEdit(tenantId, newName, newEmail, newNumber){
        const {data, error} = await database
        .from('tenants')
        .update({
            name: newName,
            email:newEmail,
            phone:newNumber 
        })
        .eq('id', tenantId)

        


    
    if(error){
        console.error('There was a problem saving the edit', error.message);
        return false;
    }

    loadUnits();
    return true;
    
}


//delete button

async function deleteTenant(tenant) {

    const{ data, error} = await database

    .from('tenants')
    .delete()
    .eq('id', tenant)


if(error){
    console.error('deleting tenant failed', error.message)

return false;
}
loadUnits();
return true;
    
}







    
  
























/*adding new tenant

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

*/