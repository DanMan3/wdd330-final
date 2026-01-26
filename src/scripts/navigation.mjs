// Nav buttons


export default function navInit() {

    const menuButton = document.querySelector(".menu-button")
    const navigation = document.querySelector('.navigation')


    menuButton.addEventListener("click", () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    })


    // Nav is in header if it's in "large" mode, otherwise Nav is below header
    const navContainer = document.querySelector("nav");
    const navLargeSlot = document.getElementById("nav-large");
    const navSmallSlot = document.getElementById("nav-small");
    const largeMode = 1024;

    function syncNavPosition() {
        const useLargeSlot = window.innerWidth >= largeMode;
        const targetSlot = useLargeSlot ? navLargeSlot : navSmallSlot;

        if (!targetSlot.contains(navContainer)) {
            targetSlot.appendChild(navContainer);
        }
    };

    window.addEventListener("resize", () => {
        window.requestAnimationFrame(syncNavPosition);
    });

    syncNavPosition();

}