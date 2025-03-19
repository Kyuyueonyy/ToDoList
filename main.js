const addBtn = document.querySelector('.fa-plus'); // 추가 버튼
const input = document.querySelector('.footer_input'); // input 요소
const items = document.querySelector('.items'); // ul 요소

// li 요소 생성 함수
function createItem(text) {
  console.log(text);
  
  const itemRow = document.createElement('li');
  itemRow.className = 'item';
  itemRow.innerHTML = `
    <span class="item-text">${text}</span>
    <i class="fa-solid fa-check"></i>
    <i class="fa-solid fa-trash-can"></i>
  `;

  const textSpan = itemRow.querySelector('.item-text');

  //더블 클릭하면 수정 가능하게 변경
  textSpan.addEventListener('dblclick', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = textSpan.innerText;
    
    //기존 span을 input으로 변경
    itemRow.replaceChild(input, textSpan);
    input.focus(); // input 필드에 자동 포커스
    
    //Enter 키 누르면 수정 완료
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        finishEditing(input, textSpan, itemRow);
      }
    });

    //포커스가 벗어나면 수정 완료
    input.addEventListener('blur', () => {
      finishEditing(input, textSpan, itemRow);
    });
  });

  // 체크 버튼 클릭 시 클래스 추가 이벤트
  itemRow.querySelector('.fa-check').addEventListener('click', () => {
    itemRow.classList.toggle('item_done');
  });

  // 삭제 버튼 클릭 시 itemRow 제거
  itemRow.querySelector('.fa-trash-can').addEventListener('click', () => {
    itemRow.remove();
  });

  requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }));

  return itemRow;
}

  //수정 완료 함수
function finishEditing(input, textSpan, itemRow) {
  const newText = input.value.trim();
  if (newText) {
    textSpan.innerText = newText;
  }
  itemRow.replaceChild(textSpan, input); // 다시 span으로 변경
}

// 추가 함수
function onAdd() {
  const text = input.value.trim();
  if (!text) {
    input.value = '';
    input.focus();
    return;
  }

  // li를 생성하는 함수 - createItem(text)
  items.appendChild(createItem(text));
  input.value = ''; // 다 작성하고 전송되면 비워짐(초기화)
  input.focus();
}

// 이벤트 등록
addBtn.addEventListener('click', onAdd);
input.addEventListener('keyup', (e) => e.key === 'Enter' && onAdd());

// 전체 삭제 기능
const clearBtn = document.querySelector('.clear-all'); // 전체 삭제 버튼
clearBtn.addEventListener('click', () => {
  items.innerHTML = ''; // 모든 할 일 목록 제거
});
