async function signupdata(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;

    const obj = {
        name:name,
        email:email,
        number:number,
        password:password,
    };

    try{
        const response = await axios.post(`http://localhost:3000/user/signup`, obj);
    if(response.status == 200){
        alert('new user created');
    }
    else if(response.status == 201){
        alert('user already exists, please login');
    }
    else{
        alert('wrong information, please try again');
    }
    }catch(error){
        alert(error);
    }
    
}