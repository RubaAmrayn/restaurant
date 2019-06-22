window.addEventListener('load',()=>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
        .then(reg => {
          // registration worked
          console.log('Registration succeeded. your Scope is ' + reg.scope);
        }).catch(error=>{
          // registration failed
          console.log('Registration failed with ' + error);
        });
      }
})