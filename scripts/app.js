const tween = gsap.timeline();
const cardsList = [
    {title: '0', class: '' },
    {title: '1/2', class: '' },
    {title: '1', class: '' },
    {title: '2', class: '' },
    {title: '3', class: '' },
    {title: '5', class: '' },
    {title: '8', class: '' },
    {title: '13', class: '' },
    {title: '20', class: '' },
    {title: '40', class: '' },
    {title: '100', class: '' },
    {title: '', class: 'flaticon-infinite-mathematical-symbol' },
    {title: '', class: 'flaticon-tea' },
    {title: '', class: 'flaticon-sad' },
    {title: '', class: 'flaticon-question' },
];

let active_card = null;

const CARDS_LIST_ID = 'cards';
const CARD_ID = 'cards';
const CARD_RESET_ID ='reset-card';
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const INIT_CARD_WIDTH = WINDOW_WIDTH / 3;
const INIT_CARD_HEIGHT = WINDOW_HEIGHT / 5;

const ROW_COUNT = 5;
const COL_COUNT = 3;
const MATRIX_COUNT = ROW_COUNT * COL_COUNT;

const cards = document.getElementById(CARDS_LIST_ID);
const cardReset = document.getElementById(CARD_RESET_ID);

window.onload = function () {
    init();
};

function animateCard(event) {
    if (!active_card) {
        const card = event.target;
        const cardTitle = card.children[0];
        const cardRect = card.getBoundingClientRect();
        const targetX = cardRect.x * -1;
        const targetY = cardRect.y * -1;
        if (card.id !== 'cards') {
            tween
                .to(card, { zIndex: 9 })
                .to(cardTitle, 0, { duration: 0.15, scale: 4 })
                .to(card, {
                    duration: 0.15,
                    x: targetX,
                    y: targetY,
                    width: WINDOW_WIDTH,
                    height: WINDOW_HEIGHT,
                })
                .to(cardReset, { duration: 0.1, opacity: 1, scale: 1 });
            active_card = card;
        }
    }
}

function resetCardAnimation() {
    if (active_card) {
        const cardTitle = active_card.children[0];
        tween
            .to(cardReset, { duration: 0.1, opacity: 0, scale: 0 })
            .to(cardTitle, 0, { duration: 0.15, scale: 1 })
            .to(active_card, {
                duration: 0.15,
                x: 0,
                y: 0,
                width: INIT_CARD_WIDTH,
                height: INIT_CARD_HEIGHT,
                zIndex: 1,
            })
            .to(active_card, { zIndex: 1 });
        active_card = null;
    }
}

function renderCardsList() {
    for (let i = 0; i < cardsList.length; ++i) {
        const INDEX = i % MATRIX_COUNT;
        const ROW = Math.floor(INDEX / COL_COUNT);
        const COL = i % COL_COUNT;

        const card = document.createElement('li');
        const cardTitle = document.createElement('span');
        cardTitle.innerHTML = cardsList[i].title;

        card.className = 'card';
        cardTitle.className = `card__title ${cardsList[i].class}`;
        card.appendChild(cardTitle);

        card.style.width = `${INIT_CARD_WIDTH}px`;
        card.style.height = `${INIT_CARD_HEIGHT}px`;
        card.style.top = `${ROW * INIT_CARD_HEIGHT}px`;
        card.style.left = `${COL * INIT_CARD_WIDTH}px`;

        cards.appendChild(card);
    }
}

function init() {
    renderCardsList();
    cards.addEventListener('click', animateCard);
    cardReset.addEventListener('click', resetCardAnimation);
    tween.from(CARD_ID, {duration: 0.35, scale: 0.3, x: -50, opacity: 0.2, stagger: 0});
}
