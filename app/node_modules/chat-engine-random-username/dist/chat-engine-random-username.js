(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-random-username",
  "version": "0.0.6",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21"
  }
}

},{}],3:[function(require,module,exports){
/**
* Update a {@link Me}'s state by randomly combining a color and an animal. Ex: "teal_seal"
* @module chat-engine-random-username
*/
const randomName = () => {

    // list of friendly animals
    let animals = ['pigeon', 'seagull', 'bat', 'owl', 'sparrows', 'robin', 'bluebird', 'cardinal', 'hawk', 'fish', 'shrimp', 'frog', 'whale', 'shark', 'eel', 'seal', 'lobster', 'octopus', 'mole', 'shrew', 'rabbit', 'chipmunk', 'armadillo', 'dog', 'cat', 'lynx', 'mouse', 'lion', 'moose', 'horse', 'deer', 'raccoon', 'zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope', 'buffalo', 'camel', 'donkey', 'elk', 'fox', 'monkey', 'gazelle', 'impala', 'jaguar', 'leopard', 'lemur', 'yak', 'elephant', 'giraffe', 'hippopotamus', 'rhinoceros', 'grizzlybear'];

    // list of friendly colors
    let colors = ['silver', 'gray', 'black', 'red', 'maroon', 'olive', 'lime', 'green', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

    // randomly generate a combo of the two and return it
    return colors[Math.floor(Math.random() * colors.length)] + '_' + animals[Math.floor(Math.random() * animals.length)];

}

/**
* @function
*/
module.exports = () => {

    class extension {

        construct () {

            let state = this.parent.state;

            /**
            @member state"."username
            @ceextends User
            */
            state.username = randomName();

            this.parent.update(state);
        }

    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'random-username',
        extends: {
            Me: extension
        }
    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtcmFuZG9tLXVzZXJuYW1lXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC42XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhdC1lbmdpbmVcIjogXCJeMC45LjIxXCJcbiAgfVxufVxuIiwiLyoqXG4qIFVwZGF0ZSBhIHtAbGluayBNZX0ncyBzdGF0ZSBieSByYW5kb21seSBjb21iaW5pbmcgYSBjb2xvciBhbmQgYW4gYW5pbWFsLiBFeDogXCJ0ZWFsX3NlYWxcIlxuKiBAbW9kdWxlIGNoYXQtZW5naW5lLXJhbmRvbS11c2VybmFtZVxuKi9cbmNvbnN0IHJhbmRvbU5hbWUgPSAoKSA9PiB7XG5cbiAgICAvLyBsaXN0IG9mIGZyaWVuZGx5IGFuaW1hbHNcbiAgICBsZXQgYW5pbWFscyA9IFsncGlnZW9uJywgJ3NlYWd1bGwnLCAnYmF0JywgJ293bCcsICdzcGFycm93cycsICdyb2JpbicsICdibHVlYmlyZCcsICdjYXJkaW5hbCcsICdoYXdrJywgJ2Zpc2gnLCAnc2hyaW1wJywgJ2Zyb2cnLCAnd2hhbGUnLCAnc2hhcmsnLCAnZWVsJywgJ3NlYWwnLCAnbG9ic3RlcicsICdvY3RvcHVzJywgJ21vbGUnLCAnc2hyZXcnLCAncmFiYml0JywgJ2NoaXBtdW5rJywgJ2FybWFkaWxsbycsICdkb2cnLCAnY2F0JywgJ2x5bngnLCAnbW91c2UnLCAnbGlvbicsICdtb29zZScsICdob3JzZScsICdkZWVyJywgJ3JhY2Nvb24nLCAnemVicmEnLCAnZ29hdCcsICdjb3cnLCAncGlnJywgJ3RpZ2VyJywgJ3dvbGYnLCAncG9ueScsICdhbnRlbG9wZScsICdidWZmYWxvJywgJ2NhbWVsJywgJ2RvbmtleScsICdlbGsnLCAnZm94JywgJ21vbmtleScsICdnYXplbGxlJywgJ2ltcGFsYScsICdqYWd1YXInLCAnbGVvcGFyZCcsICdsZW11cicsICd5YWsnLCAnZWxlcGhhbnQnLCAnZ2lyYWZmZScsICdoaXBwb3BvdGFtdXMnLCAncmhpbm9jZXJvcycsICdncml6emx5YmVhciddO1xuXG4gICAgLy8gbGlzdCBvZiBmcmllbmRseSBjb2xvcnNcbiAgICBsZXQgY29sb3JzID0gWydzaWx2ZXInLCAnZ3JheScsICdibGFjaycsICdyZWQnLCAnbWFyb29uJywgJ29saXZlJywgJ2xpbWUnLCAnZ3JlZW4nLCAndGVhbCcsICdibHVlJywgJ25hdnknLCAnZnVjaHNpYScsICdwdXJwbGUnXTtcblxuICAgIC8vIHJhbmRvbWx5IGdlbmVyYXRlIGEgY29tYm8gb2YgdGhlIHR3byBhbmQgcmV0dXJuIGl0XG4gICAgcmV0dXJuIGNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKV0gKyAnXycgKyBhbmltYWxzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuaW1hbHMubGVuZ3RoKV07XG5cbn1cblxuLyoqXG4qIEBmdW5jdGlvblxuKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICBjb25zdHJ1Y3QgKCkge1xuXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnBhcmVudC5zdGF0ZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAbWVtYmVyIHN0YXRlXCIuXCJ1c2VybmFtZVxuICAgICAgICAgICAgQGNlZXh0ZW5kcyBVc2VyXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3RhdGUudXNlcm5hbWUgPSByYW5kb21OYW1lKCk7XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnVwZGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3JhbmRvbS11c2VybmFtZScsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIE1lOiBleHRlbnNpb25cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19
