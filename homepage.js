// 이 함수는 각 버튼 클릭 시 해당 강의 페이지로 이동
function goToLecturePage(lectureNumber) {
    const lecturePages = [
        'lecture/lecture.html',  // 강의 1 페이지
        'lecture.html',  // 강의 2 페이지
        'lecture.html',  // 강의 3 페이지
        'lecture.html',  // 강의 4 페이지
        'lecture.html',  // 강의 5 페이지 (추후 추가 가능)
        'lecture.html'   // 강의 6 페이지 (추후 추가 가능)
    ];

    // 강의 페이지로 이동
    window.location.href = lecturePages[lectureNumber - 1];
}
