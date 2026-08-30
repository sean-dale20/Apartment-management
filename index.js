const supabaseUrl = 'https://iqgbyyahdtmokfgmnxne.supabase.co';
const supabaseKey = 'sb_publishable_5xa5zrDRAAE2tTFHvG6GTw_qEyUJaPX';

const database = window.supabase.createClient(supabaseUrl, supabaseKey);
const backgroundImage = document.getElementById('backgroundImage');




//  for sign-up
const signup = document.querySelector('#signup-form');




//  for sign-up


signup.addEventListener('submit', async function(event){
    event.preventDefault();

const email = signup.querySelector('#signup-email').value;
const password= signup.querySelector('#signup-password').value;
const name = signup.querySelector('#signup-name').value;
const phone = signup.querySelector("#signup-phone").value;


const { data, error} = await database.auth.signUp({
email:email,
password: password,
options:{
    data:{
name:name,
phone:phone
    }
}
});


if (error){
    console.error('Signup failed:', error.message);

    return;
}
console.log('Signed up yeah!', data);

signup.style.display = 'none';
signup.insertAdjacentHTML('afterend', '<h2>SIGNED UP SUCCESFULLY✅</h2>');

});

//  for sign-in

const login = document.querySelector('#login-form');
const logInError = document.getElementById('login-error');

login.addEventListener('submit', async function(event){
    event.preventDefault();


    const email = login.querySelector('#login-email').value;
    const password = login.querySelector('#login-password').value;

    const {data, error} = await database.auth.signInWithPassword({
        email: email,
        password: password
    });

    if(error){
        console.error('log in failed', error.message);
        logInError.textContent = "Incorrect email or password. Please try again.";
        logInError.style.display = 'block';
        return;
    }
    console.log('Logged in', data);
    checkLoginStatus();

});


async function checkLoginStatus(){
    const {data} = await database.auth.getSession();
    const loggedIn = data.session !== null;


    const authScreen = document.getElementById('auth-screen');
    const loggedInView = document.getElementById('loggedIn');

//  for greeting example if logged in hello dale
    if (loggedIn){
        authScreen.style.display = 'none';
        loggedInView.style.display = 'flex';
backgroundImage.style.display = 'none';

        const name = data.session.user.user_metadata.name;

        const greet = document.getElementById("greeting");
        greet.textContent = "hello," + name;


    }else {
        authScreen.style.display = 'block';
        loggedInView.style.display = 'none';
        backgroundImage.style.display = 'block';
        document.body.classList.remove('dark-mode');
    }
}
checkLoginStatus();


//  sign up to see available units for sign up

const signUp = document.querySelector('.sign-up');
const  signUpMessage = document.getElementById('home-sign-up');
const backToLogIn= document.getElementById('back-to-login');
const loginForm = document.getElementById('login-form');
const signUpMessage2 = document.getElementById('sign-up-message');
const loginpad = document.querySelector('.Log-in');



signUpMessage.addEventListener('click', function(event){
    event.preventDefault();
    loginForm.style.display = 'none';
    signUp.style.display = 'block';
  signUpMessage.style.display = 'none';
loginpad.style.display = 'none';

    

});
backToLogIn.addEventListener('click', function(event){
    event.preventDefault();
    signUp.style.display = 'none';
    loginForm.style.display = 'block';
     signUpMessage.style.display = 'block';
     loginpad.style.display ='block'
});




const logout = document.getElementById('log-out');




logout.addEventListener('click', async function(){
    const{error} = await database.auth.signOut();



    if(error){
        console.error('Logout failed:', error.message);
        return;

    }

    console.log('Logged out');
    checkLoginStatus();


});










