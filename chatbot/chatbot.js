// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // 챗 아이콘 요소
    const chatIcon = document.getElementById("chat-icon");
    const chatOptions = document.getElementById("chat-options");
    const chatPrompt = document.getElementById("chat-prompt");
    const chatOverlay = document.getElementById("chat-response-overlay");
    const chatResponse = document.getElementById("chat-response");
    const userInput = document.getElementById("user-input");
    const submitBtn = document.getElementById("submit-btn");

    // 챗 아이콘 마우스 오버 시 옵션 메뉴 표시
    chatIcon.addEventListener("mouseover", function() {
        chatOptions.style.display = "block";
    });

    // 마우스 오버가 끝났을 때 옵션 메뉴 숨김
    chatIcon.addEventListener("mouseout", function() {
        chatOptions.style.display = "none";
    });

    // 챗 아이콘 클릭 시 프롬프트 입력 창 표시
    chatIcon.addEventListener("click", function() {
        chatPrompt.style.display = "block";
        chatOptions.style.display = "none";  // 옵션 메뉴 숨김
    });

    // 프롬프트 입력 후 전송 버튼 클릭 시
    submitBtn.addEventListener("click", function() {
        const userQuery = userInput.value.trim();
        if (userQuery !== "") {
            // 예시 응답 (실제 API 연동 시 서버로부터 받은 데이터를 사용)
            const responseText = `언어모델의 응답: ${userQuery}에 대한 답변입니다.`;

            // 응답 오버레이 표시
            chatResponse.innerHTML = `<p>${responseText}</p>`;
            chatOverlay.style.display = "block";
            chatPrompt.style.display = "none";  // 입력 창 숨김
        }
    });

    // 흰색 섹션 외부 클릭 시 초기 상태로 복구
    chatOverlay.addEventListener("click", function(event) {
        if (event.target === chatOverlay) {
            chatOverlay.style.display = "none";
            chatResponse.innerHTML = "";  // 응답 내용 초기화
        }
    });
});
