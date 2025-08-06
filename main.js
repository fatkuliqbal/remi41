document.addEventListener('DOMContentLoaded', function() {
    // Array untuk menyimpan history input setiap nama
    const inputHistory = {
        point1: [],
        point2: [],
        point3: [],
        point4: []
    };

    // Get all point inputs
    const pointInputs = document.querySelectorAll('.point-input');
    
    // Add event listeners to each point input
    pointInputs.forEach((input, index) => {
        const pointId = `point${index + 1}`;
        
        input.addEventListener('input', function() {
            // Validasi input hanya angka dan minus
            this.value = this.value.replace(/[^0-9-]/g, '');
            
            // Pastikan hanya ada satu minus di depan
            if (this.value.indexOf('-') > 0) {
                this.value = this.value.replace('-', '');
            }
        });
    });
    
    // Handle point submission
    document.getElementById('submitPoints').addEventListener('click', function() {
        const entries = document.querySelectorAll('#pointEntries .entry-row');
        
        entries.forEach((entry, index) => {
            const pointId = `point${index + 1}`;
            const input = entry.querySelector('.point-input');
            const pointDisplay = document.getElementById(pointId);
            
            // Ambil nilai input
            const value = parseFloat(input.value) || 0;
            
            // Simpan ke history
            if (input.value !== '') {
                inputHistory[pointId].push(value);
            }
            
            // Hitung total
            const total = inputHistory[pointId].reduce((sum, num) => sum + num, 0);
            
            // Update display
            pointDisplay.textContent = total !== 0 ? total : '0';
            
            // Reset input field
            input.value = '';
        });
    });
    
    // Handle name submission
    document.getElementById('submitNames').addEventListener('click', function() {
        const entries = document.querySelectorAll('#nameEntries .entry-row');
        const names = [];
        
        entries.forEach(entry => {
            const name = entry.querySelector('.name-input').value;
            names.push(name);
        });
        
        console.log('Submitted names:', names);
        alert('Names submitted successfully!');
        
        // Update the names in the POINT TERAKHIR section
        const pointEntries = document.querySelectorAll('#pointEntries .entry-row .name');
        names.forEach((name, index) => {
            if (pointEntries[index]) {
                pointEntries[index].textContent = name || `Nama ${index + 1}`;
                // Reset history ketika nama diganti
                inputHistory[`point${index + 1}`] = [];
                document.getElementById(`point${index + 1}`).textContent = 'POINT TERAKHIR';
            }
        });
    });

    // Tombol reset untuk mengosongkan history
    document.getElementById('submitPoints').insertAdjacentHTML('afterend', 
        '<button class="submit-btn" id="resetPoints" style="background-color:#f44336;margin-left:10px;">Reset</button>');
    
    document.getElementById('resetPoints').addEventListener('click', function() {
        Object.keys(inputHistory).forEach(key => {
            inputHistory[key] = [];
        });
        
        document.querySelectorAll('.point-terakhir').forEach(el => {
            el.textContent = 'POINT TERAKHIR';
        });
        
        alert('Semua point telah direset!');
    });
});