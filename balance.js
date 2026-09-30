
  //monthly rent 
async function updateBalance(tenantId) {
    const {data: tenant} = await database
    .from('tenants')
    .select('name, created_at, "unit_no."')
    .eq('id', tenantId)
    .single();
    


    //monthly rent 
const {data:unit} = await database
.from('units')
.select('monthly_rent')
.eq('tenant_id', tenantId)
.single();



const {data:paid} = await database
.from('payments')
.select('amount')
.eq('tenant_id' , tenantId);





const start = new Date(tenant.created_at);
const today = new Date();

let months = (today.getFullYear() - start.getFullYear()) * 12
            + (today.getMonth() - start.getMonth());

            if (today.getDate() < start.getDate()) months = months -1;
            months = months + 1;


let totalPaid = 0;
paid.forEach(function (p) {
    totalPaid = totalPaid + Number(p.amount);
    
});
            
const balance = months * unit.monthly_rent - totalPaid;


const{error} = await database
.from('balance')
.upsert({
    tenant_id: tenantId,
    tenant_name: tenant.name,
    unit_no: tenant['unit_no.'],
    balance: balance,
    updated: today.toISOString().split('T')[0]
}, { onConflict: 'tenant_id' });


if(error) {
    console.error('failed updating balance', error.message);
}




}

    // balance TABLE

    async function getBalanceTable(tenantId) {
        const { data, error} = await database
        .from('balance')
        .select('*');
        

        if(error){
            console.error('failed fetching datas from balance', error.message)
        return;
        }
const balanceTable = document.getElementById('balance-tbody');

data.forEach (async yeah =>{
const table = `
<tr>
<td>${yeah.tenant_name}</td>
<td>${yeah.unit_no}</td>
<td>${yeah.balance}</td>
<td>${yeah.updated}</td>
</tr>


`
balanceTable.innerHTML = balanceTable.innerHTML + table;
        });

        



}




        
        
    
    getBalanceTable();