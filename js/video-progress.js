document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    
    if (!video) return;

    // Ensure video loops
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });

    // Start playing
    video.play().catch(() => {
        console.log('Autoplay prevented');
    });
});
