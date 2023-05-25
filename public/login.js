async function logindata(e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    // Making values in the form null after submitting the form
    document.getElementById("email").value = null;
    document.getElementById("password").value = null;
  
    // Creating object of the data
    const obj = {
      email,
      password
    };
    // Post request to the server to store user details
    try{
    const response = await axios.post(`http://127.0.0.1:3000/user/login`, obj)
        if (response.status == 200) {
          alert(response.data.message);
          let arr = [];
          let s = JSON.stringify(arr);
          localStorage.setItem("messages", s);
          localStorage.setItem("id", response.data.token);
          window.location.href = "chat.html";

        }else if(response.status == 201){
          alert(response.data.message);
        }
      }catch(err){
        console.log(err);
        const parentNode = document.getElementById("list");
        const childNode = `<div style="color:red"><h5>${err.message}</h5></div>`;
        parentNode.innerHTML += childNode;
      };
  }
  