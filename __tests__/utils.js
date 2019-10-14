const rafPolyfill = (() => {
    let clock = Date.now();

    return () => {
        const currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(() => {
                rafPolyfill(callback);
            }, 0);
        }
    };
})();

export const requestAnimationFrame = typeof window !== "undefined"
    ? window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          rafPolyfill
    : global.requestAnimationFrame || rafPolyfill;
