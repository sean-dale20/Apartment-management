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


    async function loadUnitsTable() {
        const {data, error} = await database

        .from('units')
        .select('*, tenants(*)')
        .order('unit_no')
    
    if(error){
        console.error('failed fetching error', error.message)
        return
    }

     const table = document.getElementsByClassName('units-table-body')[0];

data.forEach(unit => {

    const tenantName = unit.tenants ? unit.tenants.name  : "-";

   

   const status = unit.status ? unit.status : "-";


    const row = `
    <tr>
    <td>${unit.unit_no}</td>
    <td>${unit.unit_type}</td>
    <td>${tenantName}</td>
    <td>${unit.monthly_rent}</td>
    <td><span class="status-pill ${status}"> ${status} </span></td>
    </tr>
    
    `
    table.innerHTML = table.innerHTML + row;

});

    }
    loadUnitsTable()



    async function loadTenantsTable() {
        const { data, error} = await database
        .from('units')/* i flipped to units kase di ma display yung 15 units kapag tenants ang ginamit kase as of making the project dalawa lang ang laman */
        .select('*,tenants(*)')
        .order('unit_no')

        if(error){
            console.error('failed fetching tennants',error.message )
        return;
        }
        const table = document.getElementById('Tenants-table-data');


        data.forEach(inside =>{


            const tenantsName = inside.tenants ? inside.tenants.name : "-";
            const tenantsEmail = inside.tenants ? inside.tenants.email : "-";
            const tenantsPhone = inside.tenants ? inside.tenants.phone : "-";
            const tenantsCreated = inside.tenants ? inside.tenants.created_at : "-";

const row = `
<tr>
<td>${inside.unit_no}</td>
<td>${tenantsName}</td>
<td>${tenantsEmail}</td>

<td>${tenantsPhone}</td>
<td>${tenantsCreated}</td>
</tr>

`

table.innerHTML = table.innerHTML + row;

        });

        
    }
    loadTenantsTable();
    

    