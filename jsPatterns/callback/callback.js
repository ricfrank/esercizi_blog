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

var timer = (function (logger) {

    var timeInterval = 1000,
        start,
        time = 5;

    start = setInterval(function(){
        logger.log();
        time--;

        if(time === 0){
            clearInterval(start);
        }

    }, timeInterval);

})(logger);









