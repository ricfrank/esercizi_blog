var logger = (function(){
    var message = 'Daje!',
        log;

    log = function(){
        console.log(message);
    };

    return {
        log: log
    }
})();

var timer = (function (cb) {

    var timeInterval = 1000,
        start,
        time = 5;

    start = setInterval(function(){
        cb();
        time--;

        if(time === 0){
            clearInterval(start);
        }

    }, timeInterval);

})(logger.log);









