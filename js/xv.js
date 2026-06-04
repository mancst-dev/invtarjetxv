// Countdown to July 4, 2026
        const eventDate = new Date('2026-07-04T18:00:00-05:00');
        function updateCountdown() {
            const now = new Date();
            const diff = eventDate - now;
            if (diff <= 0) { document.getElementById('countdown').innerHTML = '<p class="text-2xl" style="color:var(--pink-medium);font-family:Playfair Display,serif;">¡Es hoy!</p>'; return; }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            document.getElementById('days').textContent = d;
            document.getElementById('hours').textContent = h;
            document.getElementById('mins').textContent = m;
            document.getElementById('secs').textContent = s;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // RSVP
        let currentData = [];
        const handler = {
            onDataChanged(data) { currentData = data; }
        };

        (async () => {
            await window.dataSdk.init(handler);
        })();

        document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.querySelector('[data-template-id="rsvp-submit"]');
            btn.disabled = true;
            btn.style.opacity = '0.5';

            if (currentData.length >= 999) {
                document.getElementById('rsvp-error').classList.remove('hidden');
                btn.disabled = false; btn.style.opacity = '1';
                return;
            }

            const result = await window.dataSdk.create({
                guest_name: document.getElementById('guestName').value,
                num_guests: parseInt(document.getElementById('numGuests').value),
                attendance: document.getElementById('attendance').value,
                message: document.getElementById('message').value,
                submitted_at: new Date().toISOString()
            });

            btn.disabled = false; btn.style.opacity = '1';
            if (result.isOk) {
                document.getElementById('rsvp-form').classList.add('hidden');
                document.getElementById('rsvp-success').classList.remove('hidden');
            } else {
                document.getElementById('rsvp-error').classList.remove('hidden');
            }
        });

        lucide.createIcons();