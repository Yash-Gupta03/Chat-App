async function groupdata(e) {
  e.preventDefault();
    try {
      const groupName = document.getElementById('grp-name').value;
      const groupMembers = document.getElementById('email').value;
      const groupMembersArr = groupMembers.split(" ");

      const obj = {
        groupName: groupName,
        groupMembers: groupMembersArr,
      }
      const token = localStorage.getItem("id");
      console.log(token);
      const res = await axios.post(
        "http://localhost:3000/group/create",
        obj,
        { headers: { Authorization: token } }
      );
      if(res.status == 201){
        console.log("got the response");
        alert(`${res.data.group} Created Successfully!`);
        window.location.href = "chat.html";
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  window.addEventListener("DOMContentLoaded", async () => {

      const token = localStorage.getItem("id");
      const res = await axios.get("http://localhost:3000/group/fetch-admin", {
        headers: { Authorization: token },
      });
      res.data.groupsInfo.forEach((group) => {
        // const parentNode = document.getElementById("list");
        // const createNewItem = `<li>${group.name}</li>`;
        // parentNode.innerHTML += createNewItem;

        const parentElement = document.getElementById("table-body");
  const childElement = `<tr id=${group.name}><td>${group.name}</td><td><button class="btn btn-white" onclick="deleteGroup('${group.name}')">Delete</button></td></tr>`
  parentElement.innerHTML += childElement;
      });
    });

    async function deleteGroup(group){
      const token = localStorage.getItem("id");
      console.log(group);
      const res = await axios.delete(`http://localhost:3000/group/delete-group/${group}`, {
        headers: { Authorization: token },
      });
      removeFromScreen(group);
    }

    function removeFromScreen(group) {
      const parentElement = document.getElementById("table-body");
      const element = document.getElementById(group);
      parentElement.removeChild(element);
    }
