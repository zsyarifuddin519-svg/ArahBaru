console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

// --- 1. LOGIKA ANIMASI SLIDE UP / DOWN (BAWAAN TEMPLATE) ---
loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});


// --- 2. KODE TAMBAHAN: PAKSA PINDAH HALAMAN SAAT TOMBOL DIKLIK ---
// Mendaftarkan fungsi klik ke semua tombol yang memiliki class 'submit-btn'
const submitButtons = document.querySelectorAll('.submit-btn');

submitButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // Mencegah error bawaan dan langsung mengarahkan browser ke index.html
        e.preventDefault();
        window.location.href = '../../index.html';
    });
});
