async function generateApp() {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("https://your-api.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const result = await response.text();
  document.getElementById("output").innerHTML = result;
}