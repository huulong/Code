document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Thay đổi giá trị mặc định
    video.muted = false;  // thay đổi thành false
    let isMuted = false;  // thay đổi thành false

    // ... existing code ...

    // Sửa đổi phần xử lý canplay
    video.addEventListener('canplay', function() {
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
            // Nếu autoplay thất bại, set lại muted = true và thử lại
            video.muted = true;
            isMuted = true;
            video.play();
        });
    });

    // ... existing code ...
});