// Функция транслит
const translit = (word) => {
  let answer = '';
  const converter = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ё: 'E',
    Ж: 'Zh',
    З: 'Z',
    И: 'I',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'H',
    Ц: 'C',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Sch',
    Ь: '',
    Ы: 'Y',
    Ъ: '',
    Э: 'E',
    Ю: 'Yu',
    Я: 'Ya',
  };
  for (let i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }
  return answer;
};

// получили доступ к input/button/container
const input = document.querySelector('#input');
const button = document.querySelector('#button');
const container = document.querySelector('.dictionary');

// обновлять индексы при удалении
// indexes.forEach(el,i) => el.innerText= i + 1 + " ";

button.addEventListener('click', () => {
  addNewWord();
  input.value = ''; // Очищаем поле ввода после добавления слова
});
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addNewWord();
    input.value = ''; // Очищаем поле ввода после добавления слова
  }
});

function addNewWord() {
  const newDivRus = document.createElement('div'); // новый див для рус
  const newDivEng = document.createElement('div'); // новый див для англ
  const removeRow = document.createElement('div'); // новый див(контейнер) для кнопки circle
  const newRow = document.createElement('div'); // новый див для row

  const indexes = document.querySelectorAll('.index'); // получаем доступ в индекс
  const newIndex = document.createElement('span'); // создаем новый элемент

  newRow.className = 'dictionary-row';
  container.append(newRow); // добавляем newRow в контейнер

  newDivRus.className = 'rus';
  newDivRus.innerText = input.value; // текст ввода=новому тексту
  newRow.append(newDivRus); // добавляем див рус в newRow

  // условие чтобы слово обрезалось + ...+ добавляем tooltip для рус
  if (input.value.length > 7) {
    newDivRus.innerText = `${input.value.slice(0, 7)}...`;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = input.value;
    newDivRus.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });
    newDivRus.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    newDivRus.append(tooltip);
  } else {
    newDivRus.innerText = input.value;
  }

  newDivEng.className = 'eng';
  newRow.append(newDivEng);

  const transliteratedValue = translit(input.value);
  newDivEng.innerText = transliteratedValue;

  if (transliteratedValue.length > 7) {
    newDivEng.innerText = `${transliteratedValue.slice(0, 7)}...`;

    const tooltipEng = document.createElement('div');
    tooltipEng.className = 'tooltipEng';
    tooltipEng.innerText = transliteratedValue;

    newDivEng.addEventListener('mouseenter', () => {
      tooltipEng.style.display = 'block';
    });
    newDivEng.addEventListener('mouseleave', () => {
      tooltipEng.style.display = 'none';
    });
    newDivEng.append(tooltipEng);
  } else {
    newDivEng.innerText = transliteratedValue;
  }

  const removeBut = document.createElement('div');
  removeBut.className = 'delete-button';

  removeBut.addEventListener('click', () => {
    newRow.remove();

    const indexes = document.querySelectorAll('.index');
    indexes.forEach((el, i) => {
      el.innerText = `${i + 1} `;
    });
  });

  removeRow.append(removeBut);
  newDivEng.append(removeRow);

  newIndex.className = 'index';
  newIndex.innerText = `${indexes.length + 1} `;
  newDivRus.prepend(newIndex);

  // const clearBtn = document.getElementById("#clearbtn");
  const clearBtn = document.querySelector('.clear');

  clearBtn.addEventListener('click', () => {
    window.location.reload();
  });
}
