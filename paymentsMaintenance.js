
//payment output

async function paymentsTable() {
    const { data, error } =  await database
.from('payments')
.select('*,tenants(*)')


if(error){
    console.error('failed fetching payments data', error.message)
return;
}

const table = document.getElementById('tbody');

table.innerHTML = '';



data.forEach(async yeah =>{  
    const balance = await getBalance(yeah.tenant_id);  
  




    const tableData = `
    <tr>
    <td class"table-num"> ${yeah.tenants['unit_no.']}</td>
    <td> ${yeah.tenants.name}</td>
    
    <td class"table-num"> ${yeah.due_date}</td>
    <td> ${yeah.method}</td>
    <td class"table-num"> ${yeah.amount}</td>
    <td class"table-num"> ${balance}</td>
</tr>
    
    `;

table.innerHTML = table.innerHTML + tableData;

})
}
paymentsTable();
    


//gets data in payment 
async function paymentsInsert(amount,dueDate,method,datePaid, tenantId ) {
    const { data, error} = await database
    .from('payments')
    .insert({
        'amount': amount,
        'due_date':dueDate,
        'method':method,
        'date_paid': datePaid,
        'tenant_id': tenantId
        
    })
    .select();
    




    if(error){
        console.error('failed inserting your data', error.message);
    }
    return data;
}


// handles the submit

async function paymentSubmit() {
    

    const tenantName = document.getElementById('payment-tenant').value;
        const method = document.getElementById('payments-method').value;
           
                const amount = document.getElementById('payment-amount').value;
                const datePaid = document.getElementById('payments-date-paid').value;

                let due = null;                                        // stays null if there's no date paid

if (datePaid) {                                        // only calculate when a date was picked
    const dueDate = new Date(datePaid);                // turn '2026-10-01' into a Date object
    dueDate.setUTCDate(dueDate.getUTCDate() + 30);     // add 30 days (handles month/year rollover for you)
    due = dueDate.toISOString().split('T')[0];         // back to 'YYYY-MM-DD' for Supabase
}
       const rent = await getRent(tenantName);
if(rent === null) return false;

 
const result = await paymentsInsert(amount, due, method, datePaid, tenantName );
if (result === null) return false;

await updateBalance(tenantName);

paymentsTable();
return true;
}
const paymentF = document.getElementById('payment-form');
paymentF.addEventListener('submit', async function(event){
event.preventDefault();
await paymentSubmit(event);

paymentF.innerHTML=`

<h2 class="recordSuccesful">Recording payment Succesfull</h2>

`




});


   document.querySelector('[data-target="payments"]')
.addEventListener('click', tenantDropDown);    
    

//TENANTS MONTHLY RENT SINGLE DATA

async function getRent(tenantId) {
    const {data, error} = await database
    .from('units')
    .select('monthly_rent')
    .eq('tenant_id', tenantId)
    .single();
    

    if(error){
        console.error('failed fetching monthly_rent', error.message);
        return null;
}
return data.monthly_rent;


}


//TENANTS MONTHLY RENT SINGLE DATA
async function totalPaid(tenantId) {
    const { data,error } = await database
    .from('payments')
    .select('amount')
    .eq('tenant_id', tenantId);

if(error){
    console.error('failed fetching the monthly rent', error.message)
return null;
}

let totalPayment = 0;
data.forEach(function (payment){
totalPayment = totalPayment + Number(payment.amount)
});
    return totalPayment;    // send the total back to whoever called it
}

//TENANTS MONTHLY RENT SINGLE DATA
async function getBalance(tenantId) {

    const { data, error } = await database
    .from('tenants')
    .select('created_at')
    .eq('id', tenantId)
    .single();

    if(error){
        console.error('failed getting move-in date', error.message)
        return false;
    }

    const rent = await getRent(tenantId);
    const paid = await totalPaid(tenantId);
    
    if (rent === null || paid === null) return false;


    const months = monthsCharged(data.created_at);
    const owed = months * rent;

    return owed - paid;
}
// Months charged since move in

function monthsCharged(movedIn){
    const start = new Date(movedIn);
    const today = new Date()


    let months = 
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());




    if(today.getDate() < start.getDate()) {
        months = months - 1;

    }


    return months + 1;
}


// drop down

async function tenantDropDown() {
    const { data, error} = await database
    .from('tenants')
    .select('id, name')

    if(error){
        console.error('failed getting tenant name', error.message)
    return;
    }
    const select = document.getElementById('payment-tenant');
select.innerHTML = '<option value="">-- Select tenant--</option>';

   data.forEach(function (tenant){
    const option = document.createElement('option');
    option.value = tenant.id;
    option.textContent = tenant.name;
    select.appendChild(option);
   })

}
getBalance(1).then(function (balance) {
    console.log('balance:', balance);
});



const paymentForm = document.getElementById('payment-form')
async function hidePaymentForm() {
    const {data} = await database.auth.getUser();
    const adminStatus = data.user?.email === 'admin@gmail.com';
    paymentForm.style.display = adminStatus ? "block": "none";
    
}
hidePaymentForm();
