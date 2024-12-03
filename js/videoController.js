document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const loader = document.getElementById('videoLoader');
    const soundControl = document.getElementById('soundControl');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeControl = document.getElementById('volumeControl');

    // Mặc định tắt tiếng để video có thể autoplay
    video.muted = false;
    let isMuted = false;

    // Preload video
    video.load();

    // Xử lý các sự kiện video
    video.addEventListener('loadeddata', function() {
        loader.style.display = 'none';
    });

    video.addEventListener('waiting', function() {
        loader.style.display = 'flex';
    });

    video.addEventListener('playing', function() {
        loader.style.display = 'none';
    });

    // Tối ưu performance - chỉ autoplay khi đã mute
    video.addEventListener('canplay', function() {
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
            // Nếu autoplay thất bại, set lại muted = true và thử lại
            video.muted = true;
            isMuted = true;
            video.play();
        });
    });

    // Xử lý âm thanh - chỉ bật âm thanh sau khi có tương tác người dùng
    soundControl.addEventListener('click', function() {
        isMuted = !isMuted;
        video.muted = isMuted;
        
        // Nếu video chưa play, play khi user click
        if (video.paused) {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
            });
        }
        
        // Cập nhật icon
        const icon = soundControl.querySelector('i');
        icon.className = isMuted ? 'fas fa-volume-mute text-xl' : 'fas fa-volume-up text-xl';
        
        // Hiện/ẩn thanh volume
        volumeControl.style.display = isMuted ? 'none' : 'flex';
    });

    // Xử lý volume slider
    volumeSlider.addEventListener('input', function() {
        video.volume = this.value;
        if (video.volume > 0) {
            video.muted = false;
            isMuted = false;
            soundControl.querySelector('i').className = 'fas fa-volume-up text-xl';
        }
    });
});
