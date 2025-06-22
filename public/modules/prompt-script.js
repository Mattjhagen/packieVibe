document.getElementById("generateBtn").onclick = async () => {
  const prompt = document.getElementById("promptInput").value;
  const loading = document.getElementById("loading");
  const preview = document.getElementById("preview");

  if (!prompt) return alert("Enter a prompt first");

  loading.style.display = "block";
  preview.style.display = "none";

  const response = await fetch("https://packiepresents.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (data?.html) {
    const blob = new Blob([data.html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    preview.src = url;
    preview.style.display = "block";
  } else {
    alert("Failed to generate app.");
  }

  loading.style.display = "none";
};
