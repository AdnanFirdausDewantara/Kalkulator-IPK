const gradeValues = {
    'A': 4.0,
    'AB': 3.5,
    'B': 3.0,
    'BC': 2.5,
    'C': 2.0,
    'D' : 1.0,
    'E' : 0.0,   
};


window.onload = function() {
    addRow();
    addRow();
    addRow();
};


function addRow() {
    const table = document.getElementById('tableBody');
    const row = document.createElement('tr');

   
    let options = '<option value="">Pilih Nilai</option>';
    for (const [key, value] of Object.entries(gradeValues)) {
        options += `<option value="${value}">${key} (${value})</option>`;
    }

    row.innerHTML = `
        <td><input type="text" placeholder="Nama Mata Kuliah"></td>
        <td><input type="number" class="sks-input" placeholder="SKS" min="1" max="10"></td>
        <td>
            <select class="grade-select">
                ${options}
            </select>
        </td>
        <td style="text-align:center;">
            <button class="btn-delete" onclick="deleteRow(this)">X</button>
        </td>
    `;

    table.appendChild(row);
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function resetTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; 
    
    document.getElementById('resultDisplay').style.display = 'none';
    
 
    addRow();
    addRow();
    addRow();
}

function calculateIPK() {
    const sksInputs = document.querySelectorAll('.sks-input');
    const gradeInputs = document.querySelectorAll('.grade-select');
    
    let totalPoints = 0;
    let totalSks = 0;
    let isValid = true;

    for (let i = 0; i < sksInputs.length; i++) {
        const sks = parseFloat(sksInputs[i].value);
        const grade = parseFloat(gradeInputs[i].value);
        const sksFilled = sksInputs[i].value !== '';
        const gradeFilled = gradeInputs[i].value !== '';

        if (sksFilled && !gradeFilled) {
            alert("Mohon pilih Nilai untuk baris yang memiliki SKS!");
            isValid = false;
            break;
        }

        if (!isNaN(sks) && sks > 0 && !isNaN(grade)) {
            totalPoints += (sks * grade);
            totalSks += sks;
        }
    }

    const resultBox = document.getElementById('resultDisplay');
    const ipkValueSpan = document.getElementById('ipkValue');

    if (isValid) {
        if (totalSks === 0) {
            alert("Mohon masukkan data SKS dan Nilai terlebih dahulu.");
            resultBox.style.display = 'none';
        } else {
            const ipk = totalPoints / totalSks;
            ipkValueSpan.textContent = ipk.toFixed(2);
            resultBox.style.display = 'block';
        }
    }
}
