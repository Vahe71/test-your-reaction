const clickZone = document.querySelector('.content .clickZone');
const resultPanel = document.querySelector('.content .results');
const recordPanel = document.querySelector('.content .results .record');
const startPanel = document.querySelector('.content .startPanel');
const recordTitle = document.querySelector('.content .results .title');
recordTitle.addEventListener('click', () => {
    localStorage.removeItem('record');
    window.location.reload();
});
if (localStorage.getItem('record') != null) {
    recordPanel.innerText = localStorage.getItem('record') > 1000 ?
        localStorage.getItem('record')[0] + '.' + localStorage.getItem('record').slice(1, 3) + ' s' :
        localStorage.getItem('record') + ' ms';
}
const startAgain = document.querySelector('.content .startAgain');
startAgain.addEventListener('click', () => window.location.reload());
startPanel.addEventListener('click', () => {
    startPanel.style.pointerEvents = 'none';
    start();
    startPanel.style.opacity = 0;
    setTimeout(() => startPanel.style.display = 'none', 500);
    resultPanel.style.filter = 'blur(0)';
    clickZone.style.filter = 'blur(0)';
});
function start() {
    let randomTime = (Math.floor(Math.random() * (7 - 3)) + 2) + '000';
    clickZone.addEventListener('click', () => {
        if (!clickZone.classList.contains('active')) {
            alert('Wait !');
        }
    });
    setTimeout(() => {
        clickZone.style.background = 'green';
        clickZone.classList.add('active');
        let current = 0;
        let interval = setInterval(() => {
            current += 10;
            if (current >= 10000) {
                alert('Вы не успели кликать на кнопку');
                clickZone.style = 'pointer-events: none; background: red;';
                clearInterval(interval);
                addResult('Error !');
            };
        }, 10);
        clickZone.addEventListener('click', () => {
            clearInterval(interval);
            let time = current < 1000 ? current + ' ms' : `${current.toString()[0]}.${current.toString()[1] + current.toString()[2]}` + ' s';
            let forLocalStorageTime = current;
            if (forLocalStorageTime < localStorage.getItem('record')) {
                localStorage.setItem('record', forLocalStorageTime);
            } else if (localStorage.getItem('record') == null) {
                localStorage.setItem('record', forLocalStorageTime);
            }
            addResult(time);
            clickZone.style.pointerEvents = 'none';
            setTimeout(() => {
                startAgain.style.right = '10px';
            }, 1000);
        });
    }, randomTime);
}
function addResult(inner) {
    const h1 = document.createElement('h1');
    h1.innerText = inner;
    if (resultPanel.children.length % 2 == 0)
        h1.style.background = 'rgb(198, 198, 198)';
    else
        h1.style.background = 'white';
    resultPanel.appendChild(h1);
}



















