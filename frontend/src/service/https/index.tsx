import { Knowledge } from "../../interface";

const apiUrl = "http://localhost:8080";

async function GetUser() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => response.json())
      .then(({ data }) => (data ? data : false));
  
    return res;
  }

  async function CreateKnowledge(data: Knowledge) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/knowledge`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { status: true, message: res.data };
        } else {
          return { status: false, message: res.error };
        }
      });
  
    return res;
  }

export {
    GetUser,
    CreateKnowledge
}