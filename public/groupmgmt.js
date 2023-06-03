async function groupdata() {
    try {
      const groupName = document.getElementById('grp-name').value;
      const members = document.getElementById('email').value;
  
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/group/createGroup",
        {
          groupName: groupName,
          members: members,
        },
        { headers: { Authorization: token } }
      );
      alert(`${groupName} Created Successfully!`);
      window.location.href = "chat.html";
    } catch (error) {
      console.log(error);
    }
  }
  