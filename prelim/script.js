/**
 * JPCS CENTRAL JAVASCRIPT
 */

// 1. Data Definitions
const eventsData = [
    { id: 1, title: "Tech Summit 2024", cat: "seminar", date: "2024-11-20", desc: "A gathering of IT experts to discuss AI trends." },
    { id: 2, title: "Code Quest Hackathon", cat: "contest", date: "2024-12-05", desc: "A 24-hour coding challenge for developers." },
    { id: 3, title: "UI/UX Workshop", cat: "workshop", date: "2024-10-15", desc: "Learn modern design principles with Figma." }
];

document.addEventListener('DOMContentLoaded', () => {
    console.log("JPCS Site Loaded Successfully");

    // --- Membership Form Logic (LocalStorage & Validation) ---
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        const fields = ['fullname', 'email', 'studentId'];

        // Load saved progress
        fields.forEach(f => {
            if (localStorage.getItem('jpcs_' + f)) {
                document.getElementById(f).value = localStorage.getItem('jpcs_' + f);
            }
        });

        // Save progress on input
        regForm.addEventListener('input', (e) => {
            if (fields.includes(e.target.id)) {
                localStorage.setItem('jpcs_' + e.target.id, e.target.value);
            }
        });

        // Form Validation
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const sid = document.getElementById('studentId').value;

            if (!email.includes('@')) {
                alert("Error: Please enter a valid email address.");
                return;
            }
            if (sid.length < 5) {
                alert("Error: Invalid Student ID.");
                return;
            }

            document.getElementById('statusMsg').innerHTML = "<b>Success!</b> Application submitted. Check your email.";
            regForm.reset();
            fields.forEach(f => localStorage.removeItem('jpcs_' + f));
        });
    }
});

// 2. Event Filtering Logic
window.filterEvents = (category) => {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// 3. Modal Popup Logic
window.openEventModal = (id) => {
    const event = eventsData.find(e => e.id === id);
    if (!event) return;
    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalBody').innerText = `${event.desc} \n\nScheduled on: ${event.date}`;
    document.getElementById('eventModal').classList.add('active');
};

window.closeModal = () => {
    document.getElementById('eventModal').classList.remove('active');
};

// 4. Interactive Profile Logic
window.showBio = (name, role) => {
    alert(`Member Profile:\nName: ${name}\nRole: ${role}\nStatus: Active JPCS Leader`);
};
