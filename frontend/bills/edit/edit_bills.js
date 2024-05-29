async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  console.log({value})
  let response = await fetch(`${window.location.href}/save`,{
    method:"PATCH",
    body:JSON.stringify(value),
    headers:{
      "Content-Type":"application/json"
    }
  })

  await response.json()

  window.location.href="/bills";
  return false

}
  
  const form = document.querySelector("form");
  if(form)form.addEventListener("submit", handleSubmit);