
const panels = document.querySelectorAll('.panel');
const navButtons = document.querySelectorAll('.nav-item');


//.]./////////////////////////////////////////////////////////////////////////
// FOR THE PANEL IF CLICKED IT WILL HIGHLIGHT THE CLICKED PART
navButtons.forEach(buttones =>{
buttones.addEventListener('click', function(){

// highlight yung click button
    navButtons.forEach(btnes => btnes.classList.remove('active'));
    this.classList.add('active');

    // matches the panel
    const target = this.dataset.target;

    panels.forEach(panel => {
        panel.classList.remove('active');
    });

// show only the matching panel
    document.querySelector('.' + target).classList.add('active');


  
});
});
//.const homeSignUp = document.getElementById("home-sign-up");
//.const navItemSignUp = document.querySelector('[data-target="sign-up"]');

//.homeSignUp.addEventListener('click', function(event){
   //. event.preventDefault();
    //.navItemSignUp.click();


//.})