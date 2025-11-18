const API_URL = "YOUR_RENDER_BACKEND_URL/api/students";

// Add student
async function addStudent() {
    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    loadStudents();
}

// Load students
async function loadStudents() {
    const res = await fetch(`${API_URL}/all`);
    const data = await res.json();

    document.getElementById("students").innerHTML = "";

    data.forEach(s => {
        document.getElementById("students").innerHTML += `
            <div class="student-box">
                <p><b>Name:</b> ${s.name}</p>
                <p><b>Email:</b> ${s.email}</p>
                <p><b>Course:</b> ${s.course}</p>
                <button onclick="deleteStudent('${s._id}')">Delete</button>
            </div>
        `;
    });
}

// Delete student
async function deleteStudent(id) {
    await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });
    loadStudents();
}

// Load on page start
loadStudents();
