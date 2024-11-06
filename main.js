$(document).ready(function() {
    // 강의 리스트를 초기 로드
    loadLectures();

    // 강의 데이터를 서버에서 받아오는 함수
    function loadLectures() {
        $.ajax({
            url: 'http://172.31.105.235:3000/get_lectures',  // 서버 주소
            type: 'GET',
            success: function(response) {
                const lectures = response.data;
                let listContent1 = '';
                let listContent2 = '';
                let listContent3 = '';
                let listContent4 = '';

                // 강의 데이터를 lecture 번호별로 분리하여 리스트 작성
                lectures.forEach(function(lecture) {
                    let listItem = `
                        <li class="lecture-item" data-address="${lecture.address}">
                            <strong>Content:</strong> ${lecture.content}<br>
                            <strong>Address:</strong> ${lecture.address}
                        </li>
                    `;
                    if (lecture.lecture == 1) {
                        listContent1 += listItem;
                    } else if (lecture.lecture == 2) {
                        listContent2 += listItem;
                    } else if (lecture.lecture == 3) {
                        listContent3 += listItem;
                    } else if (lecture.lecture == 4) {
                        listContent4 += listItem;
                    }
                });

                // 강의 리스트를 업데이트
                $('#lectureList1').html(listContent1);
                $('#lectureList2').html(listContent2);
                $('#lectureList3').html(listContent3);
                $('#lectureList4').html(listContent4);
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    }

    // 새로운 강의를 추가하는 폼 제출
    $('#addLectureForm').submit(function(event) {
        event.preventDefault();  // 폼 제출 시 페이지 리로드 방지

        const newLecture = {
            lecture: $('#lectureNumber').val(),
            content: $('#lectureContent').val(),
            address: $('#lectureAddress').val()
        };

        // POST 요청으로 서버에 새로운 강의 추가
        $.ajax({
            url: 'http://172.31.105.235:3000/add_lecture',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newLecture),
            success: function(response) {
                alert('Lecture added successfully!');

                // 강의 추가 후 강의 리스트를 갱신
                loadLectures();

                // 폼 초기화
                $('#addLectureForm')[0].reset();
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    });

    // 강의 리스트 아이템 클릭 시 링크 열기
    $('#lectureSection').on('click', '.lecture-item', function() {
        const address = $(this).data('address');  // data-address 속성에서 주소 가져오기
        window.open(address, '_blank');  // 새 창에서 링크 열기
    });
});
