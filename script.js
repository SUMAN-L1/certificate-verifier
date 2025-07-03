let certificates = [];

// Load certificate data
fetch('certificates.json')
  .then(response => response.json())
  .then(data => {
    certificates = data;

    // Auto search from URL ?id=
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if (idParam) {
      document.getElementById("searchBox").value = idParam;
      searchCert();
    }
  })
  .catch(error => {
    console.error("Failed to load certificates.json:", error);
  });

// Trigger search
function searchCert() {
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const results = certificates.filter(cert =>
    cert.certificate_id.toLowerCase().includes(query) ||
    cert.name.toLowerCase().includes(query) ||
    cert.email.toLowerCase().includes(query)
  );
  displayResults(results);
}

// Render result cards
function displayResults(results) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<p>No certificate found. Please check the ID, name, or email.</p>`;
    return;
  }

  results.forEach(cert => {
    container.innerHTML += `
      <div class="card">
        <h3>${cert.name} <span class="verified">✅ Verified</span></h3>
        <p><strong>Certificate ID:</strong> ${cert.certificate_id}</p>
        <p><strong>Email:</strong> ${cert.email}</p>
        <p><strong>Course Title:</strong> ${cert.course_title}</p>
        <p><strong>College:</strong> ${cert.college}</p>
        <p><strong>Issue Date:</strong> ${cert.issue_date}</p>
        <p><strong>Valid Until:</strong> ${cert.valid_until}</p>
        <a class="download-btn" href="${cert.certificate_url}" target="_blank">📄 Download Certificate</a>
      </div>
    `;
  });
}
