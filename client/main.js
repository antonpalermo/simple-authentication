// [ ] fetch api from our express server.

const API_URI = 'http://localhost:3000'

let isFormVisible = false;
const data = [{ name: 'Anton Palermo', username: 'antonpalermo', password: 'admin' }];

console.log(`Current record: ${data.length}`);

const signInForm = document.querySelector('#sign-in');
const signUpForm = document.querySelector('#sign-up');
const detailsForm = document.querySelector('#details');
const swtich = document.querySelector('#switch');

const msgBox = document.querySelector('#msg-placeholder');
const msgText = document.createElement('p');

const logoutButton = document.createElement('button');
logoutButton.textContent = 'Logout';

detailsForm.style.display = 'none';
signInForm.style.display = 'none';

logoutButton.addEventListener('click', () => {
    detailsForm.style.display = 'none';
    signInForm.style.display = 'block';
    swtich.style.display = 'block';
});

swtich.addEventListener('click', () => {
    if (!isFormVisible) {
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block';
        isFormVisible = true;
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        isFormVisible = false;
    }
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signUpFormData = new FormData(signUpForm);

    const name = signUpFormData.get('fullname');
    const username = signUpFormData.get('username');
    const password = signUpFormData.get('password');

    const user = {
      fullname: name,
      username: username,
      password: password
    }

    // createNewUser(user);

    fetch(`${API_URI}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json().then(err => Promise.reject(err.message));
      } else {
        return res.text().then(msg => Promise.resolve(msg));
      }
    }).then(json => {
      signUpForm.reset();
      console.log(json);
    })
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signInFormData = new FormData(signInForm);

    const username = signInFormData.get('sign-in-username');
    const password = signInFormData.get('sign-in-password');

    try {
        const val = data.find(o => o.username == username);

        const credentials = {
            username: val.username,
            password: val.password
        };

        if (credentials.username == username && credentials.password == password){
            console.log('matched');
            detailsForm.style.display = 'block';
            signInForm.style.display = 'none';

            const header = document.createElement('h3');
            header.textContent = val.name;

            signInForm.reset();
            detailsForm.appendChild(header);
            detailsForm.appendChild(logoutButton);
            swtich.style.display = 'none';


        } else {
            console.log('not matched');
        }
    } catch (error) {
        console.log('user does not exist');
    }
});
