async function insertIssues(tittle, details, created_at, user_id) {

    const { data, error} = await database
    .from('issues')
    .insert({

        
    })
    
}





/*----------------------------THE BALANCE SHEEET---------------*/
const reportBtn = document.getElementById('report-button');
const form = document.getElementById('report-form');

reportBtn.addEventListener('click', function(){



    form.innerHTML = `

    <h2> Issues/Repair Form </h2>
    <form>
    
    <div class="issues-form-container">
    <h3>Report an issue</h3>
    <input type="text" class="issues-form-title"  placeholder="title"/>
    <input type="text" class="issues-form-details"  placeholder="Describe the problem"/>
    <input type="date" class="issues-form-date"  placeholder="date"/>

    
     </div>
     <div class="issues-submit-button-container">
    <button type="submit" class="issues-form-submit">Submit</button>
     </div>

    </form>
`






})