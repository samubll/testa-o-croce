const coin = document.getElementById("coin");
const button = document.getElementById("flipBtn");
const result = document.getElementById("result");
const shadow = document.getElementById("shadow");

let animating = false;

button.addEventListener("click", () => {

    if(animating) return;

    animating = true;

    result.textContent = "Lancio in corso...";

    const heads = Math.random() < 0.5;

    const extraSpins =
        12 + Math.floor(Math.random() * 6);

    const endRotation =
        heads
        ? extraSpins * 360
        : extraSpins * 360 + 180;

    coin.animate([
        {
            transform:
            "translate(-50%,-50%) translateY(0px) rotateX(0deg) rotateY(0deg)"
        },
        {
            transform:
            `translate(-50%,-180%) rotateX(1080deg) rotateY(${endRotation/2}deg)`,
            offset:0.45
        },
        {
            transform:
            `translate(-50%,-50%) rotateX(2160deg) rotateY(${endRotation}deg)`
        }
    ],{
        duration:3500,
        easing:"cubic-bezier(.15,.85,.15,1)",
        fill:"forwards"
    });

    shadow.animate([
        {
            transform:"translateX(-50%) scale(1)",
            opacity:.6
        },
        {
            transform:"translateX(-50%) scale(.45)",
            opacity:.15
        },
        {
            transform:"translateX(-50%) scale(1)",
            opacity:.6
        }
    ],{
        duration:3500,
        fill:"forwards"
    });

    setTimeout(() => {

        coin.style.transform =
        `translate(-50%,-50%)
         rotateY(${endRotation}deg)`;

        result.textContent =
        heads
        ? "🟡 TESTA"
        : "⚪ CROCE";

        animating = false;

    },3500);

});
