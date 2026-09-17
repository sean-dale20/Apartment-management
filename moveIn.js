function payment(unit, name, phone, email) {
    unitDetails.innerHTML=`
        <h3>Unit ${unit.unit_no} - Payment</h3>
        <p>Move-in fee for <strong>${name}</strong> </p>
        <p className="fake amount">₱5,000.00</p>
        <button id="confirm-payment-btn">Confirm Payment</button>
        <button id="cancel-payment-btn">Cancel</button>
    `;

const canceled = document.getElementById('cancel-payment-btn');
const paymentConfirmed = document.getElementById('confirm-payment-btn');


canceled.addEventListener('click', function(){
    showUnitDetails(unit);
}) 

paymentConfirmed.addEventListener('click', function(){
unitDetails.innerHTML= `





<h2>PAYMENT CONFIRMED</h2>

<button id="backT">Back</button>


`;

const backToUnitDetails = document.getElementById('backT');
backToUnitDetails.addEventListener('click', async function(){
    showUnitDetails(unit);



    
})
});

}



async function moveInTenant(unit, name, phone, email) {

    const{ data, error} = await database
    .from('tenants')
    .insert({
        name: name,
        email: email,
        phone: phone,
        'unit_no.': unit

    })
    .select()
    .single();
    if(error){
        console.error('There was a problem inserting your data', error.message);
    return;
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
        return;
    }
    console.log('move in:' , newTenant);
loadUnits();
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