document.addEventListener("DOMContentLoaded", function () {
    // 챗 아이콘 요소
    const chatIcon = document.getElementById("chat-icon");
    const chatOptions = document.getElementById("chat-options");
    const liItems = document.querySelectorAll('#chat-options ul li');
    const chatPrompt = document.getElementById("chat-prompt");
    const chatOverlay = document.getElementById("chat-response-overlay");
    const chatResponse = document.getElementById("chat-response");
    const userInput = document.getElementById("user-input");
    const submitBtn = document.getElementById("submit-btn");

    // 챗봇 옵션
    // 챗 아이콘 마우스 오버 시 옵션 메뉴 표시
    let hideOptionTimeout;
    chatIcon.addEventListener("mouseover", function () {
        clearTimeout(hideOptionTimeout);
        chatOptions.style.display = "block";
    });

    // 마우스 오버가 끝났을 때 옵션 메뉴 숨김
    chatIcon.addEventListener("mouseout", function () {
        hideOptionTimeout = setTimeout(function () {
            chatOptions.style.display = "none";
        }, 200);

    });
    // 챗봇 메뉴 마우스 오버 시 옵션 메뉴 표시
    chatOptions.addEventListener("mouseover", function () {
        clearTimeout(hideOptionTimeout);
        chatOptions.style.display = "block";
    })
    // 마우스 오버가 끝났을 때 옵션 메뉴 숨김
    chatOptions.addEventListener("mouseout", function () {
        chatOptions.style.display = "none";
    })

    // 옵션 메뉴 클릭
    liItems.forEach(function (item, index) {
        if (index === 0) { // 챗봇의 이전 답변 보기
            item.addEventListener('click', function () {
                // 수정
            })
        } else if (index === 1) { // Chat icon 옆으로 밀기
            item.addEventListener('click', function () {
                const currentLeft = parseInt(window.getComputedStyle(chatIcon).left);
                moveChatIcon(currentLeft);
            })
        } else if (index === 2) { // 이전 대화기록 삭제
            item.addEventListener('click', function () {
                // 수정
            })
        }
    })

    function moveChatIcon(coorX) {
        const windowWidth = window.innerWidth;
        if (coorX === Math.floor(windowWidth * 0.5)) {
            chatIcon.style.left = "95%";
            chatOptions.style.left = "90%";
        } else {
            chatIcon.style.left = "50%";
            chatOptions.style.left = "50%";
        }
    }

    // 프롬프트 창
    // 챗 아이콘 클릭 시 프롬프트 입력 창 표시
    chatIcon.addEventListener("click", function (event) {
        chatPrompt.style.display = "block";
        chatOptions.style.display = "none";  // 옵션 메뉴 숨김

        document.removeEventListener('click', hidePromptOnClickOutside);

        // 새로운 외부 클릭 이벤트 리스너 등록
        setTimeout(function () {
            document.addEventListener('click', hidePromptOnClickOutside);
        }, 0); // setTimeout을 사용하여 이벤트 전파 후 실행되도록 설정

        event.stopPropagation(); // 챗본 아이콘 클릭 시 이벤트 전파 방지
    });

    function hidePromptOnClickOutside(event) {

        // 섹션 내부를 클릭한 경우는 제외
        if (!chatPrompt.contains(event.target)) {
            chatPrompt.style.display = "none"; // 정보 섹션 숨김
            document.removeEventListener('click', hidePromptOnClickOutside); // 이벤트 리스너 제거
        }
    }
    // 초기 로딩 시 섹션 외부 클릭이 발생하지 않도록 전파 방지
    chatPrompt.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // 프롬프트 입력 후 전송 버튼 클릭 시
    submitBtn.addEventListener("click", function () {
        const userQuery = userInput.value.trim();
        if (userQuery !== "") {
            // 예시 응답 (실제 API 연동 시 서버로부터 받은 데이터를 사용)
            const responseText = `언어모델의 응답: ${userQuery}에 대한 답변입니다.`;

            // 응답 오버레이 표시
            chatResponse.innerHTML = `<p>${responseText}</p>`;
            chatOverlay.style.display = "block";
            chatPrompt.style.display = "none";  // 입력 창 숨김
        }
        userQuery = "";
    });

    // 챗봇 답변 섹션
    // 흰색 섹션 외부 클릭 시 초기 상태로 복구
    chatOverlay.addEventListener("click", function (event) {
        if (event.target === chatOverlay) {
            chatOverlay.style.display = "none";
            chatResponse.innerHTML = "";  // 응답 내용 초기화
        }
    });
});
