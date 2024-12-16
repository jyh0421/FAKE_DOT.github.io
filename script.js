// limitWidth, limitHeight를 고정 크기가 아닌 윈도우 크기(뷰포트 크기로 설정)
const limitWidth = window.innerWidth;
const limitHeight = window.innerHeight;

let savedElements = []; // 기록 폴더에 저장한 진짜뉴스를 위한 배열 변수

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("background-video");
    const overlay = document.querySelector(".click-overlay");
    const desktop = document.getElementById("desktop");

    // 영상 재생 완료 시 폴더 표시
    video.addEventListener("ended", function () {
        showDesktop();
        showInstructionPopup(); // 게임 방법 팝업 표시
    });

    // 클릭 시 폴더 표시
    overlay.addEventListener("click", function () {
        showDesktop();
        showInstructionPopup(); // 게임 방법 팝업 표시
        
    });

    // 폴더 표시 함수
    function showDesktop() {
        const mainTitle = document.querySelector('.main-title');
        mainTitle.style.display = 'none'; // 영상 숨기기
        desktop.classList.add('show'); // 폴더 표시
    }

  
});

// 구성요소 소개 팝업창 닫기 버튼 눌렀을 때
document.querySelector('.close-button').addEventListener('click', function(){
    this.closest('#instruction').style.display = 'none';
});

// 구성요소 소개 팝업창 표시 (필요한 경우)
function showInstructionPopup() {
    // 팝업창 표시 코드...
}



// 위에 있는 showDesktop() 함수와 중복이라 주석 처리함
/*function showDesktop() {
    // 타이틀을 클릭했을 때 메인 화면 표시
   
    const mainTitle = document.querySelector('.main-title');
     const desktop = document.querySelector('.desktop');
    
    // 타이틀을 서서히 사라지게
     mainTitle.classList.add('fade-out');
        
     // 애니메이션 완료 후 타이틀 숨기고 데스크톱 화면 표시
     mainTitle.addEventListener('animationend', () => {
         mainTitle.style.display = 'none';
         desktop.style.display = 'flex';
         desktop.classList.add('fade-in'); // 데스크톱 서서히 나타나게
     }, { once: true });
    
}*/



//구별법(돋보기), 관점(메모), 진짜뉴스(보관함) 팝업
document.addEventListener("DOMContentLoaded", function () {
    // 폴더별로 관련 팝업을 연결
    const folderMappings = {
        realNews: ["popup-realNews"],          // 진짜뉴스(보관함)
        guidelines: ["popup-guidelines"],      // 구별법(돋보기) 
        perspectives: ["perspectives-popup"]  // 관점 팝업(메모)
    };

    function showFolderPopups(folderId) {
        // 모든 팝업 숨기기
        document.querySelectorAll('.popup').forEach(popup => {
            //popup.style.display = 'none';
        });

        // 선택된 폴더에 연결된 팝업만 표시
        const popupIds = folderMappings[folderId];
        if (popupIds) {
            popupIds.forEach(popupId => {
                const popup = document.getElementById(popupId);
                if (popup) {
                    popup.style.display = 'flex';
                    popup.style.animation = 'fadeIn 0.3s ease-in-out';
                }
            });
        }
    }

    // 각 폴더 클릭 이벤트 설정
    Object.keys(folderMappings).forEach(folderId => {
        const folder = document.getElementById(folderId);
        if (folder) {
            folder.addEventListener("click", function () {
                showFolderPopups(folderId);
            });
        }
    });

    // 팝업 닫기 함수
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.animation = 'fadeOut 0.3s ease-in-out';
            popup.addEventListener('animationend', () => {
                popup.style.display = 'none';
            }, { once: true });
        }
    }

    // 팝업 닫기 버튼 연결
    document.querySelectorAll('.close-btn2').forEach(btn => {
        btn.addEventListener('click', function () {
            const popupId = btn.closest('.popup').id;
            closePopup(popupId);
        });
    });
});



//메인 팝업
document.addEventListener("DOMContentLoaded", function () {
   
    const folderMappings = {
        folder1: ["popup1", "popup2", "popup3", "popup4", "popup5", "popup6","popup7", "popup8", "popup9", "popup10"], // 연예 폴더
        folder2: ["popup-politics1", "popup-politics2","popup-politics3","popup-politics4", "popup-politics5", "popup-politics6", "popup-politics7", "popup-politics8"], // 정치 폴더
        folder3: ["popup-social1", "popup-social2", "popup-social3", "popup-social4", "popup-social5", "popup-social7", "popup-social8"], // 사회 폴더
        folder4: ["popup-lifestyle1", "popup-lifestyle2", "popup-lifestyle3", "popup-lifestyle4", "popup-lifestyle5"], // 생활/문화 폴더
    };

    const savedNews = []; // 진짜뉴스 안에 저장할 뉴스 리스트
    const popupDelay = 500;

    // 진짜뉴스 저장소 좌표
    const archivePosX = document.getElementById('realNews').offsetLeft;
    const archivePosY = document.getElementById('realNews').offsetTop;

    // 각 폴더 클릭 이벤트 설정
    Object.keys(folderMappings).forEach(folderId => {
        const folder = document.getElementById(folderId);
        if (folder) {
            folder.addEventListener("click", function () {
                showFolderPopups(folderId);
            });
        }
    });

    // 팝업 닫기 함수
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.animation = 'fadeOut 0.3s ease-in-out';
            popup.addEventListener('animationend', () => {
                popup.style.display = 'none';
            }, { once: true });
        }
    }

    // 팝업 닫기 버튼(close-btn, x) 클릭했을 때 이벤트 처리
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const popup = btn.closest('.popup');

            // 팝업창이 가짜뉴스일 때(팝업창의 클래스가 fake-news인 경우) 닫기 버튼을 누른 경우, 팝업창 닫기
            if(this.closest('.fake-news') != null) {
                closePopup(popup.id);
            } 
            else { // 팝업창이 진짜뉴스일 때(팝업창의 클래스가 fake-news가 아닌 경우), 흔들기 애니메이션 실행
                popup.style.animation = "none";
                void popup.offsetWidth;
                popup.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
            }
        });
    });

    // 팝업 열기 버튼(open-btn, o) 클릭했을 때 이벤트 처리
    document.querySelectorAll('.open-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const popup = btn.closest('.popup');

            // 팝업창이 진짜뉴스일 때(팝업창의 클래스가 real-news인 경우) 닫기 버튼을 누른 경우, 팝업창 닫기
            if(this.closest('.real-news') != null) {
                const popupTitle = popup.querySelector('.popup-title').innerText;

                // 애니메이션 효과
                const animation = popup.animate([
                    { transform: "translate(0, 0) scale(1)", opacity: 1.0 },
                    { transform: "translate("+ (archivePosX - popup.offsetLeft) + "px, " + (archivePosY - popup.offsetTop) + "px) scale(0.1)", opacity: 0.0 }], 
                    {duration:500});
                
                animation.onfinish = () => {
                    popup.style.display = 'none';
                    // 진짜뉴스 데이터 저장
                    savedNews.push(popupTitle);
                    savedElements.push(popup); // 배열 변수인 savedElements에 저장된 html element 저장
                    //console.log(savedElements);
                    //updateRealNewsPopup();
                

                }
            } 
            else { // 팝업창이 가짜뉴스일 때(팝업창의 클래스가 real-news가 아닌 경우), 흔들기 애니메이션 실행
                popup.style.animation = "none";
                void popup.offsetWidth;
                popup.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
            }
        });
    });


    function showFolderPopups(folderId) {
        document.querySelectorAll('.popup').forEach(popup => {
            popup.style.display = 'none';
        });

        const popupIds = folderMappings[folderId];
        if (popupIds) {
            let delay = 0;
            popupIds.forEach(popupId => {
                setTimeout(() => {
                    const popup = document.getElementById(popupId);
                    if (popup) {
                        showPopupRandomPosition(popup);
                    }
                }, delay);
                delay += popupDelay;
            });
        }
    }

    function showPopupRandomPosition(popup) {
        
        // 팝업 크기를 정확히 계산하기 위해 일시적으로 표시
        const originalDisplay = popup.style.display; // 기존 display 값 저장
        popup.style.display = 'block'; // 일시적으로 보이게 설정 (flex 사용 전 단계)
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        popup.style.display = originalDisplay; // 원래 상태로 복원
    
        // 랜덤 위치 계산
        const randomTop = Math.random() * (limitHeight - popupHeight);
        const randomLeft = Math.random() * (limitWidth - popupWidth);
    
        // 스타일 설정 (크기 고정 및 랜덤 위치 적용)
        popup.style.width = `${popupWidth}px`; // 고정된 가로 크기
        popup.style.height = `${popupHeight}px`; // 고정된 세로 크기
        popup.style.top = `${randomTop}px`;
        popup.style.left = `${randomLeft}px`;
        popup.style.display = 'flex'; // 최종 표시
        popup.style.animation = 'fadeIn 0.3s ease-in-out';
    }
    Object.keys(folderMappings).forEach(folderId => {
        const folder = document.getElementById(folderId);
        if (folder) {
            folder.addEventListener("click", function () {
                showFolderPopups(folderId);
            });
        }
    });

    // 진짜뉴스 팝업 업데이트
    function updateRealNewsPopup() {
        const realNewsPopup = document.getElementById('popup-realNews');
        const newsList = realNewsPopup.querySelector('.popup-content');
        newsList.innerHTML = ''; // 기존 내용 초기화

        // 저장된 뉴스 추가
        savedNews.forEach(newsTitle => {
            const newsItem = document.createElement('p');
            newsItem.textContent = newsTitle;
            newsList.appendChild(newsItem);
        });
    }
});





// 진짜뉴스함(기록 폴더 아이콘)을 클릭했을 때 실행하는 함수 
function openArchive() {
    savedElements.forEach((element) => {
        element.removeAttribute('style');
        element.style.display = 'block';

        // 위치는 랜덤으로
        const randomTop = Math.random() * (limitHeight - element.offsetHeight);
        const randomLeft = Math.random() * (limitWidth - element.offsetWidth);

        element.style.top = `${randomTop}px`;
        element.style.left = `${randomLeft}px`;

        // console.log(savedElements.length);
    });

    savedElements = []; // 진짜뉴스 저장을 위한 배열 변수를 비움
}
