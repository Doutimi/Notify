async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  let id=(Math.random()*10000).toFixed(0)
  
  const value = Object.fromEntries(data.entries());
  value.id=id;

  console.log({value})
  let response = await fetch("./save",{
    method:"POST",
    body:JSON.stringify(value),
    headers:{
      "Content-Type":"application/json"
    }
  })

  await response.json()

  window.location.href="/appointments"

}
  
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);