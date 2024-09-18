let currentSection = 0;
const sections = document.querySelectorAll('.section');
let isScrolling = false; // スクロール中かどうかのフラグ

// スクロールイベントを監視してフェードインをトリガー
function onScroll() {
    const fadeInElements = document.querySelectorAll('.fade-in-text, .slide-in-text');

    fadeInElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            element.classList.add('visible'); // 画面内に入った要素にクラスを追加してアニメーションをトリガー
        }
    });
}

// スクロール処理
window.addEventListener('wheel', (event) => {
    if (isScrolling) return; // スクロール中は次のスクロールを無視

    if (event.deltaY > 0) {
        // 下スクロール
        if (currentSection < sections.length - 1) {
            currentSection++;
        }
    } else {
        // 上スクロール
        if (currentSection > 0) {
            currentSection--;
        }
    }

    sections[currentSection].scrollIntoView({ behavior: 'smooth' });

    // スクロール後、フェードインを確認
    setTimeout(onScroll, 500); // スクロール後にフェードインを確認

    // スクロール後、一定時間は新しいスクロールを無効化
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false; // 300ms後に次のスクロールを許可
    }, 300);
});

// ページロード時にも要素がすでに表示されているか確認
window.addEventListener('load', onScroll);
