/*----------------------------THE BALANCE SHEEET---------------*/
const reportBtn = document.getElementById('report-button');
const form = document.getElementById('report-form');

reportBtn.addEventListener('click', function(){



    form.innerHTML = `

    <h2 class="formh2"> Issues/Repair Form </h2>
    <form id="issues-form">
    
    <div class="issues-form-container">
    <h3 class="formh3">Report an issue</h3>
    <input type="text" class="issues-form-title" id="issues-form-title" placeholder="Title and include the unit no."/>
    <textarea class="issues-form-details" id="issues-form-details"  placeholder="Describe the problem"></textarea>
    <input type="date" class="issues-form-date" id="issues-form-date"  placeholder="date"/>

    <div class="issues-submit-button-container">
    <button type="submit" class="issues-form-submit">Submit</button>
     </div>

     </div>
     
    </form>
`
document.getElementById('issues-form').addEventListener('submit', async function(e){
e.preventDefault();
    const title = document.getElementById('issues-form-title').value;
const details = document.getElementById('issues-form-details').value;
const created_at = document.getElementById('issues-form-date').value;


const{data: {user}} = await database.auth.getUser();

const user_id = user.id;
await insertIssues(title,details,created_at, user_id);

form.innerHTML = `
<h2>Issue successfully submitted</h2>

`

})


//why this submit listener needs to be inside this study later



})

async function insertIssues(titlez, detailsz, created_atz, user_idz) {



    const { data, error} = await database
    .from('issues')
    .insert({
        'title': titlez,
        'details': detailsz,
        'created_at': created_atz,
        'user_id': user_idz
         })

         .select();


         if(error){
            console.error('failed inserting datas', error.message);
         return;
        }

         const cardTitle = document.getElementById('issue-cards-title');
         const cardDetails = document.getElementById('issue-cards-details');
        const cardTime = document.getElementById('issue-cards-time');
data.forEach(yeah => {


    cardTitle.textContent = yeah.title;
    cardDetails.textContent = yeah.details;
    cardTime.textContent = yeah.created_at;



    
});
  };




/*----------------------------THE BALANCE SHEEET---------------*/

async function loadIssues() { 
    const { data, error} = await database
    .from('issues')
    .select('*')

    

    if(error){
        console.error('failed loading issues', error.message);
        return;
    }
    
const cards = document.querySelector('.issues-cards');
const cardshome = document.querySelector('.home-issues');

cards.innerHTML= '';

cardshome.innerHTML= '';
    data.forEach(yuppers =>{





cards.innerHTML += `

  
              <div class="issue-card">
                <p class="issue-cards-title" id="issue-cards-title">${yuppers.title}</p>
                <p class="issue-cards-details" id="issue-cards-details">${yuppers.details}</p>
                <p class="issue-cards-time" id="issue-cards-time">${new Date(yuppers.created_at).toLocaleDateString()}</p>
              </div>


`
cardshome.innerHTML += `

 <div class="home-issue-card">
 
                <p class="home-issue-cards-title" id="home-issue-cards-title">${yuppers.title}</p>
                <p class="home-issue-cards-details" id="home-issue-cards-details">${yuppers.details}</p>
                <p class="home-issue-cards-time" id="home-issue-cards-time">${new Date(yuppers.created_at).toLocaleDateString()}</p>
              </div>
`

    })

}
loadIssues();








