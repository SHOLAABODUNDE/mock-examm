let timeLeft = 1200; // 20 minutes in seconds
let timer;

const questions = [
    { q: "1. Solve for x: 2x + 3 = 11", options: ["A. 4", "B. 5", "C. 3", "D. 6"], answer: "C", img: "image/Fivver.png" },
    { q: "2. What is the square root of 81?", options: ["A. 9", "B. 8", "C. 7", "D. 6"], answer: "A", img: "" },
    { q: "3. Simplify: 3(2x + 4) - 5", options: ["A. 6x + 7", "B. 6x + 12", "C. 6x + 2", "D. 6x + 9"], answer: "A", img: "" },
    { q: "4. Calculate the area of a circle with radius 7 cm (use π ≈ 3.14).", options: ["A. 154 cm²", "B. 144 cm²", "C. 164 cm²", "D. 174 cm²"], answer: "A", img: "" },
    { q: "5. If f(x) = 2x + 3, what is f(4)?", options: ["A. 10", "B. 11", "C. 12", "D. 13"], answer: "D", img: "" },
    { q: "6. Solve for y: 3y - 4 = 2y + 6", options: ["A. 2", "B. 6", "C. 10", "D. 4"], answer: "B", img: "" },
    { q: "7. What is the value of π (pi) to two decimal places?", options: ["A. 3.14", "B. 3.15", "C. 3.16", "D. 3.17"], answer: "A", img: "" },
    { q: "8. Solve for x: x² - 4 = 0", options: ["A. 2", "B. -2", "C. ±2", "D. 0"], answer: "C", img: "" },
    { q: "9. Calculate the volume of a cube with side length 5 cm.", options: ["A. 25 cm³", "B. 100 cm³", "C. 125 cm³", "D. 150 cm³"], answer: "C", img: "" },
    { q: "10. What is 15% of 200?", options: ["A. 25", "B. 30", "C. 35", "D. 40"], answer: "B", img: "" },
    { q: "11. Simplify: 5x - 3x + 2", options: ["A. 2x + 2", "B. 8x + 2", "C. 2x", "D. 8x"], answer: "A", img: "" },
    { q: "12. Solve for z: 4z/2 = 8", options: ["A. 2", "B. 4", "C. 6", "D. 8"], answer: "B", img: "" },
    { q: "13. What is the greatest common divisor of 12 and 16?", options: ["A. 2", "B. 4", "C. 6", "D. 8"], answer: "B", img: "" },
    { q: "14. Solve: 6x + 9 = 3(2x + 3)", options: ["A. 0", "B. 1", "C. 2", "D. 3"], answer: "A", img: "" },
    { q: "15. Calculate the perimeter of a rectangle with length 10 cm and width 5 cm.", options: ["A. 20 cm", "B. 25 cm", "C. 30 cm", "D. 35 cm"], answer: "C", img: "" },
    { q: "16. What is the value of 7 factorial (7!)?", options: ["A. 5040", "B. 4030", "C. 3020", "D. 2010"], answer: "A", img: "" },
    { q: "17. Solve for x: 5(x + 2) = 20", options: ["A. 2", "B. 3", "C. 4", "D. 5"], answer: "A", img: "" },
    { q: "18. What is the slope of the line passing through the points (1,2) and (3,6)?", options: ["A. 1", "B. 2", "C. 3", "D. 4"], answer: "B", img: "" },
    { q: "19. Simplify: (x² - y²) / (x - y)", options: ["A. x - y", "B. x + y", "C. x² - y²", "D. x² + y²"], answer: "B", img: "" },
    { q: "20. Solve for x: √(x + 1) = 3", options: ["A. 8", "B. 9", "C. 10", "D. 11"], answer: "A", img: "" },
];

function startExam() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password !== 'Pharez') {
        alert('Invalid credentials');
        return;
    }

    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.exam-container').style.display = 'block';

    const form = document.getElementById('examForm');
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>${question.q}</p>
            ${question.img ? `<img src="${question.img}" alt="Question Image">` : 'image/fivver'}
            <div class="options">
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index + 1}" value="${String.fromCharCode(65 + i)}" required> ${option}
                    </label>
                `).join('')}
            </div>
        `;
        form.appendChild(questionElement);
    });

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timer);
        submitExam();
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function submitExam() {
    clearInterval(timer);

    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    let score = 0;

    questions.forEach((question, index) => {
        const userAnswer = formData.get(`q${index + 1}`);
        if (userAnswer === question.answer) {
            score += 10;
        }
    });

    const percentage = (score / (questions.length * 10)) * 100;

    const username = document.getElementById('username').value;
    const result = `
        Name: ${username}\n
        Score: ${score}\n
        Percentage: ${percentage}%\n
        Remark: ${percentage >= 50 ? 'Pass' : 'Fail'}
    `;

    alert(result);
    generatePDF(result);
}

function generatePDF(result) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.text(result, 10, 10);

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => {
        doc.save('exam_result.pdf');
    };

    document.getElementById('resultContainer').style.display = 'block';
}
