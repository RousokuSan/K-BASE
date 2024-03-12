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

export {
    GetUser
}